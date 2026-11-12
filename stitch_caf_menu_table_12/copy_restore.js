const fs = require('fs');
const path = require('path');

const oldPath = 'old_index.html';
const newPath = 'swiggy-style_elite_main_menu_390x2500/index.html';

try {
    console.log(`Reading from ${oldPath}...`);
    let content = fs.readFileSync(oldPath, 'utf8');
    console.log(`Read ${content.length} bytes.`);
    
    // Check for critical scripts and append them if missing
    let scripts_to_add = '';
    
    if (!content.includes('nav-bar.js')) {
        console.log('Adding nav-bar.js to restored file');
        scripts_to_add += '  <script src="../nav-bar.js"></script>\n';
    }
    
    if (!content.includes('carousel-auto-loop.js')) {
        console.log('Adding carousel-auto-loop.js to restored file');
        scripts_to_add += '  <script src="carousel-auto-loop.js"></script>\n';
    }
    
    if (scripts_to_add) {
        content = content.replace('</body>', scripts_to_add + '</body>');
    }

    console.log(`Writing to ${newPath}...`);
    fs.writeFileSync(newPath, content);
    console.log('Successfully restored index.html from old_index.html');
} catch (err) {
    console.error('Error restoring file:', err);
}
