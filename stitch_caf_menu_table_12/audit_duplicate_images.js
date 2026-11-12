const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const assetsDir = path.join(rootDir, 'swiggy-style_elite_main_menu_390x2500', 'assets');

// Function to recursively find all script.js files
function findScriptFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                findScriptFiles(filePath, fileList);
            }
        } else if (file === 'script.js') {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const scriptFiles = findScriptFiles(rootDir);
const imageUsage = {};

scriptFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Regex to capture image paths: image: "path" or image: 'path'
    const regex = /image:\s*["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const imagePath = match[1];
        // Normalize path to just the filename if it points to assets
        let imageName = imagePath;
        if (imagePath.includes('assets/')) {
            imageName = imagePath.split('assets/')[1];
        } else if (imagePath.includes('swiggy-style_elite_main_menu_390x2500/assets/')) {
             imageName = imagePath.split('assets/')[1];
        }

        // Only track assets
        if (imagePath.includes('assets') || imagePath.endsWith('.jpg') || imagePath.endsWith('.png')) {
             if (!imageUsage[imageName]) {
                imageUsage[imageName] = [];
            }
            imageUsage[imageName].push({
                file: path.relative(rootDir, file),
                fullPath: imagePath
            });
        }
    }
});

console.log('--- Duplicate Image Usage Report ---');
let duplicateCount = 0;
for (const [image, usages] of Object.entries(imageUsage)) {
    if (usages.length > 1) {
        console.log(`\nImage: ${image}`);
        console.log(`Used ${usages.length} times in:`);
        usages.forEach(u => console.log(`  - ${u.file} (path: ${u.fullPath})`));
        duplicateCount++;
    }
}

if (duplicateCount === 0) {
    console.log('No duplicate images found!');
} else {
    console.log(`\nFound ${duplicateCount} images used multiple times.`);
}
