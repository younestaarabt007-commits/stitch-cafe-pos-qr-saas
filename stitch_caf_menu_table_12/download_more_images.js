
const fs = require('fs');
const path = require('path');
const https = require('https');

// Use the existing assets directory
const assetsDir = path.join(process.cwd(), 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Function to download an image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filepath)) {
            console.log(`File already exists: ${filepath}`);
            resolve();
            return;
        }

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        console.log(`Downloaded: ${filepath}`);
                        resolve();
                    });
                });
            } else {
                file.close();
                fs.unlink(filepath, () => {}); // Delete partial file
                reject(`Failed to download ${url}: Status Code ${response.statusCode}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // Delete partial file
            reject(err.message);
        });
    });
}

// List of additional images to download for missing categories
const images = [
    // JUICES
    { name: 'juice-orange.jpg', id: '1600271886742-f049cd451bba' },
    { name: 'juice-apple.jpg', id: '1603569283847-aa295f0d016a' },
    { name: 'juice-carrot.jpg', id: '1613478221278-2898625f3e96' },
    { name: 'juice-watermelon.jpg', id: '1589734248315-f8c54acbc3f2' },
    { name: 'juice-pineapple.jpg', id: '1610832958506-aa56368176cf' },
    { name: 'juice-lemonade.jpg', id: '1513558161293-cdaf765ed2fd' },
    { name: 'juice-pomegranate.jpg', id: '1633334704515-5c9a0c258385' },
    { name: 'juice-grapefruit.jpg', id: '1618897305335-9509b552345d' },

    // TEA
    { name: 'tea-mint.jpg', id: '1597481499750-3e6b22637e12' },
    { name: 'tea-green.jpg', id: '1627435601361-ec25f5b1d0e5' },
    { name: 'tea-black.jpg', id: '1576092762791-d7e22df651f6' },
    { name: 'tea-chamomile.jpg', id: '1597318181391-4422d9d12d6f' },
    { name: 'tea-earl-grey.jpg', id: '1556679343-c7306c1976bc' },
    { name: 'tea-iced-lemon.jpg', id: '1499638673689-79a0b5115d87' },
    { name: 'tea-hibiscus.jpg', id: '1564890407-89118dbc46b5' },

    // PASTRIES (Sweet Treats)
    { name: 'pastry-croissant.jpg', id: '1555507036-f62eeac6f80c' }, // Reusing but ensuring distinct name if needed
    { name: 'pastry-muffin-blueberry.jpg', id: '1607958996333-41aef7caefaa' },
    { name: 'pastry-muffin-chocolate.jpg', id: '1614707267537-b85aaf00c4b7' },
    { name: 'pastry-danish.jpg', id: '1605636453916-25944d1887e4' },
    { name: 'pastry-fruit-tart.jpg', id: '1563729784474-d77dbb933e9e' },
    { name: 'pastry-cinnamon-roll.jpg', id: '1509365465944-2555daa1fe2a' },
    { name: 'pastry-macarons.jpg', id: '1569864372136-42269b52529d' },
    { name: 'pastry-cheesecake.jpg', id: '1524351199678-941a5d80d63d' },

    // BLACK COFFEE
    { name: 'coffee-espresso.jpg', id: '1510707577739-2569880421d3' },
    { name: 'coffee-americano.jpg', id: '1551033406-611cf9a28f67' },
    { name: 'coffee-long-black.jpg', id: '1504630083234-141d77f95184' },
    { name: 'coffee-macchiato.jpg', id: '1485808191679-5f8c7c835548' },
    { name: 'coffee-pour-over.jpg', id: '1559496417-e7f25cb244f3' },

    // BREAKFAST / TOAST
    { name: 'breakfast-omelette.jpg', id: '1584776292279-cc7205495611' },
    { name: 'breakfast-pancakes.jpg', id: '1506084868230-bb9d95c24759' },
    { name: 'breakfast-waffles.jpg', id: '1562376550992-b61dc16f2253' },
    { name: 'breakfast-avocado-toast.jpg', id: '1588137372308-15f75323ca8d' },
    { name: 'breakfast-eggs-benedict.jpg', id: '1608475552706-085429c011f0' },
    { name: 'breakfast-granola.jpg', id: '1517093743973-5b426798d28c' }
];

async function downloadAll() {
    console.log(`Starting download of ${images.length} new unique images...`);
    let successCount = 0;
    
    for (const img of images) {
        const filepath = path.join(assetsDir, img.name);
        // Using Unsplash source API format for consistency
        const url = `https://images.unsplash.com/photo-${img.id}?q=80&w=600&auto=format&fit=crop`;
        try {
            await downloadImage(url, filepath);
            successCount++;
        } catch (e) {
            console.error(`Failed to download ${img.name}: ${e}`);
        }
    }
    console.log(`Download complete. Successfully downloaded ${successCount}/${images.length} images.`);
}

downloadAll();
