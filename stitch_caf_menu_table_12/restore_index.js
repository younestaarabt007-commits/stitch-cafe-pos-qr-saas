const { exec } = require('child_process');
const fs = require('fs');

exec('git show "HEAD~1:swiggy-style_elite_main_menu_390x2500/index.html"', { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    fs.writeFileSync('old_index.html', stdout);
    console.log('Successfully restored old_index.html');
});
