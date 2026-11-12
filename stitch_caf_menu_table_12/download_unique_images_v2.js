
const fs = require('fs');
const https = require('https');
const path = require('path');

const assetsDir = path.join(process.cwd(), 'stitch_caf_menu_table_12', 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const images = [
    // BREAD
    { name: 'bread-butter-croissant.jpg', id: '1555507036-f62eeac6f80c' },
    { name: 'bread-pain-au-chocolat.jpg', id: '1623334044303-241021148842' },
    { name: 'bread-baguette.jpg', id: '1589367920969-ab8e050c04f5' },
    { name: 'bakery-dark-rye-loaf.jpg', id: '1509440159598-7106ff28ebfe' },
    { name: 'bread-signature-sourdough.jpg', id: '1585478479329-f4e3592c4387' }, // Ensure we have it

    // SMOOTHIES
    { name: 'smoothie-green-glow.jpg', id: '1610970881699-44a5587cabec' },
    { name: 'smoothie-wild-berry.jpg', id: '1626078436899-775e847074c3' },
    { name: 'smoothie-mango-lassi.jpg', id: '1623065422902-30a2d299bbe4' },
    
    // SHAKES
    { name: 'shake-oreo-blast.jpg', id: '1563805042-7684c019e1cb' },
    { name: 'shake-classic-chocolate.jpg', id: '1572490006316-2545a86a8a32' },
    { name: 'shake-vanilla-bean.jpg', id: '1577805947693-f9d446f03377' },
    { name: 'shake-strawberry-delight.jpg', id: '1579954115545-2855118f9714' },

    // LATTES
    { name: 'latte-classic.jpg', id: '1541167760475-3294443f5203' },
    { name: 'latte-vanilla.jpg', id: '1593443354493-984251a84dcb' }, // Caramel-ish but works
    { name: 'latte-hazelnut.jpg', id: '1461023058943-07fcbe16d735' },
    { name: 'latte-mocha.jpg', id: '1570968995828-5290c678c521' },
    { name: 'latte-pumpkin-spice.jpg', id: '1570696515667-935521c97f4e' }, // Real pumpkin spice look
    { name: 'latte-rose.jpg', id: '1544787219-6f47d46b259d' }, // Pink latte

    // COLD DRINKS
    { name: 'cold-iced-latte.jpg', id: '1517701604599-56e8b79b6343' },
    { name: 'cold-brew.jpg', id: '1517701550929-5784315a96af' }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${path.basename(filepath)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            console.error(`Error downloading ${url}: ${err.message}`);
            reject(err);
        });
    });
};

async function downloadAll() {
    for (const img of images) {
        const filepath = path.join(assetsDir, img.name);
        if (fs.existsSync(filepath)) {
            // console.log(`Skipping existing: ${img.name}`);
            // continue; 
            // Force overwrite to ensure correct image if user complains about duplicates
        }
        
        const url = `https://images.unsplash.com/photo-${img.id}?q=80&w=600&auto=format&fit=crop`;
        try {
            await downloadImage(url, filepath);
        } catch (e) {
            console.error(`Failed to download ${img.name}`);
        }
    }
}

downloadAll();
