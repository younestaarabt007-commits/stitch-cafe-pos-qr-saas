const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const mainMenuScriptPath = path.join(rootDir, 'swiggy-style_elite_main_menu_390x2500', 'menu.js');

// Function to extract items from a script content
function extractItems(content) {
    const items = {};
    const itemRegex = /{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*"([^"]+)"\s*,\s*description:\s*"[^"]*"\s*,\s*price:\s*[^,]+\s*,\s*image:\s*"([^"]+)"/g;
    
    let match;
    while ((match = itemRegex.exec(content)) !== null) {
        const id = match[1];
        const name = match[2];
        const image = match[3];
        items[name] = { id, image };
    }
    return items;
}

if (!fs.existsSync(mainMenuScriptPath)) {
    console.error('Main menu script not found!');
    process.exit(1);
}

const mainMenuContent = fs.readFileSync(mainMenuScriptPath, 'utf8');
const mainMenuItems = extractItems(mainMenuContent);

const subCategoryDirs = fs.readdirSync(rootDir).filter(file => {
    return fs.statSync(path.join(rootDir, file)).isDirectory() && 
           file !== 'swiggy-style_elite_main_menu_390x2500' &&
           file !== 'assets' &&
           !file.startsWith('.');
});

subCategoryDirs.forEach(dir => {
    const scriptPath = path.join(rootDir, dir, 'script.js');
    if (fs.existsSync(scriptPath)) {
        let content = fs.readFileSync(scriptPath, 'utf8');
        let modified = false;
        
        const items = extractItems(content);
        
        Object.keys(items).forEach(name => {
            if (mainMenuItems[name]) {
                const mainImage = mainMenuItems[name].image;
                const subImage = items[name].image;
                
                // Normalize paths for comparison
                const normMain = mainImage
                    .replace('../../images/', '../images/')
                    .replace('assets/', '');
                const normSub = subImage
                    .replace('../swiggy-style_elite_main_menu_390x2500/assets/', '')
                    .replace('../swiggy-style_elite_main_menu_390x2500/../../images/', '../images/')
                    .replace('../../images/', '../images/')
                    .replace('assets/', '');
                
                // Decide desired canonical path for subcategory
                let desiredPath = mainImage;
                if (desiredPath.startsWith('../../images/')) {
                    desiredPath = desiredPath.replace('../../images/', '../images/');
                } else if (desiredPath.startsWith('../images/')) {
                    // already canonical
                } else if (desiredPath.startsWith('assets/')) {
                    // keep pointing to main menu assets (icons or legacy)
                    desiredPath = `../swiggy-style_elite_main_menu_390x2500/${desiredPath}`;
                } else if (desiredPath.startsWith('../swiggy-style_elite_main_menu_390x2500/')) {
                    // leave as-is
                } else {
                    desiredPath = desiredPath.replace('../../', '../');
                }

                // Update when actual differs from desired, or when normalized differs
                if (subImage !== desiredPath || normMain !== normSub) {
                    const itemRegex = new RegExp(`(name:\\s*"${name}"[\\s\\S]*?image:\\s*")([^"]+)(")`);
                    if (itemRegex.test(content)) {
                        content = content.replace(itemRegex, `$1${desiredPath}$3`);
                        modified = true;
                        console.log(`Updated "${name}" in ${dir}/script.js -> ${desiredPath}`);
                    }
                }
            }
        });
        
        if (modified) {
            fs.writeFileSync(scriptPath, content, 'utf8');
            console.log(`Saved changes to ${dir}/script.js`);
        }
    }
});
