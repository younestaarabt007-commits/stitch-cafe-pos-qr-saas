const fs = require('fs');
const https = require('https');
const path = require('path');

const logPath = path.join(__dirname, 'resolve_status.txt');
function log(message) {
    fs.appendFileSync(logPath, message + '\n');
}

log('Script started');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');
const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'script.js');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Map of Item Name -> New Unique Image Config
const uniqueUpdates = [
    // Brunch
    { name: 'Brunch Burrito', image: 'brunch-burrito-special.jpg', id: '1626700051142-8a6d05fe0534' },
    { name: 'Brunch Tacos', image: 'brunch-tacos-deluxe.jpg', id: '1565299524732-638a83085f8b' },
    
    // Smoothies
    { name: 'Acai Delight', image: 'smoothie-acai-bowl.jpg', id: '1590301157890-4810ed352733' },
    
    // Coffee
    { name: 'Nitro Cold Brew', image: 'coffee-nitro-brew.jpg', id: '1622483767028-3f66f32aef97' },
    { name: 'Cold Brew', image: 'coffee-classic-cold-brew.jpg', id: '1517701550929-5784315a96af' },
    { name: 'Ethiopian Yirgacheffe', image: 'coffee-ethiopian-pour-over.jpg', id: '1497935586351-b67a49e012bf' },
    
    // Lattes
    { name: 'Iced Latte', image: 'latte-iced-tall.jpg', id: '1517701604599-56e8b79b6343' },
    { name: 'Caramel Latte', image: 'latte-caramel-swirl.jpg', id: '1593443354493-984251a84dcb' },
    
    // Tea
    { name: 'Dirty Masala Chai', image: 'tea-dirty-chai-espresso.jpg', id: '1561359313733-84b1a4551325' },
    
    // Juices
    { name: 'Blueberry Infusion', image: 'juice-blueberry-fresh.jpg', id: '1490885578174-acda8905c2c6' },
    { name: 'Mango Cream Fizz', image: 'juice-mango-fizz.jpg', id: '1546173159-315724a31696' }
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
                log(`Downloaded: ${path.basename(filepath)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            log(`Error downloading ${url}: ${err.message}`);
            // Don't reject, just resolve to allow script to continue (we will use fallback if needed)
            resolve();
        });
    });
};

async function processUpdates() {
    log('Starting unique image download...');
    
    // 1. Download images
    for (const item of uniqueUpdates) {
        const filepath = path.join(assetsDir, item.image);
        const url = `https://images.unsplash.com/photo-${item.id}?q=80&w=600&auto=format&fit=crop`;
        
        if (!fs.existsSync(filepath)) {
            await downloadImage(url, filepath);
        } else {
            log(`Exists: ${item.image}`);
        }
    }

    // 2. Update script.js
    log('Updating script.js...');
    let content = fs.readFileSync(scriptPath, 'utf8');
    let updatesCount = 0;

    for (const item of uniqueUpdates) {
        const regex = new RegExp(`(name:\\s*["']${item.name}["'][\\s\\S]*?image:\\s*["'])([^"']+)`, 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, `$1assets/${item.image}`);
            log(`Updated image for: ${item.name} -> assets/${item.image}`);
            updatesCount++;
        } else {
            log(`Could not find exact match for: ${item.name}`);
        }
    }

    fs.writeFileSync(scriptPath, content, 'utf8');
    log(`\nDone! Updated ${updatesCount} items in script.js.`);
}

processUpdates().catch(err => log(`Fatal Error: ${err.message}`));
