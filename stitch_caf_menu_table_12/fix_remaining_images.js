const fs = require('fs');
const https = require('https');
const path = require('path');
const url = require('url');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');
const relativeAssetsPath = '../swiggy-style_elite_main_menu_390x2500/assets/';

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const tasks = [
    // Cold Drinks
    {
        filePath: path.join(__dirname, 'cold drinks catégorie page', 'script.js'),
        items: [
            { id: 1, name: "Fresh Orange Juice", url: "https://images.unsplash.com/photo-1541976076758-65c1b5dc0f5b?q=80&w=500&auto=format&fit=crop", filename: "cold-fresh-orange-juice.jpg" },
            { id: 2, name: "Strawberry Smoothie", url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=500&auto=format&fit=crop", filename: "cold-strawberry-smoothie.jpg" },
            { id: 3, name: "Chocolate Shake", url: "https://images.unsplash.com/photo-1542444459-db9b6f23e273?q=80&w=500&auto=format&fit=crop", filename: "cold-chocolate-shake.jpg" },
            { id: 4, name: "Iced Latte", url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop", filename: "cold-iced-latte.jpg" },
            { id: 5, name: "Mango Lassi", url: "https://images.unsplash.com/photo-1632773171696-145c3f5f262c?q=80&w=500&auto=format&fit=crop", filename: "cold-mango-lassi.jpg" },
            { id: 6, name: "Cold Brew", url: "https://images.unsplash.com/photo-1510626176956-c2a2b4ff10ec?q=80&w=500&auto=format&fit=crop", filename: "cold-brew-coffee.jpg" }
        ]
    },
    // Smoothies
    {
        filePath: path.join(__dirname, 'smothie sub catégorie page', 'script.js'),
        items: [
            { id: "smoothie_1", name: "Berry Burst", url: "https://images.unsplash.com/photo-1502741119870-16c6b8d5fbb4?q=80&w=500&auto=format&fit=crop", filename: "smoothie-berry-burst.jpg" },
            { id: "smoothie_2", name: "Green Power", url: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?q=80&w=500&auto=format&fit=crop", filename: "smoothie-green-power.jpg" },
            { id: "smoothie_3", name: "Protein Plus", url: "https://images.unsplash.com/photo-1502741526807-1e4a6401a2ac?q=80&w=500&auto=format&fit=crop", filename: "smoothie-protein-plus.jpg" },
            { id: "smoothie_4", name: "Tropical Smooth", url: "https://images.unsplash.com/photo-1559716808-4fd1a5a55ca9?q=80&w=500&auto=format&fit=crop", filename: "smoothie-tropical.jpg" }
        ]
    },
    // Lattes
    {
        filePath: path.join(__dirname, 'latté hot drink sub catégorie page', 'script.js'),
        items: [
            { id: "latte_1", name: "Classic Latte", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500&auto=format&fit=crop", filename: "latte-classic.jpg" },
            { id: "latte_2", name: "Signature Oat Latte", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop", filename: "latte-oat.jpg" },
            { id: "latte_3", name: "Vanilla Bean", url: "https://images.unsplash.com/photo-1511537632536-acc2a4223056?w=500&h=500&fit=crop", filename: "latte-vanilla.jpg" },
            { id: "latte_4", name: "Caramel Macchiato", url: "https://images.unsplash.com/photo-1461023058943-48db5d469292?w=500&h=500&fit=crop", filename: "latte-caramel.jpg" },
            { id: "latte_5", name: "Spanish Latte", url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&h=500&fit=crop", filename: "latte-spanish.jpg" },
            { id: "latte_6", name: "Rose Water Latte", url: "https://images.unsplash.com/photo-1541167760496-1613c3434a74?w=500&h=500&fit=crop", filename: "latte-rose.jpg" },
            { id: "latte_7", name: "Iced Matcha Latte", url: "https://images.unsplash.com/photo-1570968993084-a8e384554f1f?w=500&h=500&fit=crop", filename: "latte-matcha.jpg" },
            { id: "latte_8", name: "Hazelnut Latte", url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&h=500&fit=crop", filename: "latte-hazelnut.jpg" },
            { id: "latte_9", name: "Pumpkin Spice Latte", url: "https://images.unsplash.com/photo-1631900161776-9de35f9d5fbe?q=80&w=500&auto=format&fit=crop", filename: "latte-pumpkin.jpg" }
        ]
    }
];

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
            } else {
                fs.unlink(filepath, () => {}); // Delete the file async
                reject(new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // Delete the file async
            reject(err);
        });
    });
}

async function processTasks() {
    for (const task of tasks) {
        if (!fs.existsSync(task.filePath)) {
            console.log(`File not found: ${task.filePath}`);
            continue;
        }

        let content = fs.readFileSync(task.filePath, 'utf8');
        let modified = false;

        for (const item of task.items) {
            const localPath = path.join(assetsDir, item.filename);
            const relativePath = relativeAssetsPath + item.filename;
            
            // Check if we need to replace
            // We look for the id in the content and check if the image matches the URL or is just external
            // A simple replace of the URL string is safest if the URL is unique enough
            
            if (content.includes(item.url)) {
                // Download if not exists
                if (!fs.existsSync(localPath)) {
                    console.log(`Downloading ${item.name} to ${item.filename}...`);
                    try {
                        await downloadImage(item.url, localPath);
                        console.log(`Downloaded ${item.filename}`);
                    } catch (err) {
                        console.error(`Failed to download ${item.name}: ${err.message}`);
                        // Fallback to existing image if download fails
                        // We will NOT update the script if download fails, to avoid broken links
                        // Or we could map to a generic image.
                        // Let's try to map to a generic image if download fails.
                        // For now, let's just skip updating if download fails.
                        continue; 
                    }
                } else {
                    console.log(`Image ${item.filename} already exists.`);
                }
                
                // Update script
                content = content.replace(item.url, relativePath);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(task.filePath, content, 'utf8');
            console.log(`Updated ${task.filePath}`);
        } else {
            console.log(`No changes needed for ${task.filePath}`);
        }
    }
}

processTasks().catch(console.error);
