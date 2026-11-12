const https = require('https');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const imagesToDownload = [
    // Latte Images
    { name: 'latte-pumpkin-spice.jpg', keyword: 'pumpkin-spice-latte' },
    { name: 'latte-rose-water.jpg', keyword: 'rose-latte' },
    { name: 'latte-vanilla-bean.jpg', keyword: 'vanilla-latte' },
    { name: 'latte-caramel-macchiato.jpg', keyword: 'caramel-macchiato' },
    { name: 'latte-iced-matcha.jpg', keyword: 'iced-matcha-latte' },
    { name: 'latte-classic.jpg', keyword: 'latte-art' },
    { name: 'latte-oat.jpg', keyword: 'oat-latte' },
    { name: 'latte-spanish.jpg', keyword: 'spanish-latte' },
    { name: 'latte-hazelnut.jpg', keyword: 'hazelnut-latte' },

    // Bread Images
    { name: 'bread-signature-sourdough.jpg', keyword: 'sourdough-bread' },
    { name: 'bread-butter-croissant.jpg', keyword: 'croissant' },
    { name: 'bread-pain-au-chocolat.jpg', keyword: 'pain-au-chocolat' },
    { name: 'bread-baguette.jpg', keyword: 'baguette' },
    { name: 'bakery-dark-rye-loaf.jpg', keyword: 'rye-bread' },

    // Smoothie Images (to ensure existence)
    { name: 'smoothie-green-detox.jpg', keyword: 'green-smoothie' },
    { name: 'smoothie-choco-malt.jpg', keyword: 'chocolate-shake' },
    { name: 'smoothie-berry-cream.jpg', keyword: 'berry-smoothie' },
    { name: 'smoothie-tropical-mango.jpg', keyword: 'mango-smoothie' },
    { name: 'smoothie-green-power.jpg', keyword: 'green-juice' }
];

const downloadImage = (filename, keyword) => {
    const url = `https://source.unsplash.com/600x600/?${keyword}`;
    const filePath = path.join(assetsDir, filename);

    if (fs.existsSync(filePath)) {
        console.log(`Skipping ${filename} (already exists)`);
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
                https.get(response.headers.location, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`Downloaded: ${filename}`);
                        resolve();
                    });
                }).on('error', (err) => {
                    fs.unlink(filePath, () => {});
                    console.error(`Error downloading ${filename}: ${err.message}`);
                    reject(err);
                });
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded: ${filename}`);
                    resolve();
                });
            }
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            console.error(`Error downloading ${filename}: ${err.message}`);
            reject(err);
        });
    });
};

async function downloadAll() {
    console.log('Starting downloads...');
    for (const img of imagesToDownload) {
        try {
            await downloadImage(img.name, img.keyword);
        } catch (e) {
            console.error(`Failed to download ${img.name}`);
        }
    }
    console.log('All downloads completed.');
}

downloadAll();
