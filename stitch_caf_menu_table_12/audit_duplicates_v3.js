const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');
const content = fs.readFileSync(scriptPath, 'utf8');

const itemRegex = /name:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
const items = [];
let match;

while ((match = itemRegex.exec(content)) !== null) {
    items.push({ name: match[1], image: match[2] });
}

let report = `Found ${items.length} items in main menu script.\n`;

const imageCounts = {};
const imageUsers = {};

items.forEach(item => {
    const img = item.image;
    imageCounts[img] = (imageCounts[img] || 0) + 1;
    if (!imageUsers[img]) imageUsers[img] = [];
    imageUsers[img].push(item.name);
});

report += '\n--- Duplicate Images Report ---\n';
let dupCount = 0;
Object.entries(imageUsers).forEach(([img, users]) => {
    if (users.length > 1) {
        report += `\nImage: ${img}\n`;
        report += `Used by (${users.length}): ${users.join(', ')}\n`;
        dupCount++;
    }
});

if (dupCount === 0) {
    report += '\nSUCCESS: No duplicate images found!\n';
} else {
    report += `\nFound ${dupCount} images used multiple times.\n`;
}

fs.writeFileSync('audit_report_v3.txt', report, 'utf8');
console.log('Written to audit_report_v3.txt');
