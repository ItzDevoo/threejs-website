const express = require('express');
const { Octokit } = require('@octokit/rest');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.WEBHOOK_PORT || 3001;

// GitHub API setup
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configuration
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const CLAUDE_TAG = '(Claude)';
const PROJECT_ROOT = path.resolve(__dirname, '..');

app.use(express.json());

// Webhook endpoint for GitHub issues
app.post('/webhook/github', async (req, res) => {
  try {
    const { action, issue, repository } = req.body;

    // Only process opened issues
    if (action !== 'opened') {
      return res.status(200).json({ message: 'Ignored: not a new issue' });
    }

    // Check if issue is from the correct user
    if (issue.user.login !== GITHUB_USERNAME) {
      return res.status(200).json({ message: 'Ignored: not from authorized user' });
    }

    // Check for Claude tag
    const hasClaudeTag = issue.title.startsWith(CLAUDE_TAG) || issue.body.startsWith(CLAUDE_TAG);
    if (!hasClaudeTag) {
      return res.status(200).json({ message: 'Ignored: no Claude tag found' });
    }

    console.log(`🤖 Processing Claude issue: ${issue.title}`);

    // Process the issue with Claude Code
    const result = await processIssueWithClaude(issue, repository);

    // Post response back to GitHub
    await postResponseToGitHub(issue, repository, result);

    res.status(200).json({ message: 'Issue processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function processIssueWithClaude(issue, repository) {
  return new Promise((resolve, reject) => {
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

    // Execute Claude Code
    const claudeCommand = `claude-code "${claudePrompt}"`;
    
    exec(claudeCommand, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      // Clean up temp file
      if (fs.existsSync(promptFile)) {
        fs.unlinkSync(promptFile);
      }

      if (error) {
        console.error('Claude Code error:', error);
        resolve({
          success: false,
          error: error.message,
          output: stderr
        });
      } else {
        console.log('Claude Code completed successfully');
        
        // Auto-commit and push changes
        autoCommitAndPush(issue).then(() => {
          resolve({
            success: true,
            output: stdout,
            committed: true
          });
        }).catch(commitError => {
          resolve({
            success: true,
            output: stdout,
            committed: false,
            commitError: commitError.message
          });
        });
      }
    });
  });
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
    } else {
      response += `⚠️ **Changes**: Code updated but commit failed: ${result.commitError}\n\n`;
    }
    
    response += `### Implementation Details\n\n`;
    response += `\`\`\`\n${result.output}\n\`\`\`\n\n`;
    
    response += `---\n*This issue was automatically resolved by Claude Code. The changes have been deployed to your local development environment.*`;
  } else {
    response += `❌ **Status**: Failed to process issue\n\n`;
    response += `### Error Details\n\n`;
    response += `\`\`\`\n${result.error}\n\`\`\`\n\n`;
    response += `---\n*Please review the error and try again, or handle this issue manually.*`;
  }
  
  return response;
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Claude automation server running', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🤖 Claude GitHub automation server running on port ${port}`);
  console.log(`Webhook URL: http://localhost:${port}/webhook/github`);
  console.log(`Health check: http://localhost:${port}/health`);
});