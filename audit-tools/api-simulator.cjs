// Isolated audit run: do not load a remote database or expose the API to the LAN.
process.env.DATABASE_URL = '';
process.env.JWT_SECRET = require('crypto').randomBytes(48).toString('hex');
process.env.PORT = '3000';
process.env.CORS_ORIGIN = 'http://127.0.0.1:8000,http://localhost:8000';
const net = require('net');
const listen = net.Server.prototype.listen;
net.Server.prototype.listen = function(port) { return listen.call(this, Number(port), '127.0.0.1'); };
process.chdir(require('path').resolve(__dirname, '../api'));
require('../api/server.js');
