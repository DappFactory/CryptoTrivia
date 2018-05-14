const { spawn } = require('child_process');
const ganacheCli = spawn('ganache-cli', ['-p', '7545', '-i', '8887']);

ganacheCli.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ganacheCli.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ganacheCli.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});