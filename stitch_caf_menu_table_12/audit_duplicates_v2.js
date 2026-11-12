const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');
const content = fs.readFileSync(scriptPath, 'utf8');

// Regex to extract items: { ... name: "...", ... image: "..." ... }
// We'll capture name and image.
const itemRegex = /name:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
const items = [];
let match;

while ((match = itemRegex.exec(content)) !== null) {
    items.push({ name: match[1], image: match[2] });
}

console.log(`Found ${items.length} items in main menu script.`);

const imageCounts = {};
const imageUsers = {};

items.forEach(item => {
    const img = item.image;
    imageCounts[img] = (imageCounts[img] || 0) + 1;
    if (!imageUsers[img]) imageUsers[img] = [];
    imageUsers[img].push(item.name);
});

console.log('\n--- Duplicate Images Report ---');
let dupCount = 0;
Object.entries(imageUsers).forEach(([img, users]) => {
    if (users.length > 1) {
        // Filter out acceptable duplicates:
        // "Spicy Shakshuka" and "Shakshuka" (Toast) are OK.
        // "Eggs Benedict" and "Classic Benedict" (if same image) are OK? No, "Classic Benedict" uses toast-benedict, "Eggs Benedict" uses croissant-benedict.
        
        // Let's just list them all.
        console.log(`\nImage: ${img}`);
        console.log(`Used by (${users.length}): ${users.join(', ')}`);
        dupCount++;
    }
});

if (dupCount === 0) {
    console.log('\nSUCCESS: No duplicate images found!');
} else {
    console.log(`\nFound ${dupCount} images used multiple times.`);
}
