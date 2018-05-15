const { spawn } = require('child_process');
const ganacheCli = spawn('ganache-cli', ['-p', '7545', '-i', '8887']);

const localHostListener = 'Listening on localhost:7545';

ganacheCli.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  if (data.includes(localHostListener)) {
    console.log("=== Deploying contract ===");
    spawn('bash', ['run.sh']);
  }
});

ganacheCli.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ganacheCli.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});