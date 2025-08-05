# Claude Automated Portfolio

A Next.js portfolio website with automated GitHub issue resolution powered by Claude Code.

## Features

🤖 **Automated Issue Resolution**: Create GitHub issues tagged with "(Claude)" and watch Claude Code automatically fix them
🔄 **Auto-Deploy**: Changes are automatically committed, pushed, and deployed
📝 **Detailed Reports**: Get comprehensive responses about what was fixed
🌐 **Local Development**: Everything runs locally with Cloudflare tunnel integration

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` with your values:
- `GITHUB_TOKEN`: Your GitHub Personal Access Token with repo permissions
- `GITHUB_USERNAME`: Your GitHub username
- `WEBHOOK_PORT`: Port for webhook server (default: 3001)

### 3. Start the System
```bash
# Start both the website and automation server
npm run dev-all

# Or start them separately:
npm run dev        # Next.js website (port 3000)
npm run automation # Webhook server (port 3001)
```

### 4. Configure GitHub Webhooks
1. Go to your GitHub repository settings
2. Navigate to Webhooks
3. Add webhook with URL: `https://your-cloudflare-tunnel.com/webhook/github`
4. Set content type to `application/json`
5. Select "Issues" events

## How to Use

1. **Create a GitHub Issue**: Start the title or body with "(Claude)"
2. **Describe the Problem**: Explain what you want fixed or implemented
3. **Wait for Magic**: Claude Code will automatically:
   - Analyze the issue
   - Implement the fix
   - Commit and push changes
   - Post a detailed response
   - Close the issue

### Example Issue:
**Title**: `(Claude) Fix responsive navbar on mobile devices`
**Body**: `The navigation menu doesn't collapse properly on screens smaller than 768px. The hamburger menu should show instead.`

## Project Structure

```
├── automation/           # GitHub webhook automation
│   ├── webhook-server.js    # Main webhook handler
│   └── restart-manager.js   # Auto-restart functionality
├── pages/               # Next.js pages
├── components/          # React components
├── styles/             # CSS styles
└── public/             # Static assets
```

## Commands

- `npm run dev` - Start Next.js development server
- `npm run automation` - Start GitHub webhook server
- `npm run dev-all` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run start` - Start production server

## Troubleshooting

**Webhook not receiving events**: Check your Cloudflare tunnel configuration and GitHub webhook settings.

**Claude Code not found**: Ensure Claude Code CLI is installed and accessible from your PATH.

**Auto-commit failing**: Verify git is configured and you have push permissions to the repository.