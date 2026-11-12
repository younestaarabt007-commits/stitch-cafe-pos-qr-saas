
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// Directories to scan
const directories = [
    'cold drinks catégorie page',
    'latté hot drink sub catégorie page',
    'artisanal bread sub catégorie page',
    'black coffee sub catégorie page',
    'milkshake sub catégorie page',
    'juces sub catégorie page',
    'smothies and shakes sub catégorie page',
    'sweet pastries sub catégorie page',
    'tea hot drink sub catégorie page',
    'toast sub catégorie page',
    'swiggy-style_elite_main_menu_390x2500'
];

function scan() {
    console.log('Scanning for products...');
    let totalIssues = 0;
    const imageUsage = {}; // imagePath -> [productName1, productName2, ...]

    directories.forEach(dir => {
        const scriptPath = path.join(rootDir, dir, 'script.js');
        
        if (!fs.existsSync(scriptPath)) {
            console.log(`Skipping ${dir} (no script.js)`);
            return;
        }

        const content = fs.readFileSync(scriptPath, 'utf8');
        
        // Extract products array block
        const productMatch = content.match(/const products = \[\s*([\s\S]*?)\];/);
        if (!productMatch) {
            console.log(`No products found in ${dir}`);
            return;
        }

        const productBlock = productMatch[1];
        
        // Match objects roughly: { ... }
        // We want to extract name and image
        // Regex to find image: "..." or image: '...'
        // and name: "..." or name: '...'
        
        // Iterate over lines to be safer or split by objects
        const lines = productBlock.split('\n');
        let currentProduct = {};
        
        lines.forEach(line => {
            if (line.includes('{')) currentProduct = {};
            
            const nameMatch = line.match(/name:\s*["']([^"']+)["']/);
            if (nameMatch) currentProduct.name = nameMatch[1];
            
            const imgMatch = line.match(/image:\s*["']([^"']+)["']/);
            if (imgMatch) {
                const imgPath = imgMatch[1];
                const fullPath = path.resolve(path.dirname(scriptPath), imgPath);
                
                // Check External
                if (imgPath.startsWith('http')) {
                    console.log(`[EXTERNAL] ${dir} -> ${currentProduct.name}: ${imgPath}`);
                    totalIssues++;
                } 
                // Check Missing
                else if (!fs.existsSync(fullPath)) {
                    console.log(`[MISSING] ${dir} -> ${currentProduct.name}: ${imgPath}`);
                    totalIssues++;
                }

                // Track Usage for Duplicates
                if (!imageUsage[imgPath]) imageUsage[imgPath] = [];
                imageUsage[imgPath].push(`${dir} -> ${currentProduct.name}`);
            }
        });
    });

    console.log('\n--- Duplicate Image Check ---');
    Object.keys(imageUsage).forEach(img => {
        if (imageUsage[img].length > 1) {
            console.log(`[DUPLICATE] ${img} used by:`);
            imageUsage[img].forEach(usage => console.log(`  - ${usage}`));
        }
    });
}

scan();
