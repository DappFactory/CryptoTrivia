const { spawn } = require('child_process');
const deployContract = spawn('bash', ['run.sh']);

deployContract.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

deployContract.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

deployContract.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});