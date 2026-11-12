const fs = require('fs');

const scriptPath = 'swiggy-style_elite_main_menu_390x2500/script.js';
let content = fs.readFileSync(scriptPath, 'utf8');

// Comment out the execution of renderCategories()
// Look for "renderCategories(sampleMenu);" or just "renderCategories("
if (content.includes('renderCategories(')) {
    content = content.replace(/renderCategories\(/g, '// renderCategories(');
    console.log('Commented out renderCategories in script.js');
}

fs.writeFileSync(scriptPath, content);
