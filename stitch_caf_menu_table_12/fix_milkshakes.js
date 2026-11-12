const fs = require('fs');
const https = require('https');
const path = require('path');

const products = [
    {
        id: 1,
        name: "Classic Chocolate",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80"
    },
    {
        id: 2,
        name: "Strawberry Bliss",
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&h=600&q=80"
    },
    {
        id: 3,
        name: "Peanut Butter Power",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&h=600&q=80"
    },
    {
        id: 4,
        name: "Blueberry Burst",
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&h=600&q=80" // Original was duplicate of Strawberry
    }
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
        const filename = `milkshake-${safeName}.jpg`;
        try {
            await downloadImage(p.image, filename);
        } catch (e) {
            console.error(`Failed to download image for ${p.name}: ${e.message}`);
        }
    }

    const scriptPath = path.join(__dirname, 'milkshake sub catégorie page', 'script.js');
    if (fs.existsSync(scriptPath)) {
        let content = fs.readFileSync(scriptPath, 'utf8');
        
        const newProducts = [
          {
            id: 1,
            name: "Classic Chocolate",
            description: "Double dark chocolate with whipped cream",
            calories: "450 kcal",
            price: 6.50,
            image: "../swiggy-style_elite_main_menu_390x2500/assets/milkshake-classic-chocolate.jpg",
            category: "chocolate"
          },
          {
            id: 2,
            name: "Strawberry Bliss",
            description: "Fresh farm berries with creamy vanilla base",
            calories: "380 kcal",
            price: 7.25,
            image: "../swiggy-style_elite_main_menu_390x2500/assets/milkshake-strawberry-bliss.jpg",
            category: "fruit"
          },
          {
            id: 3,
            name: "Peanut Butter Power",
            description: "Protein rich shake with roasted peanuts",
            calories: "520 kcal",
            price: 8.00,
            image: "../swiggy-style_elite_main_menu_390x2500/assets/milkshake-peanut-butter-power.jpg",
            category: "protein"
          },
          {
            id: 4,
            name: "Blueberry Burst",
            description: "Antioxidant blast with premium vanilla bean",
            calories: "340 kcal",
            price: 7.50,
            image: "../swiggy-style_elite_main_menu_390x2500/assets/milkshake-blueberry-burst.jpg",
            category: "fruit"
          }
        ];
        
        const productsJson = JSON.stringify(newProducts, null, 4);
        const newContent = content.replace(/const products = \[[\s\S]*?\];/, `const products = ${productsJson};`);
        
        fs.writeFileSync(scriptPath, newContent, 'utf8');
        console.log('Updated milkshake script.js with new local image paths.');
    } else {
        console.error('Milkshake script.js not found!');
    }

})();
