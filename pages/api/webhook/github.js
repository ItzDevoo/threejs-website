const { Octokit } = require('@octokit/rest');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// GitHub API setup
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const CLAUDE_TAG = '(Claude)';
const PROJECT_ROOT = path.resolve(process.cwd());

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, issue, repository } = req.body;

    console.log(`📥 Webhook received - Action: ${action}`);
    if (issue) {
      console.log(`📋 Issue title: ${issue.title}`);
      console.log(`👤 Issue author: ${issue.user?.login}`);
      console.log(`🏷️ Has Claude tag: ${issue.title?.startsWith(CLAUDE_TAG) || issue.body?.startsWith(CLAUDE_TAG)}`);
    }

    // Only process opened issues
    if (action !== 'opened') {
      console.log(`⏭️ Ignoring action: ${action}`);
      return res.status(200).json({ message: 'Ignored: not a new issue' });
    }

    // Check if issue is from the correct user
    if (issue.user.login !== GITHUB_USERNAME) {
      console.log(`❌ Wrong user: ${issue.user.login} (expected: ${GITHUB_USERNAME})`);
      return res.status(200).json({ message: 'Ignored: not from authorized user' });
    }

    // Check for Claude tag
    const hasClaudeTag = issue.title.startsWith(CLAUDE_TAG) || issue.body.startsWith(CLAUDE_TAG);
    if (!hasClaudeTag) {
      console.log(`🏷️ No Claude tag found in title or body`);
      return res.status(200).json({ message: 'Ignored: no Claude tag found' });
    }

    console.log(`🤖 Processing Claude issue: ${issue.title}`);
    console.log(`📝 Issue body: ${issue.body?.substring(0, 100)}...`);
    console.log(`👤 Issue author: ${issue.user.login}`);
    console.log(`🏢 Repository: ${repository.full_name}`);

    // Process the issue with Claude Code (async, don't wait)
    processIssueWithClaude(issue, repository);

    // Return immediately
    res.status(200).json({ message: 'Issue processing started' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function processIssueWithClaude(issue, repository) {
  try {
    // Create prompt for Claude Code
    const claudePrompt = `
${issue.title.replace(CLAUDE_TAG, '').trim()}

${issue.body}

Repository: ${repository.full_name}
Issue #${issue.number}
`;

    // Write prompt to temporary file
    const promptFile = path.join(PROJECT_ROOT, '.claude-issue-prompt.md');
    fs.writeFileSync(promptFile, claudePrompt);

    // Execute Claude CLI with explicit non-interactive mode
    const claudeCommand = `echo "${claudePrompt.replace(/"/g, '\\"')}" | claude`;
    
    console.log(`🚀 Executing: ${claudeCommand}`);
    
    exec(claudeCommand, { 
      cwd: PROJECT_ROOT,
      timeout: 300000, // 5 minute timeout
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    }, async (error, stdout, stderr) => {
      console.log('🔄 Claude CLI execution completed');
      console.log('📤 stdout:', stdout);
      console.log('📤 stderr:', stderr);
      
      // Clean up temp file
      if (fs.existsSync(promptFile)) {
        fs.unlinkSync(promptFile);
      }

      let result;
      if (error) {
        console.error('❌ Claude CLI error:', error);
        result = {
          success: false,
          error: error.message,
          output: stderr || stdout
        };
      } else {
        console.log('✅ Claude CLI completed successfully');
        
        // Auto-commit and push changes
        try {
          console.log('🔄 Starting auto-commit and push...');
          await autoCommitAndPush(issue);
          console.log('✅ Auto-commit and push successful');
          result = {
            success: true,
            output: stdout,
            committed: true
          };
        } catch (commitError) {
          console.error('❌ Auto-commit failed:', commitError);
          result = {
            success: true,
            output: stdout,
            committed: false,
            commitError: commitError.message
          };
        }
      }

      // Post response back to GitHub
      console.log('📝 Posting response to GitHub...');
      try {
        await postResponseToGitHub(issue, repository, result);
        console.log('✅ GitHub response posted successfully');
      } catch (githubError) {
        console.error('❌ Failed to post to GitHub:', githubError);
      }
    });
  } catch (error) {
    console.error('Error in processIssueWithClaude:', error);
  }
}

async function autoCommitAndPush(issue) {
  return new Promise((resolve, reject) => {
    const commitMessage = `🤖 Claude: ${issue.title.replace(CLAUDE_TAG, '').trim()} (fixes #${issue.number})`;
    
    const commands = [
      'git add .',
      `git commit -m "${commitMessage}"`,
      'git push origin main'
    ];

    const fullCommand = commands.join(' && ');
    
    exec(fullCommand, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error('Git error:', error);
        reject(error);
      } else {
        console.log('Successfully committed and pushed changes');
        resolve({ stdout, stderr });
      }
    });
  });
}

async function postResponseToGitHub(issue, repository, result) {
  const responseBody = generateResponseMarkdown(result);
  
  try {
    await octokit.rest.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: issue.number,
      body: responseBody
    });

    // Close the issue if successfully processed
    if (result.success) {
      await octokit.rest.issues.update({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issue.number,
        state: 'closed',
        labels: ['claude-automated', 'resolved']
      });
    }
  } catch (error) {
    console.error('Error posting to GitHub:', error);
  }
}

function generateResponseMarkdown(result) {
  let response = `## 🤖 Claude Code Automation Report\n\n`;
  
  if (result.success) {
    response += `✅ **Status**: Successfully processed and implemented changes\n\n`;
    
    if (result.committed) {
      response += `🔄 **Changes**: Automatically committed and pushed to repository\n\n`;
      response += `📋 **Git Commit**: Changes have been committed with an automated message\n\n`;
    } else {
      response += `⚠️ **Changes**: Code updated but commit failed: ${result.commitError}\n\n`;
    }
    
    response += `### Implementation Summary\n\n`;
    if (result.output && result.output.trim()) {
      response += `\`\`\`\n${result.output}\n\`\`\`\n\n`;
    } else {
      response += `Claude has successfully processed your request and made the necessary changes to your codebase.\n\n`;
    }
    
    response += `### Next Steps\n\n`;
    response += `- 🌐 Visit [https://itzdevoo.com](https://itzdevoo.com) to see the changes live\n`;
    response += `- 📱 Changes are automatically deployed via your Cloudflare tunnel\n`;
    response += `- 🔍 Review the commit history to see exactly what was modified\n\n`;
    
    response += `---\n*This issue was automatically resolved by Claude Code automation. The changes are now live on your website!*`;
  } else {
    response += `❌ **Status**: Failed to process issue\n\n`;
    response += `### Error Details\n\n`;
    response += `\`\`\`\n${result.error}\n\`\`\`\n\n`;
    response += `---\n*Please review the error and try again, or handle this issue manually.*`;
  }
  
  return response;
}