const { spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

class RestartManager {
  constructor() {
    this.nextProcess = null;
    this.isRestarting = false;
    this.projectRoot = path.resolve(__dirname, '..');
  }

  start() {
    // Start the Next.js development server
    this.startNextJS();

    // Watch for file changes (excluding node_modules and .git)
    const watcher = chokidar.watch(this.projectRoot, {
      ignored: [
        /node_modules/,
        /\.git/,
        /\.next/,
        /automation/,
        /\.env/,
        /\.claude-issue-prompt\.md/
      ],
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('change', (filePath) => {
      console.log(`📁 File changed: ${path.relative(this.projectRoot, filePath)}`);
      this.restartNextJS();
    });

    watcher.on('add', (filePath) => {
      console.log(`📄 File added: ${path.relative(this.projectRoot, filePath)}`);
      this.restartNextJS();
    });

    console.log('🔄 Restart manager initialized - watching for changes...');
  }

  startNextJS() {
    this.nextProcess = spawn('npm', ['run', 'dev'], {
      cwd: this.projectRoot,
      stdio: 'inherit',
      shell: true
    });

    this.nextProcess.on('error', (error) => {
      console.error('Next.js process error:', error);
    });

    this.nextProcess.on('exit', (code) => {
      if (!this.isRestarting) {
        console.log(`Next.js process exited with code ${code}`);
      }
    });
  }

  restartNextJS() {
    if (this.isRestarting) return;
    
    this.isRestarting = true;
    console.log('🔄 Restarting Next.js development server...');

    if (this.nextProcess) {
      this.nextProcess.kill();
    }

    // Wait a moment before restarting
    setTimeout(() => {
      this.startNextJS();
      this.isRestarting = false;
      console.log('✅ Next.js server restarted successfully');
    }, 2000);
  }
}

// Start the restart manager if this file is run directly
if (require.main === module) {
  const manager = new RestartManager();
  manager.start();
}

module.exports = RestartManager;