const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500/script.js');
const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500/assets');

if (!fs.existsSync(scriptPath)) {
    console.error('Script not found:', scriptPath);
    process.exit(1);
}

const content = fs.readFileSync(scriptPath, 'utf8');
const regex = /assets\/[^"']+/g;
const matches = content.match(regex) || [];

const uniqueMatches = [...new Set(matches)];
const missing = [];

uniqueMatches.forEach(assetPath => {
    // assetPath is like "assets/foo.jpg"
    const fileName = path.basename(assetPath);
    const fullPath = path.join(assetsDir, fileName);
    
    if (!fs.existsSync(fullPath)) {
        missing.push(assetPath);
    }
});

fs.writeFileSync('missing_links.txt', missing.join('\n'), 'utf8');
console.log('Written to missing_links.txt');
