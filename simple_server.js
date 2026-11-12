const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

http.createServer(function (request, response) {
    // Decode the URL to handle spaces (%20) and special characters
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(request.url);
    } catch (e) {
        decodedUrl = request.url;
    }
    
    let filePath = '.' + decodedUrl;
    
    // Remove query parameters if any
    filePath = filePath.split('?')[0];

    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                // Try adding index.html if it's a directory
                // We need to check if the path exists as a directory first
                // But fs.lstatSync might throw if path doesn't exist
                let isDirectory = false;
                try {
                    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
                        isDirectory = true;
                    }
                } catch(e) {}

                if (isDirectory) {
                     const indexFilePath = path.join(filePath, 'index.html');
                     fs.readFile(indexFilePath, function(err, indexContent) {
                        if (err) {
                             response.writeHead(404);
                             response.end('404 Not Found: ' + filePath + ' (and index.html missing)');
                        } else {
                             response.writeHead(200, { 'Content-Type': 'text/html' });
                             response.end(indexContent, 'utf-8');
                        }
                     });
                     return;
                }

                response.writeHead(404);
                response.end('404 Not Found: ' + filePath);
                console.log('404 Not Found: ' + filePath);
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
