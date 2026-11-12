const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Map of filename to Unsplash Photo ID (using specific, high-quality food images)
const imagesToDownload = {
    // Brunch
    'brunch-shakshuka.jpg': '1590412255854-47b2513f56d9', // Shakshuka
    'brunch-garden-skillet.jpg': '1511690656952-34342d5c28b5', // Veggie skillet
    'brunch-burrito.jpg': '1626700051142-68c4d4b358d1', // Burrito
    'brunch-tacos.jpg': '1565299585323-38d68c8eaffc', // Tacos
    'brunch-acai-bowl.jpg': '1590301157890-4810ed352733', // Acai bowl
    'brunch-truffle-omelette.jpg': '1510693206972-df098062cb71', // Omelette
    'toast-avocado.jpg': '1588137372308-15f75323ca8d', // Avocado Toast
    'toast-benedict.jpg': '1608039348721-b43528b631d8', // Eggs Benedict
    'brunch-vegan-bowl.jpg': '1512621776951-a57141f2eefd', // Vegan bowl
    
    // Coffee/Latte
    'latte-oat.jpg': '1541167760496-1628856ab772', // Oat latte
    'coffee-single-origin-espresso.jpg': '1510707589731-980e93655381', // Espresso
    'latte-vanilla-bean.jpg': '1572442388796-11668438e537', // Vanilla latte
    'latte-caramel-macchiato.jpg': '1461023058943-07fcbe16d735', // Caramel macchiato
    'latte-pumpkin-spice.jpg': '1509042239860-f550ce710b93', // Pumpkin spice
    
    // Cold Drinks
    'latte-iced-matcha.jpg': '1515823662972-da6a2e1d3102', // Iced matcha
    'coffee-cold-brew.jpg': '1517701604599-56d78c3f4c6b', // Cold brew
    'latte-creamy-orange.jpg': '1616486029423-aaa930d3d2ca', // Orange drink
    'cold-drink-citrus-spark.jpg': '1513558161293-cdaf765ed2fd', // Citrus drink
    'cold-drink-mango-fizz.jpg': '1546173159290-96b6e437763b', // Mango drink
    'juice-apple.jpg': '1560078214377-529329971846', // Apple juice
    'cold-drink-berry-citrus.jpg': '1497534547324-0ebb3f052e88', // Berry drink
    
    // Pastry
    'pastry-eclair-chocolate.jpg': '1612203985729-1c688d26c59b', // Eclair
    'sweet-strawberry-tart.jpg': '1565958014854-7b5d7a823b2c', // Strawberry tart
    'sweet-lemon-meringue.jpg': '1519915028385-c95e13d51b3d', // Lemon tart
    'sweet-velvet-cake.jpg': '1616541823729-00fe0aacd32c' // Red velvet
};

const downloadImage = (filename, photoId) => {
    const url = `https://images.unsplash.com/photo-${photoId}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;
    const dest = path.join(assetsDir, filename);

    if (fs.existsSync(dest)) {
        console.log(`Skipping ${filename} (already exists)`);
        return;
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
            });
        } else {
            console.error(`Failed to download ${filename}: Status ${response.statusCode}`);
            fs.unlink(dest, () => {});
        }
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

console.log('Starting download of final unique images...');
Object.entries(imagesToDownload).forEach(([filename, photoId]) => {
    downloadImage(filename, photoId);
});
