const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = Number(process.env.PORT || 8000);
const root = path.resolve(__dirname, '..');
const dbFile = path.join(__dirname, 'live-orders-db.json');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4'
};

const INITIAL_DEMO_ORDERS = [
  {
    id: 'ORD-001',
    table: '12',
    customerName: 'Yassine',
    guestName: 'Yassine',
    notes: 'No nuts. Allergic.',
    items: [
      { name: 'Velvet Flat White', qty: 2, price: 20, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg' },
      { name: 'Butter Croissant', qty: 1, price: 18, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-butter-croissant.jpg' }
    ],
    total: 58,
    status: 'Received',
    time: Date.now() - 1000 * 60 * 2
  },
  {
    id: 'ORD-002',
    table: '5',
    customerName: 'Amal',
    guestName: 'Amal',
    notes: 'Less salt. Serve hot.',
    items: [
      { name: 'Avocado Toast', qty: 1, price: 45, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-avocado.jpg' },
      { name: 'Fresh Orange Juice', qty: 1, price: 30, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg' }
    ],
    total: 75,
    status: 'Preparing',
    time: Date.now() - 1000 * 60 * 12
  },
  {
    id: 'ORD-003',
    table: '3',
    customerName: 'Karim',
    guestName: 'Karim',
    notes: 'Oat milk, extra hot.',
    items: [
      { name: 'Single Origin Espresso', qty: 3, price: 18, mods: ['Extra Shot', 'Oat Milk'], image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg' }
    ],
    total: 78,
    status: 'Ready',
    time: Date.now() - 1000 * 60 * 25
  }
];

function getLanIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

function loadStore() {
  try {
    if (fs.existsSync(dbFile)) {
      const parsed = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
      if (parsed && Array.isArray(parsed.liveOrders) && Array.isArray(parsed.completedOrders)) {
        if (!Array.isArray(parsed.reservations)) parsed.reservations = [];
        if (!Array.isArray(parsed.tableAlerts)) parsed.tableAlerts = [];
        if (!parsed.settings || typeof parsed.settings !== 'object') {
          parsed.settings = { activeTheme: 'gourmet', restaurantName: 'Stitch Café & Roastery' };
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not load live-orders-db.json, initializing fresh store:', e.message);
  }
  const initial = {
    liveOrders: INITIAL_DEMO_ORDERS,
    completedOrders: [],
    reservations: [],
    tableAlerts: [],
    settings: { activeTheme: 'gourmet', restaurantName: 'Stitch Café & Roastery' },
    updatedAt: Date.now()
  };
  saveStore(initial);
  return initial;
}

function saveStore(store) {
  try {
    store.updatedAt = Date.now();
    fs.writeFileSync(dbFile, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {
    console.warn('Could not write live-orders-db.json:', e.message);
  }
}

let store = loadStore();

function normalizeOrderImageForDashboard(img) {
  if (!img || typeof img !== 'string') return 'assets/product-placeholder.svg';
  let clean = img.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }
  if (clean.startsWith('../stitch_caf_menu_table_12/')) {
    return clean;
  }
  if (clean.startsWith('../swiggy-style_elite_main_menu_390x2500/')) {
    return clean.replace('../swiggy-style_elite_main_menu_390x2500/', '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/');
  }
  if (clean.startsWith('../images/')) {
    return '../stitch_caf_menu_table_12/' + clean.slice(3);
  }
  if (clean.startsWith('../assets/')) {
    return '../stitch_caf_menu_table_12/' + clean.slice(3);
  }
  if (clean.startsWith('assets/')) {
    return '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/' + clean;
  }
  return clean;
}

function normalizeIncomingOrder(body = {}) {
  const rawItems = Array.isArray(body.items) ? body.items : (Array.isArray(body.itemsList) ? body.itemsList : []);
  const normalizedItems = rawItems
    .map(item => {
      if (!item) return null;
      const qty = Math.max(1, parseInt(item.qty ?? item.quantity ?? 1, 10) || 1);
      const price = Math.max(0, parseFloat(item.price ?? item.unit_price ?? 0) || 0);
      const mods = [];
      if (Array.isArray(item.mods)) {
        mods.push(...item.mods.filter(Boolean));
      } else if (item.options && typeof item.options === 'object') {
        Object.entries(item.options).forEach(([k, v]) => {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            mods.push(`${k}: ${v}`);
          }
        });
      }
      return {
        name: String(item.name || item.item || 'Article').trim(),
        qty,
        price: Number(price.toFixed(2)),
        mods,
        notes: item.notes ? String(item.notes).trim() : '',
        category: item.category ? String(item.category) : '',
        image_url: normalizeOrderImageForDashboard(item.image_url || item.image || '')
      };
    })
    .filter(Boolean);

  if (normalizedItems.length === 0) {
    return null;
  }

  const computedSubtotal = normalizedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  let parsedTotal = typeof body.total === 'number'
    ? body.total
    : parseFloat(String(body.total || '').replace(/[^\d.-]/g, ''));
  if (!Number.isFinite(parsedTotal) || parsedTotal <= 0) {
    parsedTotal = computedSubtotal;
  }

  const orderId = body.id && typeof body.id === 'string' && body.id.trim()
    ? body.id.trim()
    : 'ORD-' + Math.floor(100 + Math.random() * 900) + '-' + String(Date.now()).slice(-3);

  const customerName = String(body.customerName || body.guestName || body.customer || '').trim();
  const orderType = ['dine_in', 'takeaway', 'delivery'].includes(body.orderType) ? body.orderType : 'dine_in';
  const defaultTableLabel = orderType === 'delivery' ? 'Livraison' : (orderType === 'takeaway' ? 'À Emporter' : 'Walk-in');
  const table = String(body.table || defaultTableLabel).replace(/^Table\s+/i, '').trim() || defaultTableLabel;
  const notes = String(body.notes || '').trim();
  const deliveryPhone = String(body.deliveryPhone || body.phone || '').trim();
  const deliveryAddress = String(body.deliveryAddress || body.address || '').trim();
  const deliveryGps = String(body.deliveryGps || '').trim();
  const paymentMethod = String(body.paymentMethod || 'cash').trim();
  const status = ['Received', 'Preparing', 'Ready', 'Completed'].includes(body.status) ? body.status : 'Received';

  return {
    id: orderId,
    table,
    orderType,
    customerName: customerName || undefined,
    guestName: customerName || undefined,
    deliveryPhone: deliveryPhone || undefined,
    deliveryAddress: deliveryAddress || undefined,
    deliveryGps: deliveryGps || undefined,
    paymentMethod,
    notes,
    items: normalizedItems,
    total: Number(parsedTotal.toFixed(2)),
    status,
    source: body.source || 'qr_menu',
    time: Number.isFinite(Number(body.time)) ? Number(body.time) : Date.now()
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1e6) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      return res.end();
    }

    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    // --- REAL-TIME API ENDPOINTS ---
    if (pathname === '/api/network-info' && req.method === 'GET') {
      const lanIp = getLanIp();
      const baseUrl = `http://${lanIp}:${PORT}`;
      return sendJson(res, 200, {
        success: true,
        data: {
          lanIp,
          port: PORT,
          baseUrl,
          menuUrl: `${baseUrl}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html`,
          externalPortalUrl: `${baseUrl}/stitch_caf_menu_table_12/welcome_portal/index.html`,
          reservationUrl: `${baseUrl}/stitch_caf_menu_table_12/reservation_view/index.html`,
          dashboardUrl: `${baseUrl}/isolated_merchant_dashboard/index.html`
        }
      });
    }

    if (pathname === '/api/live-orders' && req.method === 'GET') {
      return sendJson(res, 200, {
        success: true,
        data: {
          liveOrders: store.liveOrders,
          completedOrders: store.completedOrders,
          reservations: store.reservations || [],
          tableAlerts: store.tableAlerts || [],
          settings: store.settings || { activeTheme: 'gourmet', restaurantName: 'Stitch Café & Roastery' },
          updatedAt: store.updatedAt
        }
      });
    }

    if (pathname === '/api/settings' && req.method === 'GET') {
      if (!store.settings) store.settings = { activeTheme: 'gourmet', restaurantName: 'Stitch Café & Roastery' };
      return sendJson(res, 200, { success: true, data: store.settings });
    }

    if (pathname === '/api/settings' && (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT')) {
      const body = await readJsonBody(req);
      if (!store.settings) store.settings = { activeTheme: 'gourmet', restaurantName: 'Stitch Café & Roastery' };
      if (body.activeTheme && ['classic', 'gourmet', 'swiggy-bold'].includes(body.activeTheme)) {
        store.settings.activeTheme = body.activeTheme;
      }
      if (body.restaurantName) {
        store.settings.restaurantName = String(body.restaurantName).trim();
      }
      saveStore(store);
      console.log(`🎨 [THEME UPDATED] Active theme is now: ${store.settings.activeTheme}`);
      return sendJson(res, 200, { success: true, data: store.settings });
    }

    if (pathname === '/api/reservations' && req.method === 'GET') {
      return sendJson(res, 200, {
        success: true,
        data: store.reservations || []
      });
    }

    if (pathname === '/api/reservations' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const clientName = String(body.clientName || body.name || '').trim();
      const date = String(body.date || '').trim();
      const time = String(body.time || '').trim();
      if (!clientName || !date || !time) {
        return sendJson(res, 400, { success: false, error: { message: 'Missing reservation fields' } });
      }
      const resItem = {
        id: body.id || ('RES-' + Math.floor(100 + Math.random() * 900) + '-' + String(Date.now()).slice(-3)),
        clientName,
        phone: String(body.phone || '').trim(),
        date,
        time,
        guests: Math.max(1, parseInt(body.guests || 2, 10) || 2),
        zone: String(body.zone || 'Salle Principale').trim(),
        tableId: String(body.tableId || 'À assigner').trim(),
        notes: String(body.notes || '').trim(),
        status: ['Pending', 'Confirmed', 'Cancelled'].includes(body.status) ? body.status : 'Pending',
        createdAt: Date.now()
      };
      if (!Array.isArray(store.reservations)) store.reservations = [];
      store.reservations.unshift(resItem);
      saveStore(store);
      console.log(`📅 [NEW RESERVATION] #${resItem.id} | ${resItem.clientName} (${resItem.guests}p) | ${resItem.date} ${resItem.time}`);
      return sendJson(res, 201, { success: true, data: resItem });
    }

    const resMatch = pathname.match(/^\/api\/reservations\/([^/]+)$/);
    if (resMatch) {
      const resId = decodeURIComponent(resMatch[1]);
      if (!Array.isArray(store.reservations)) store.reservations = [];
      if (req.method === 'DELETE') {
        store.reservations = store.reservations.filter(r => r.id !== resId);
        saveStore(store);
        return sendJson(res, 200, { success: true });
      }
      if (req.method === 'PATCH' || req.method === 'PUT') {
        const body = await readJsonBody(req);
        const found = store.reservations.find(r => r.id === resId);
        if (!found) return sendJson(res, 404, { success: false, error: { message: 'Reservation not found' } });
        if (body.status) found.status = body.status;
        if (body.tableId) found.tableId = body.tableId;
        saveStore(store);
        return sendJson(res, 200, { success: true, data: found });
      }
    }

    if (pathname === '/api/table-alerts' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const alertItem = {
        id: 'ALT-' + Date.now(),
        table: String(body.table || '12').trim(),
        type: String(body.type || 'waiter').trim(),
        label: String(body.label || 'Appel Serveur').trim(),
        time: Date.now()
      };
      if (!Array.isArray(store.tableAlerts)) store.tableAlerts = [];
      store.tableAlerts.unshift(alertItem);
      store.tableAlerts = store.tableAlerts.slice(0, 20);
      saveStore(store);
      console.log(`🔔 [TABLE ALERT] Table ${alertItem.table} -> ${alertItem.label}`);
      return sendJson(res, 201, { success: true, data: alertItem });
    }

    const alertMatch = pathname.match(/^\/api\/table-alerts\/([^/]+)$/);
    if (alertMatch && req.method === 'DELETE') {
      const alertId = decodeURIComponent(alertMatch[1]);
      if (Array.isArray(store.tableAlerts)) {
        store.tableAlerts = store.tableAlerts.filter(a => a.id !== alertId);
        saveStore(store);
      }
      return sendJson(res, 200, { success: true });
    }

    if (pathname === '/api/live-orders' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const order = normalizeIncomingOrder(body);
      if (!order) {
        return sendJson(res, 400, { success: false, error: { message: 'Invalid order items' } });
      }
      // Avoid duplicate IDs
      store.liveOrders = store.liveOrders.filter(o => o.id !== order.id);
      store.liveOrders.push(order);
      saveStore(store);
      console.log(`🔔 [NEW ORDER] #${order.id} | Table ${order.table} | ${order.total.toFixed(2)} DH (${order.items.length} items)`);
      return sendJson(res, 201, { success: true, data: order });
    }

    if (pathname === '/api/live-orders/reset' && req.method === 'POST') {
      store.liveOrders = [];
      store.completedOrders = [];
      saveStore(store);
      return sendJson(res, 200, { success: true, data: { liveOrders: [], completedOrders: [] } });
    }

    const orderMatch = pathname.match(/^\/api\/live-orders\/([^/]+)$/);
    if (orderMatch) {
      const orderId = decodeURIComponent(orderMatch[1]);

      if (req.method === 'GET') {
        const found = store.liveOrders.find(o => o.id === orderId) || store.completedOrders.find(o => o.id === orderId);
        if (!found) {
          return sendJson(res, 404, { success: false, error: { message: 'Order not found' } });
        }
        return sendJson(res, 200, { success: true, data: found });
      }

      if (req.method === 'PATCH' || req.method === 'PUT' || req.method === 'POST') {
        const body = await readJsonBody(req);
        const newStatus = body.status;
        if (!['Received', 'Preparing', 'Ready', 'Completed'].includes(newStatus)) {
          return sendJson(res, 400, { success: false, error: { message: 'Invalid status' } });
        }

        const idx = store.liveOrders.findIndex(o => o.id === orderId);
        if (idx === -1) {
          const completedOrder = store.completedOrders.find(o => o.id === orderId);
          if (completedOrder) {
            return sendJson(res, 200, { success: true, data: completedOrder });
          }
          return sendJson(res, 404, { success: false, error: { message: 'Order not found' } });
        }

        const order = store.liveOrders[idx];
        order.status = newStatus;

        if (newStatus === 'Completed') {
          const completedCopy = { ...order, completedAt: Date.now() };
          store.completedOrders.push(completedCopy);
          store.liveOrders.splice(idx, 1);
          saveStore(store);
          console.log(`✅ [ORDER COMPLETED] #${order.id} | Table ${order.table}`);
          return sendJson(res, 200, { success: true, data: completedCopy });
        } else {
          saveStore(store);
          console.log(`🔄 [ORDER STATUS] #${order.id} (Table ${order.table}) -> ${newStatus}`);
          return sendJson(res, 200, { success: true, data: order });
        }
      }
    }

    // --- STATIC FILE SERVING ---
    if (pathname === '/') pathname = '/isolated_merchant_dashboard/index.html';
    if (pathname.startsWith('/swiggy-style_elite_main_menu_390x2500/')) {
      pathname = '/stitch_caf_menu_table_12' + pathname;
    }

    let file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, file);
    if (
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      relative.split(path.sep).some(p => p.startsWith('.') || p === 'node_modules' || p === '_archive') ||
      !/\.(html|js|css|json|png|jpe?g|svg|webp|avif|gif|ico|woff2?|ttf|mp4)$/i.test(file)
    ) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    const stat = await fs.promises.stat(file);
    const contentType = mime[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;

    if (range && /\.mp4$/i.test(file)) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunkSize = (end - start) + 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff'
      });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }

    const data = await fs.promises.readFile(file);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
    });
    res.end(data);
  } catch (e) {
    res.writeHead(e.code === 'ENOENT' ? 404 : 400);
    res.end('Unavailable');
  }
}).listen(PORT, '0.0.0.0', () => {
  const lanIp = getLanIp();
  console.log('==========================================================');
  console.log('🚀 STITCH SAAS — SERVEUR TEMPS RÉEL ACTIF (PC + WIFI)');
  console.log(`📊 Merchant Dashboard (PC)   : http://127.0.0.1:${PORT}/isolated_merchant_dashboard/index.html`);
  console.log(`📱 Menu Client QR (PC)       : http://127.0.0.1:${PORT}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?table=12`);
  console.log(`🌐 Accès Téléphone Wi-Fi     : http://${lanIp}:${PORT}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?table=12`);
  console.log('==========================================================');
});
