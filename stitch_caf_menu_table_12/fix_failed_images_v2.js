const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'debug_log.txt');
function log(msg) {
    fs.appendFileSync(logFile, msg + '\n');
    console.log(msg);
}

const relativeAssetsPath = '../swiggy-style_elite_main_menu_390x2500/assets/';

const tasks = [
    // Cold Drinks
    {
        filePath: path.join(__dirname, 'cold drinks catégorie page', 'script.js'),
        replacements: [
            { url: "https://images.unsplash.com/photo-1541976076758-65c1b5dc0f5b?q=80&w=500&auto=format&fit=crop", local: "juice-fresh-orange.jpg" },
            { url: "https://images.unsplash.com/photo-1542444459-db9b6f23e273?q=80&w=500&auto=format&fit=crop", local: "close-up-milkshake-glass-plate_117406-7215.jpg" },
            { url: "https://images.unsplash.com/photo-1632773171696-145c3f5f262c?q=80&w=500&auto=format&fit=crop", local: "delicious-indian-mango-drink-high-angle_23-2148734680.avif" },
            { url: "https://images.unsplash.com/photo-1510626176956-c2a2b4ff10ec?q=80&w=500&auto=format&fit=crop", local: "coffee-kyoto-cold-brew.jpg" }
        ]
    },
    // Smoothies
    {
        filePath: path.join(__dirname, 'smothie sub catégorie page', 'script.js'),
        replacements: [
            { url: "https://images.unsplash.com/photo-1502741119870-16c6b8d5fbb4?q=80&w=500&auto=format&fit=crop", local: "juice-berry-blast.jpg" },
            { url: "https://images.unsplash.com/photo-1502741526807-1e4a6401a2ac?q=80&w=500&auto=format&fit=crop", local: "kiwi-milk-shake-table_140725-8608.jpg" },
            { url: "https://images.unsplash.com/photo-1559716808-4fd1a5a55ca9?q=80&w=500&auto=format&fit=crop", local: "exotic-cocktail-closeup_181624-983.avif" }
        ]
    },
    // Lattes
    {
        filePath: path.join(__dirname, 'latté hot drink sub catégorie page', 'script.js'),
        replacements: [
            { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop", local: "coffee-velvet-flat-white.jpg" },
            { url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop", local: "coffee-oat-milk-latte.jpg" },
            { url: "https://images.unsplash.com/photo-1511537632536-acc2a4223056?w=500&h=500&fit=crop", local: "coffee-single-origin-espresso.jpg" },
            { url: "https://images.unsplash.com/photo-1461023058943-48db5d469292?w=500&h=500&fit=crop", local: "caramel-cold-shake-with-cream_140725-4501.avif" },
            { url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&h=500&fit=crop", local: "coffee-velvet-flat-white.jpg" },
            { url: "https://images.unsplash.com/photo-1541167760496-1613c3434a74?w=500&h=500&fit=crop", local: "Brew.jpg" },
            { url: "https://images.unsplash.com/photo-1570968993084-a8e384554f1f?w=500&h=500&fit=crop", local: "smoothie-green-power.jpg" },
            { url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&h=500&fit=crop", local: "coffee-dark-mocha.jpg" },
            { url: "https://images.unsplash.com/photo-1631900161776-9de35f9d5fbe?q=80&w=500&auto=format&fit=crop", local: "coffee-oat-milk-latte.jpg" }
        ]
    },
    // Milkshakes (fix duplicate)
    {
        filePath: path.join(__dirname, 'milkshake sub catégorie page', 'script.js'),
        replacements: [
            // Fixing id 3 Peanut Butter Power which currently uses close-up-milkshake-glass-plate_117406-7215.jpg (same as id 1)
            // But here we need to be careful not to replace id 1.
            // We can replace by finding the object definition if possible, but regex is easier if unique.
            // Since the string is identical, we might replace both if we use global replace.
            // But the current file has specific lines.
            // Let's just read the file and replace the second occurrence.
        ]
    }
];

function processTasks() {
    for (const task of tasks) {
        if (!fs.existsSync(task.filePath)) {
            log(`File not found: ${task.filePath}`);
            continue;
        }

        let content = fs.readFileSync(task.filePath, 'utf8');
        let modified = false;

        if (task.filePath.includes('milkshake')) {
             // Special handling for milkshake duplicate
             // Find the second occurrence of the image path and replace it
             const duplicateImage = "../swiggy-style_elite_main_menu_390x2500/assets/close-up-milkshake-glass-plate_117406-7215.jpg";
             const newImage = "../swiggy-style_elite_main_menu_390x2500/assets/caramel-cold-shake-with-cream_140725-4501.avif";
             
             // We want to replace it ONLY for Peanut Butter Power (id: 3)
             // We can look for the context
             if (content.includes('id: 3') && content.includes(duplicateImage)) {
                 // Simple approach: split by id: 3, then replace in the second part
                 const parts = content.split('id: 3');
                 if (parts.length > 1) {
                     const afterId3 = parts[1];
                     // Replace the first occurrence of duplicateImage in afterId3
                     const newAfterId3 = afterId3.replace(duplicateImage, newImage);
                     content = parts[0] + 'id: 3' + newAfterId3;
                     modified = true;
                     log(`Fixed duplicate image in ${task.filePath}`);
                 }
             }
        } else {
            for (const item of task.replacements) {
                if (content.includes(item.url)) {
                    content = content.replace(item.url, relativeAssetsPath + item.local);
                    modified = true;
                    log(`Replaced ${item.url} with ${item.local}`);
                } else {
                    // log(`URL not found: ${item.url}`);
                }
            }
        }

        if (modified) {
            fs.writeFileSync(task.filePath, content, 'utf8');
            log(`Updated ${task.filePath}`);
        } else {
            log(`No changes needed for ${task.filePath}`);
        }
    }
}

processTasks();
