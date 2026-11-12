const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const mainMenuScript = path.join(rootDir, 'swiggy-style_elite_main_menu_390x2500', 'script.js');
const assetsRelPath = 'assets/';

// Map of Item Name to Image Filename
const imageUpdates = {
    // Brunch
    'Spicy Shakshuka': 'brunch-shakshuka.jpg',
    'Shakshuka': 'brunch-shakshuka.jpg',
    'Garden Skillet': 'brunch-garden-skillet.jpg',
    'Brunch Burrito': 'brunch-burrito.jpg',
    'Brunch Tacos': 'brunch-tacos.jpg',
    'Acai Delight': 'brunch-acai-bowl.jpg',
    'Truffle Omelette': 'brunch-truffle-omelette.jpg',
    'Avocado Toast': 'toast-avocado.jpg',
    'Classic Benedict': 'toast-benedict.jpg',
    'Vegan Power Bowl': 'brunch-vegan-bowl.jpg',
    'Steak & Eggs': 'toast-steak-eggs.jpg', // Assuming this exists or falls back
    'Full English': 'brunch-garden-skillet.jpg', // Fallback or new
    'Farm Omelette': 'brunch-truffle-omelette.jpg', // Reuse truffle image for now if unique not found
    'Iron Frittata': 'brunch-shakshuka.jpg', // Reuse

    // Coffee/Latte
    'Kyoto Cold Brew': 'coffee-kyoto-cold-brew.jpg',
    'Oat Milk Latte': 'latte-oat.jpg',
    'Single Origin Espresso': 'coffee-single-origin-espresso.jpg',
    'Vanilla Latte': 'latte-vanilla-bean.jpg',
    'Caramel Latte': 'latte-caramel-macchiato.jpg',
    'Pumpkin Spice Latte': 'latte-pumpkin-spice.jpg',

    // Cold Drinks
    'Iced Latte': 'latte-iced-matcha.jpg', // Using matcha for now or need generic iced
    'Cold Brew': 'coffee-cold-brew.jpg',
    'Creamy Orange Latte': 'latte-creamy-orange.jpg',
    'Citrus Spark': 'cold-drink-citrus-spark.jpg',
    'Mango Cream Fizz': 'cold-drink-mango-fizz.jpg',
    'Classic Apple Juice': 'juice-apple.jpg',
    'Berry Citrus': 'cold-drink-berry-citrus.jpg',

    // Pastry
    'Chocolate Éclair': 'pastry-eclair-chocolate.jpg',
    'Strawberry Tart': 'sweet-strawberry-tart.jpg',
    'Lemon Meringue Tart': 'sweet-lemon-meringue.jpg',
    'Velvet Cake Slice': 'sweet-velvet-cake.jpg'
};

function updateFile(filePath, isSubCategory = false) {
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filePath} (not found)`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let updatedCount = 0;

    for (const [itemName, imageFile] of Object.entries(imageUpdates)) {
        // Construct the replacement path
        // For main menu: assets/image.jpg
        // For sub categories: ../swiggy-style_elite_main_menu_390x2500/assets/image.jpg
        const replacementPath = isSubCategory 
            ? `../swiggy-style_elite_main_menu_390x2500/assets/${imageFile}`
            : `assets/${imageFile}`;

        // Regex to match: name: "Item Name" ... image: "old/path"
        // We look for the name, capture the block until image:
        const regex = new RegExp(`(name:\\s*["']${itemName}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, `$1${replacementPath}`);
            updatedCount++;
        }
    }

    if (updatedCount > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${updatedCount} images in ${path.basename(filePath)}`);
    } else {
        console.log(`No updates needed for ${path.basename(filePath)}`);
    }
}

console.log('Applying final image updates...');

// Update Main Menu
updateFile(mainMenuScript, false);

// Update Sub-Categories (list derived from previous audits)
const subCategories = [
    'cold drinks catégorie page/script.js',
    'Brew catégorie page/script.js',
    'latté hot drink sub catégorie page/script.js',
    'toast brunch sub catégorie page/script.js',
    'sweet pastries sub catégorie page/script.js',
    'tea and infusion sub catégorie page/script.js',
    'milkshake sub catégorie page/script.js',
    'juces sub catégorie page/script.js'
];

subCategories.forEach(sub => {
    updateFile(path.join(rootDir, sub), true);
});

console.log('Done.');
