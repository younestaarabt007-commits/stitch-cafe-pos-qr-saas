const fs = require('fs');
const https = require('https');

const url = 'https://source.unsplash.com/featured/?burrito';
const file = fs.createWriteStream('test_burrito.jpg');

https.get(url, (response) => {
    console.log('Status:', response.statusCode);
    console.log('Location:', response.headers.location);
    if (response.statusCode === 302 || response.statusCode === 301) {
        console.log('Redirecting to:', response.headers.location);
    }
});
