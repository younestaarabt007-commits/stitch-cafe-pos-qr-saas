const { exec } = require('child_process');

exec('git diff "juces sub catégorie page/script.js"', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }
});
