const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');
const content = fs.readFileSync(filePath, 'utf8');

const genericImages = [
    'assets/Brunch.jpg',
    'assets/Cold drinks.jpg',
    'assets/Brew.jpg',
    'assets/pastry.jpg',
    'assets/juice.jpg',
    'assets/smoothie.jpg',
    'assets/hero-omelette.png', // Checking this too as it had 3 usages
    'assets/hero-full-english.png' // Checking this too
];

console.log('--- Items using generic images in Main Menu ---');

// Improved regex to capture name and image
// Matches: name: "Name", ... image: "path"
// Note: This simple regex assumes name comes before image and they are relatively close.
// A better approach for JS files is to regex each object or finding the line.
// Given the file structure, we can look for blocks.

const lines = content.split('\n');
let currentItem = {};

lines.forEach(line => {
    if (line.includes('name:')) {
        const nameMatch = line.match(/name:\s*["']([^"']+)["']/);
        if (nameMatch) currentItem.name = nameMatch[1];
    }
    if (line.includes('image:')) {
        const imageMatch = line.match(/image:\s*["']([^"']+)["']/);
        if (imageMatch) {
            currentItem.image = imageMatch[1];
            
            // Check if it's generic
            if (genericImages.includes(currentItem.image)) {
                console.log(`Item: "${currentItem.name}" uses ${currentItem.image}`);
            }
            
            // Reset for next item
            currentItem = {};
        }
    }
});
