const fs = require('fs');
const path = require('path');

const updates = {
    // Previous updates
    'Spicy Shakshuka': 'assets/brunch-shakshuka.jpg',
    'Iron Frittata': 'assets/brunch-frittata.jpg',
    'Farm Omelette': 'assets/brunch-farm-omelette.jpg',
    'Full English': 'assets/brunch-full-english.jpg',
    'Garden Skillet': 'assets/brunch-garden-skillet.jpg',
    'Strawberry Bliss': 'assets/shake-strawberry.jpg',
    'Banana Caramel': 'assets/shake-banana-caramel.jpg',
    'Vanilla Bean Shake': 'assets/shake-vanilla-bean.jpg',
    'Signature Benedict': 'assets/toast-signature-benedict.jpg',
    'Shakshuka': 'assets/brunch-shakshuka.jpg', 
    'Truffle Omelette': 'assets/hero-scrambled-eggs.png',

    // New updates
    'Fit Egg-White': 'assets/brunch-fit-egg-white.jpg',
    'V60 Single Origin': 'assets/coffee-v60.jpg',
    'Nitro Cold Brew': 'assets/coffee-nitro.jpg'
};

const filesToUpdate = [
    'swiggy-style_elite_main_menu_390x2500/script.js',
    'toast brunch sub catégorie page/script.js',
    'smothies and shakes sub catégorie page/script.js',
    'brunch sub catégorie page/script.js',
    'black coffee sub catégorie page/script.js',
    'Brew catégorie page/script.js'
];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file === 'script.js') {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });
    return arrayOfFiles;
}

const rootDir = __dirname;
const allScripts = getAllFiles(rootDir);

console.log('Applying final polish to script files (Round 2)...');

allScripts.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [itemName, imagePath] of Object.entries(updates)) {
        let finalPath = imagePath;
        if (filePath.includes('sub catégorie page')) {
            finalPath = imagePath.replace('assets/', '../swiggy-style_elite_main_menu_390x2500/assets/');
        }

        const regex = new RegExp(`(name:\\s*["']${itemName}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'g');
        if (regex.test(content)) {
            const newContent = content.replace(regex, `$1${finalPath}`);
            if (newContent !== content) {
                content = newContent;
                modified = true;
                console.log(`Updated ${itemName} in ${path.basename(filePath)}`);
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
