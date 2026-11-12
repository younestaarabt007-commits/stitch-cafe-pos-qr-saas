
const fs = require('fs');
const path = require('path');

// Base path to assets
const assetsPath = '../swiggy-style_elite_main_menu_390x2500/assets/';

// Configuration for updates
const updates = [
    {
        file: 'Brew catégorie page/script.js',
        replacements: {
            'Nitro Cold Brew': 'coffee-kyoto-cold-brew.jpg',
            'Ceremonial Matcha': 'tea-matcha.jpg',
            'Ethiopian Yirgacheffe': 'coffee-single-origin-espresso.jpg',
            'Dirty Masala Chai': 'tea-masala-chai.jpg',
            'Oat Milk Cortado': 'coffee-oat-milk-latte.jpg',
            'Lavender Honey': 'tea-lavender-earl.jpg',
            'Golden Turmeric': 'tea-ginger-lemon.jpg',
            'Caramel Macchiato': 'latte-caramel-macchiato.jpg',
            'V60 Single Origin': 'coffee-americano.jpg',
            'Blueberry Infusion': 'juice-berry-blast.jpg'
        }
    },
    {
        file: 'cold drinks catégorie page/script.js',
        replacements: {
            'Fresh Orange Juice': 'juice-fresh-orange.jpg',
            'Strawberry Smoothie': 'cold-strawberry-smoothie.jpg',
            'Chocolate Shake': 'shake-classic-chocolate.jpg',
            'Iced Latte': 'cold-iced-latte.jpg',
            'Mango Lassi': 'delicious-indian-mango-drink-high-angle_23-2148734680.avif',
            'Cold Brew': 'coffee-kyoto-cold-brew.jpg'
        }
    },
    {
        file: 'milkshake sub catégorie page/script.js',
        replacements: {
            'Classic Chocolate Fudge': 'shake-classic-chocolate.jpg',
            'Wild Strawberry Swirl': 'strawberry-ice-cream-with-delights_140725-8818.jpg',
            'Peanut Butter Power': 'smoothie-choco-malt.jpg',
            'Blueberry Vanilla Mist': 'raspberry-smoothie_1150-18529.jpg'
        }
    }
];

// Helper to update file
function updateFile(config) {
    const filePath = path.join(__dirname, config.file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${config.file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let updatedCount = 0;

    for (const [productName, imageName] of Object.entries(config.replacements)) {
        // Regex to match: name: "Product Name", ... image: "OLD_PATH"
        // We look for the product name, then the image property within the same object block
        // This is tricky with regex, so we'll use a more specific approach
        // We'll find the block containing the name, then replace the image line inside it
        
        // Simplified approach: Find the name, then look ahead for the image property
        // This assumes standard formatting: name: "X", ... image: "Y"
        const regex = new RegExp(`(name:\\s*["']${productName}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, `$1${assetsPath}${imageName}`);
            updatedCount++;
            console.log(`Updated ${productName} -> ${imageName}`);
        } else {
            console.log(`Could not find product/image match for: ${productName}`);
        }
    }

    if (updatedCount > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Saved changes to ${config.file} (${updatedCount} updates)\n`);
    } else {
        console.log(`No changes needed for ${config.file}\n`);
    }
}

// Run updates
console.log('Starting image path updates...\n');
updates.forEach(updateFile);
console.log('All updates complete.');
