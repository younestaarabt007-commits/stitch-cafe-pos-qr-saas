const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const assetsPath = '../swiggy-style_elite_main_menu_390x2500/assets/';

// Configuration for remaining categories
const updates = [
    {
        file: 'tea and infusion sub catégorie page/script.js',
        replacements: {
            'Ceremonial Matcha': 'tea-matcha.jpg',
            'Masala Chai': 'tea-masala-chai.jpg',
            'Ginger Lemon': 'tea-ginger-lemon.jpg',
            'Earl Grey': 'tea-earl-grey.jpg',
            'Chamomile': 'tea-chamomile.jpg',
            'Green Tea': 'tea-green.jpg',
            'Peppermint': 'tea-peppermint.jpg',
            'Jasmine': 'tea-jasmine.jpg'
        }
    }
];

function updateFile(config) {
    const filePath = path.join(rootDir, config.file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${config.file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let updatedCount = 0;

    for (const [productName, imageName] of Object.entries(config.replacements)) {
        // Regex to match: name: "Product Name" ... image: "old/path"
        // We use [\s\S]*? to match across newlines between name and image
        const regex = new RegExp(`(name:\\s*["']${productName}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'g');
        
        if (regex.test(content)) {
            // Check if already correct to avoid redundant writes (though harmless)
            const match = content.match(regex);
            if (match && match[0].includes(imageName)) {
                 // console.log(`Skipping ${productName}, already correct.`);
                 continue;
            }

            content = content.replace(regex, `$1${assetsPath}${imageName}`);
            console.log(`[${config.file}] Updated: ${productName} -> ${imageName}`);
            updatedCount++;
        }
    }

    if (updatedCount > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Saved ${config.file} with ${updatedCount} updates.\n`);
    } else {
        console.log(`No updates needed for ${config.file}\n`);
    }
}

console.log('Starting image path updates for remaining categories...\n');
updates.forEach(updateFile);
console.log('Done.');
