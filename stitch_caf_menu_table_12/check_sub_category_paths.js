const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const mainMenuScriptPath = path.join(rootDir, 'swiggy-style_elite_main_menu_390x2500', 'script.js');

// Function to extract items from a script content
function extractItems(content) {
    const items = {};
    // Regex to match object definitions like { id: '...', name: "...", ... image: "..." }
    // Handles various formats
    const itemRegex = /{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*"([^"]+)"\s*,\s*description:\s*"[^"]*"\s*,\s*price:\s*[^,]+\s*,\s*image:\s*"([^"]+)"/g;
    
    let match;
    while ((match = itemRegex.exec(content)) !== null) {
        const id = match[1];
        const name = match[2];
        const image = match[3];
        items[name] = { id, image }; // Key by name as IDs might differ slightly or be consistent
    }
    return items;
}

// 1. Get clean mappings from main menu
if (!fs.existsSync(mainMenuScriptPath)) {
    console.error('Main menu script not found!');
    process.exit(1);
}

const mainMenuContent = fs.readFileSync(mainMenuScriptPath, 'utf8');
const mainMenuItems = extractItems(mainMenuContent);

console.log(`Loaded ${Object.keys(mainMenuItems).length} items from main menu.`);

// 2. Scan sub-category scripts
const subCategoryDirs = fs.readdirSync(rootDir).filter(file => {
    return fs.statSync(path.join(rootDir, file)).isDirectory() && 
           file !== 'swiggy-style_elite_main_menu_390x2500' &&
           file !== 'assets' &&
           !file.startsWith('.');
});

let discrepancies = [];

subCategoryDirs.forEach(dir => {
    const scriptPath = path.join(rootDir, dir, 'script.js');
    if (fs.existsSync(scriptPath)) {
        const content = fs.readFileSync(scriptPath, 'utf8');
        const items = extractItems(content);
        
        Object.keys(items).forEach(name => {
            if (mainMenuItems[name]) {
                const mainImage = mainMenuItems[name].image;
                const subImage = items[name].image;
                
                // Normalize paths for comparison (handle ../assets vs assets/)
                const normMain = mainImage.replace('assets/', '');
                const normSub = subImage.replace('../swiggy-style_elite_main_menu_390x2500/assets/', '').replace('assets/', '');
                
                if (normMain !== normSub) {
                    discrepancies.push({
                        file: scriptPath,
                        name: name,
                        mainImage: mainImage,
                        subImage: subImage
                    });
                }
            }
        });
    }
});

// 3. Report
if (discrepancies.length > 0) {
    console.log(`\nFound ${discrepancies.length} discrepancies between main menu and sub-categories:`);
    discrepancies.forEach(d => {
        console.log(`[${d.file}] Item: "${d.name}"`);
        console.log(`  Main Menu: ${d.mainImage}`);
        console.log(`  Sub Cat:   ${d.subImage}`);
    });
} else {
    console.log('\nSUCCESS: All sub-category scripts match the main menu image paths!');
}
