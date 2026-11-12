const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');

console.log('Starting update for:', scriptPath);

if (!fs.existsSync(scriptPath)) {
    console.error('Script file not found:', scriptPath);
    process.exit(1);
}

let content = fs.readFileSync(scriptPath, 'utf8');
const originalContent = content;

// Define replacements mapping
const replacements = {
    // Brew items
    'Nitro Cold Brew': 'coffee-kyoto-cold-brew.jpg',
    'Ceremonial Matcha': 'tea-matcha.jpg',
    'Ethiopian Yirgacheffe': 'coffee-single-origin-espresso.jpg',
    'Velvet Flat White': 'coffee-velvet-flat-white.jpg',
    'Oat Milk Draft Latte': 'coffee-oat-milk-latte.jpg',
    'Americano': 'coffee-americano.jpg',
    'Dark Mocha': 'coffee-dark-mocha.jpg',
    'Classic Latte': 'latte-classic.jpg',
    'Hazelnut Latte': 'latte-hazelnut.jpg',
    'Vanilla Bean Latte': 'latte-vanilla-bean.jpg',
    'Dirty Masala Chai': 'tea-masala-chai.jpg',
    'Oat Milk Cortado': 'coffee-oat-milk-latte.jpg',
    'Lavender Honey': 'tea-lavender-earl.jpg',
    'Golden Turmeric': 'tea-ginger-lemon.jpg',
    'Caramel Macchiato': 'latte-caramel-macchiato.jpg',
    'V60 Single Origin': 'coffee-single-origin-espresso.jpg',
    'Blueberry Infusion': 'juice-berry-blast.jpg',
    
    // Bread/Pastry items
    'Chocolate Babka': 'bakery-chocolate-babka.jpg',
    'Sourdough Loaf': 'bakery-signature-sourdough.jpg', 
    'Signature Sourdough': 'bread-signature-sourdough.jpg',
    'Butter Croissant': 'bread-butter-croissant.jpg',
    'Almond Croissant': 'sweet-almond-croissant.jpg',
    'Pain au Chocolat': 'bread-pain-au-chocolat.jpg',
    'Cranberry Walnut Sourdough': 'bakery-cranberry-walnut.jpg',
    'Dark Rye Loaf': 'bakery-dark-rye-loaf.jpg',
    'Herbed Focaccia': 'bakery-herbed-focaccia.jpg',
    'Honey Brioche': 'bakery-honey-brioche.jpg',
    'Parisian Baguette': 'bakery-parisian-baguette.jpg',
    'Seeded Multigrain': 'bakery-seeded-multigrain.jpg',
    'Stoneground Wheat': 'bakery-stoneground-wheat.jpg',
    'Chocolate Eclair': 'bakery-chocolate-eclair.jpg',
    'Cranberry Walnut': 'bakery-cranberry-walnut.jpg',

    // Tea items (if present separately)
    'Masala Chai': 'tea-masala-chai.jpg',
    'Ginger Lemon': 'tea-ginger-lemon.jpg',
    'Moroccan Mint': 'tea-moroccan-mint.jpg',
    'Royal Milk Tea': 'tea-royal-milk.jpg',
    'Iced Peach Oolong': 'tea-iced-peach.jpg'
};

let updatedCount = 0;

for (const [productName, imageName] of Object.entries(replacements)) {
    // Regex to find the image property for a specific product name
    // Matches: name: "Product", ... image: "old_path"
    // We use [\s\S]*? to match across newlines (description, price, etc.)
    const regex = new RegExp(`(name:\\s*["']${productName}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'g');
    
    if (regex.test(content)) {
        content = content.replace(regex, `$1assets/${imageName}`);
        console.log(`Updated image for: ${productName} -> assets/${imageName}`);
        updatedCount++;
    }
}

if (updatedCount > 0) {
    fs.writeFileSync(scriptPath, content, 'utf8');
    console.log(`Successfully updated ${updatedCount} images in main menu script.`);
} else {
    console.log('No updates needed. Content matches original.');
}

console.log('DONE');
