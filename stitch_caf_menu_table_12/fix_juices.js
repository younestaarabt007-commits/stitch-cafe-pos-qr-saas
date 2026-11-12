const fs = require('fs');
const https = require('https');
const path = require('path');

const products = [
    { id: "juice_1", name: "Fresh Orange", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&h=600" },
    { id: "juice_2", name: "Lemon Mint", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&h=600" },
    { id: "juice_3", name: "Pineapple Punch", image: "https://images.unsplash.com/photo-1589803952453-69b9e6f2a63d?auto=format&fit=crop&w=600&h=600" },
    { id: "juice_4", name: "Apple Classic", image: "https://images.unsplash.com/photo-1567197553646-4c084b6698a0?q=80&w=500&auto=format&fit=crop" },
    { id: "juice_5", name: "Mango Glow", image: "https://images.unsplash.com/photo-1567197553646-4c084b6698a0?q=80&w=500&auto=format&fit=crop" }, // Original was duplicate of Apple
    { id: "juice_6", name: "Signature Green Juice", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600" },
    { id: "juice_7", name: "Berry Blast", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=200&h=200" },
    { id: "juice_8", name: "Mango Tango", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=200&h=200" },
    { id: "juice_9", name: "Cold Pressed Orange", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&h=600" },
    { id: "juice_10", name: "Ginger Turmeric Shot", image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=600&h=600" },
    { id: "juice_11", name: "Beetroot Energizer", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&h=600" }, // Original was duplicate of Orange
    { id: "juice_12", name: "Green Goddess", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&h=600" } // Original was duplicate of Green Juice
];

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(assetsDir, filename);
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                // Try following redirect if 3xx
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    https.get(response.headers.location, (res2) => {
                        res2.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            console.log(`Downloaded ${filename} (redirect)`);
                            resolve(filename);
                        });
                    }).on('error', (err) => {
                         fs.unlink(filepath, () => {});
                         reject(err);
                    });
                    return;
                }
                reject(new Error(`Status code ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                resolve(filename);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            console.error(`Error downloading ${filename}: ${err.message}`);
            reject(err);
        });
    });
};

(async () => {
    for (const p of products) {
        const safeName = p.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        const filename = `juice-${safeName}.jpg`;
        try {
            await downloadImage(p.image, filename);
        } catch (e) {
            console.error(`Failed to download image for ${p.name}: ${e.message}`);
        }
    }

    const scriptPath = path.join(__dirname, 'juces sub catégorie page', 'script.js');
    if (fs.existsSync(scriptPath)) {
        let content = fs.readFileSync(scriptPath, 'utf8');
        
        const newProducts = [
            { id: "juice_1", name: "Fresh Orange", description: "Valencia oranges, cold pressed", price: 4.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg", category: "citrus" },
            { id: "juice_2", name: "Lemon Mint", description: "Zesty lemon with mint", price: 4.10, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-lemon-mint.jpg", category: "citrus" },
            { id: "juice_3", name: "Pineapple Punch", description: "Tropical pineapple blend", price: 4.80, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-pineapple-punch.jpg", category: "tropical" },
            { id: "juice_4", name: "Apple Classic", description: "Cold-pressed apple", price: 4.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-apple-classic.jpg", category: "classic" },
            { id: "juice_5", name: "Mango Glow", description: "Alphonso mango puree", price: 5.25, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-mango-glow.jpg", category: "tropical" },
            { id: "juice_6", name: "Signature Green Juice", description: "Kale, Apple, Lemon", price: 9.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-signature-green-juice.jpg", category: "wellness" },
            { id: "juice_7", name: "Berry Blast", description: "Mixed berries antioxidant boost", price: 8.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-berry-blast.jpg", category: "smoothies" },
            { id: "juice_8", name: "Mango Tango", description: "Mango, peach, passion fruit", price: 8.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-mango-tango.jpg", category: "tropical" },
            { id: "juice_9", name: "Cold Pressed Orange", description: "Valencia oranges, zero water", price: 7.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-cold-pressed-orange.jpg", category: "citrus" },
            { id: "juice_10", name: "Ginger Turmeric Shot", description: "Morning immunity boost", price: 4.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-ginger-turmeric-shot.jpg", category: "wellness" },
            { id: "juice_11", name: "Beetroot Energizer", description: "Beet, Carrot, Ginger", price: 8.50, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-beetroot-energizer.jpg", category: "wellness" },
            { id: "juice_12", name: "Green Goddess", description: "Kale, spinach, apple", price: 9.00, image: "../swiggy-style_elite_main_menu_390x2500/assets/juice-green-goddess.jpg", category: "wellness" }
        ];
        
        const productsJson = JSON.stringify(newProducts, null, 4);
        // Look for the products array and replace it.
        // The file has `const products = [...]`
        // We need to be careful with the trailing comma or semicolon.
        // But the previous file content showed `const products = [ ... ];`
        
        const newContent = content.replace(/const products = \[[\s\S]*?\];/, `const products = ${productsJson};`);
        
        fs.writeFileSync(scriptPath, newContent, 'utf8');
        console.log('Updated juices script.js with new local image paths.');
    } else {
        console.error('Juices script.js not found!');
    }

})();
