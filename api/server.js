const express = require('express');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Allow self-signed certs (Supabase Pooler)
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();
const app = express();
const corsOrigin = process.env.CORS_ORIGIN || '*';
if (corsOrigin === '*') {
  app.use(cors());
} else {
  const origins = corsOrigin.split(',').map(s => s.trim()).filter(Boolean);
  app.use(cors({ origin: origins, credentials: true }));
}
app.use(express.json());
app.use(express.static('../stitch_caf_menu_table_12')); // Serve frontend
const SECRET = process.env.JWT_SECRET || 'dev_secret';
const DATABASE_URL = process.env.DATABASE_URL || '';
let pool = null;
let DB_READY = false;

// --- IN-MEMORY FALLBACK DATA (For Simulation Mode) ---
const MEMORY_DB = {
  tenants: [
    { id: '00000000-0000-0000-0000-000000000000', name: 'Platform Admin', slug: 'platform', is_active: true },
    { id: '00000000-0000-0000-0000-000000000001', name: 'Elite Merchant Cafe', slug: 'tenant_demo', is_active: true }
  ],
  users: [
    { id: '11111111-1111-1111-1111-111111111111', identifier: 'admin@stitch.cafe', name: 'Super Admin', password_hash: '', role: 'SUPER_ADMIN', tenant_id: '00000000-0000-0000-0000-000000000000', is_active: true },
    { id: '22222222-2222-2222-2222-222222222222', identifier: 'merchant@cafe.com', name: 'Elite Merchant', password_hash: '', role: 'MANAGER', tenant_id: '00000000-0000-0000-0000-000000000001', is_active: true },
    { id: '33333333-3333-3333-3333-333333333333', identifier: 'staff@cafe.com', name: 'Staff User', password_hash: '', role: 'STAFF', tenant_id: '00000000-0000-0000-0000-000000000001', is_active: true }
  ],
  menu_items: [
    { id: 'm1', tenant_id: '00000000-0000-0000-0000-000000000001', name: 'Elite Espresso', price: 3.50, category: 'Coffee', is_available: true, image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=500&auto=format&fit=crop' },
    { id: 'm2', tenant_id: '00000000-0000-0000-0000-000000000001', name: 'Artisanal Croissant', price: 4.20, category: 'Bakery', is_available: true, image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500&auto=format&fit=crop' },
    { id: 'm3', tenant_id: '00000000-0000-0000-0000-000000000001', name: 'Signature Avocado Toast', price: 12.50, category: 'Brunch', is_available: true, image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500&auto=format&fit=crop' },
    { id: 'm4', tenant_id: '00000000-0000-0000-0000-000000000001', name: 'Blueberry Muffin', price: 3.80, category: 'Bakery', is_available: true, image_url: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=500&auto=format&fit=crop' },
    { id: 'm5', tenant_id: '00000000-0000-0000-0000-000000000001', name: 'Flat White', price: 4.50, category: 'Coffee', is_available: true, image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop' },
    { id: 'm6', tenant_id: '00000000-0000-0000-0000-000000000001', name: 'Iced Latte', price: 5.00, category: 'Coffee', is_available: true, image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500&auto=format&fit=crop' }
  ],
  orders: [],
  order_items: []
};

async function initDb() {
  if (!DATABASE_URL) {
    console.log('⚠️ DATABASE_URL not found. Running in SIMULATOR MODE (Data will be lost on restart).');
    DB_READY = true; // We use memory fallback
    return;
  }
  const isLocal = DATABASE_URL.includes('localhost') || DATABASE_URL.includes('127.0.0.1');
  const rejectUnauthorized = (process.env.DB_SSL_REJECT_UNAUTHORIZED || 'false') === 'true';
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized }
  });
  try {
    await pool.query('SELECT 1');
    DB_READY = true;
    console.log('✅ Connected to PostgreSQL');
  } catch (e) {
    console.log('❌ DB Connection failed. Falling back to SIMULATOR MODE.', e.message);
    pool = null;
    DB_READY = true; 
  }
}
async function initSchema() {
  if (!DB_READY || !pool) return;
  const sql = `
  CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
  );
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    identifier VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ
  );
  CREATE TABLE IF NOT EXISTS cash_sessions (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    staff_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status VARCHAR(10) NOT NULL,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMPTZ,
    opening_balance NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    closing_balance NUMERIC(12,2),
    difference NUMERIC(12,2)
  );
  CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    order_number VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    paid_at TIMESTAMPTZ
  );
  CREATE UNIQUE INDEX IF NOT EXISTS unique_order_number_per_tenant ON orders(tenant_id, order_number);
  CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    cash_session_id UUID REFERENCES cash_sessions(id) ON DELETE RESTRICT,
    amount NUMERIC(12,2) NOT NULL,
    payment_type VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS cash_movements (
    id UUID PRIMARY KEY,
    cash_session_id UUID NOT NULL REFERENCES cash_sessions(id) ON DELETE RESTRICT,
    movement_type VARCHAR(20) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(12,2) NOT NULL,
    category VARCHAR(100),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    image_url TEXT
  );
  CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(12,2) NOT NULL,
    total_price NUMERIC(12,2) NOT NULL
  );`;
  await pool.query(sql);
}
async function seedDemo() {
  if (!DB_READY || !pool) return;
  const tenantSlug = 'tenant_demo';
  const platformSlug = 'platform';
  const t1 = crypto.randomUUID();
  const t2 = crypto.randomUUID();
  await pool.query(
    'INSERT INTO tenants (id, slug, is_active) VALUES ($1,$2,TRUE) ON CONFLICT (slug) DO NOTHING',
    [t1, tenantSlug]
  );
  await pool.query(
    'INSERT INTO tenants (id, slug, is_active) VALUES ($1,$2,TRUE) ON CONFLICT (slug) DO NOTHING',
    [t2, platformSlug]
  );
  const passwordHash = await bcrypt.hash('password123', 10);
  const tenants = await pool.query('SELECT id, slug FROM tenants WHERE slug IN ($1,$2)', [tenantSlug, platformSlug]);
  const demoTenant = tenants.rows.find(r => r.slug === tenantSlug);
  const platformTenant = tenants.rows.find(r => r.slug === platformSlug);
  const users = [
    { identifier: 'admin@stitch.cafe', name: 'Super Admin', role: 'SUPER_ADMIN', tenant_id: platformTenant ? platformTenant.id : t2 },
    { identifier: 'merchant@cafe.com', name: 'Elite Merchant', role: 'MANAGER', tenant_id: demoTenant ? demoTenant.id : t1 },
    { identifier: 'staff@cafe.com', name: 'Staff', role: 'STAFF', tenant_id: demoTenant ? demoTenant.id : t1 }
  ];
  for (const u of users) {
    await pool.query(
      'INSERT INTO users (id, identifier, name, password_hash, role, tenant_id, is_active) VALUES ($1,$2,$3,$4,$5,$6,TRUE) ON CONFLICT (identifier) DO NOTHING',
      [crypto.randomUUID(), u.identifier.toLowerCase(), u.name, passwordHash, u.role, u.tenant_id]
    );
  }
  const menuItems = [
    { name: 'Signature Avocado Toast', price: 12.50, category: 'Brunch' },
    { name: 'Elite Espresso', price: 3.50, category: 'Coffee' },
    { name: 'Artisanal Sourdough', price: 8.00, category: 'Bakery' }
  ];
  if (demoTenant) {
    for (const item of menuItems) {
      await pool.query(
        'INSERT INTO menu_items (id, tenant_id, name, price, category) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING',
        [crypto.randomUUID(), demoTenant.id, item.name, item.price, item.category]
      );
    }
  }
}
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No token' } });
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid token' } });
  }
}
function requireRoles(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Forbidden' } });
    }
    next();
  };
}
const USERS_FALLBACK = [
  { identifier: 'admin@stitch.cafe', password: 'password123', role: 'SUPER_ADMIN', name: 'Super Admin', tenant: 'platform' },
  { identifier: 'merchant@cafe.com', password: 'password123', role: 'MANAGER', name: 'Elite Merchant', tenant: 'tenant_demo' },
  { identifier: 'staff@cafe.com', password: 'password123', role: 'STAFF', name: 'Staff', tenant: 'tenant_demo' }
];
app.post('/api/v1/auth/login', async (req, res) => {
  const { email, name, password } = req.body;
  const identifier = ((email || name || '') + '').toLowerCase();
  
  // Try real DB first if pool exists
  if (DB_READY && pool) {
    try {
      const r = await pool.query('SELECT u.*, t.slug as tenant_slug FROM users u JOIN tenants t ON u.tenant_id = t.id WHERE LOWER(u.identifier)=LOWER($1) AND u.is_active=TRUE', [identifier]);
      const user = r.rows[0];
      if (user && (await bcrypt.compare(password, user.password_hash))) {
        await pool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);
        const token = jwt.sign({ sub: user.id, role: user.role, tenant_id: user.tenant_id }, SECRET, { expiresIn: '1h' });
        return res.json({ success: true, data: { access_token: token, token_type: 'Bearer', expires_in: 3600, user: { id: user.id, name: user.name, role: user.role, tenant_id: user.tenant_id, tenant_slug: user.tenant_slug } } });
      }
    } catch (e) {
      console.error('Login error:', e);
    }
  }

  // Fallback to MEMORY_DB for simulation
  const memUser = MEMORY_DB.users.find(u => u.identifier.toLowerCase() === identifier);
  if (memUser) {
    const tenant = MEMORY_DB.tenants.find(t => t.id === memUser.tenant_id);
    const token = jwt.sign({ sub: memUser.id, role: memUser.role, tenant_id: memUser.tenant_id }, SECRET, { expiresIn: '1h' });
    return res.json({ 
      success: true, 
      data: {
        access_token: token,
        token_type: 'Bearer',
        expires_in: 3600,
        user: { id: memUser.id, name: memUser.name, role: memUser.role, tenant_id: memUser.tenant_id, tenant_slug: tenant ? tenant.slug : null },
        simulator: true
      }
    });
  }

  res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
});
app.post('/api/v1/auth/logout', (req, res) => {
  res.json({ success: true, data: { message: 'Logged out' } });
});
app.get('/api/v1/me', authMiddleware, async (req, res) => {
  if (DB_READY) {
    try {
      const r = await pool.query('SELECT id, name, role, tenant_id FROM users WHERE id = $1', [req.user.sub]);
      if (!r.rows.length) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
      return res.json({ success: true, data: r.rows[0] });
    } catch (e) {
      return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Server error' } });
    }
  } else {
    return res.json({ success: true, data: req.user });
  }
});
app.post('/api/v1/cash-session/open', authMiddleware, requireRoles(['MANAGER']), async (req, res) => {
  if (!DB_READY) return res.status(500).json({ success: false, error: { code: 'DB_NOT_CONFIGURED', message: 'Database not configured' } });
  const opening_balance = Number(req.body.opening_balance || 0);
  try {
    const r = await pool.query('SELECT id FROM cash_sessions WHERE tenant_id = $1 AND status = $2', [req.user.tenant_id, 'OPEN']);
    if (r.rows.length) return res.status(400).json({ success: false, error: { code: 'SESSION_ALREADY_OPEN', message: 'There is already an open cash session' } });
    const id = crypto.randomUUID();
    await pool.query('INSERT INTO cash_sessions (id, tenant_id, staff_id, status, opening_balance) VALUES ($1,$2,$3,$4,$5)', [id, req.user.tenant_id, req.user.sub, 'OPEN', opening_balance]);
    return res.status(201).json({ success: true, data: { id, status: 'OPEN' } });
  } catch (e) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Server error' } });
  }
});
app.get('/api/v1/cash-session/current', authMiddleware, requireRoles(['MANAGER', 'STAFF']), async (req, res) => {
  if (!DB_READY) return res.status(500).json({ success: false, error: { code: 'DB_NOT_CONFIGURED', message: 'Database not configured' } });
  try {
    const r = await pool.query('SELECT id, status, opened_at, opening_balance, closing_balance, difference FROM cash_sessions WHERE tenant_id = $1 AND status = $2', [req.user.tenant_id, 'OPEN']);
    if (!r.rows.length) return res.status(404).json({ success: false, error: { code: 'NO_ACTIVE_CASH_SESSION', message: 'No open cash session' } });
    return res.json({ success: true, data: r.rows[0] });
  } catch (e) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Server error' } });
  }
});
app.post('/api/v1/cash-session/close', authMiddleware, requireRoles(['MANAGER']), async (req, res) => {
  if (!DB_READY) return res.status(500).json({ success: false, error: { code: 'DB_NOT_CONFIGURED', message: 'Database not configured' } });
  const closing_balance = Number(req.body.closing_balance || 0);
  try {
    const r = await pool.query('SELECT id, opening_balance FROM cash_sessions WHERE tenant_id = $1 AND status = $2', [req.user.tenant_id, 'OPEN']);
    if (!r.rows.length) return res.status(404).json({ success: false, error: { code: 'NO_ACTIVE_CASH_SESSION', message: 'No open cash session' } });
    const id = r.rows[0].id;
    const opening_balance = Number(r.rows[0].opening_balance || 0);
    const movements = await pool.query('SELECT COALESCE(SUM(CASE WHEN movement_type = $1 THEN amount ELSE 0 END),0) AS in_sum, COALESCE(SUM(CASE WHEN movement_type = $2 THEN amount ELSE 0 END),0) AS out_sum FROM cash_movements WHERE cash_session_id = $3', ['CASH_IN', 'CASH_OUT', id]);
    const inSum = Number(movements.rows[0].in_sum || 0);
    const outSum = Number(movements.rows[0].out_sum || 0);
    const expected = opening_balance + inSum - outSum;
    const difference = closing_balance - expected;
    await pool.query('UPDATE cash_sessions SET status=$1, closed_at=NOW(), closing_balance=$2, difference=$3 WHERE id=$4', ['CLOSED', closing_balance, difference, id]);
    return res.json({ success: true, data: { id, status: 'CLOSED', difference } });
  } catch (e) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Server error' } });
  }
});
app.post('/api/v1/orders/:id/pay', authMiddleware, requireRoles(['MANAGER']), async (req, res) => {
  if (!DB_READY) return res.status(500).json({ success: false, error: { code: 'DB_NOT_CONFIGURED', message: 'Database not configured' } });
  const orderId = req.params.id;
  const amount = Number(req.body.amount || 0);
  const payment_type = String(req.body.payment_type || 'CASH');
  try {
    const session = await pool.query('SELECT id FROM cash_sessions WHERE tenant_id = $1 AND status = $2', [req.user.tenant_id, 'OPEN']);
    if (!session.rows.length) return res.status(400).json({ success: false, error: { code: 'NO_ACTIVE_CASH_SESSION', message: 'No open cash session' } });
    const sId = session.rows[0].id;
    const orderRes = await pool.query('SELECT id, status, total_amount FROM orders WHERE id = $1 AND tenant_id = $2', [orderId, req.user.tenant_id]);
    if (!orderRes.rows.length) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Order not found' } });
    const ord = orderRes.rows[0];
    if (ord.status === 'PAID' || ord.status === 'VOIDED') return res.status(400).json({ success: false, error: { code: 'INVALID_STATE', message: 'Order cannot be modified' } });
    await pool.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
    const payId = crypto.randomUUID();
    await pool.query('UPDATE orders SET status=$1, paid_at=NOW() WHERE id=$2', ['PAID', orderId]);
    await pool.query('INSERT INTO payments (id, order_id, cash_session_id, amount, payment_type) VALUES ($1,$2,$3,$4,$5)', [payId, orderId, sId, amount || ord.total_amount, payment_type]);
    const movId = crypto.randomUUID();
    await pool.query('INSERT INTO cash_movements (id, cash_session_id, movement_type, amount) VALUES ($1,$2,$3,$4)', [movId, sId, 'CASH_IN', amount || ord.total_amount]);
    await pool.query('COMMIT');
    return res.json({ success: true, data: { payment_id: payId, order_id: orderId } });
  } catch (e) {
    try { await pool.query('ROLLBACK'); } catch (_) {}
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Server error' } });
  }
});
app.get('/api/v1/menu', async (req, res) => {
  // Allow public access to menu
  if (pool) {
    try {
      const r = await pool.query('SELECT * FROM menu_items WHERE is_available = TRUE');
      return res.json({ success: true, data: r.rows });
    } catch (e) {
      console.error('Menu error:', e);
    }
  }

  // Fallback
  res.json({ success: true, data: MEMORY_DB.menu_items, simulator: true });
});

app.post('/api/v1/menu', authMiddleware, requireRoles(['MANAGER']), async (req, res) => {
  const { name, price, category, image_url } = req.body;
  const tenant_id = req.user.tenant_id;
  const id = crypto.randomUUID();

  if (pool) {
    try {
      await pool.query(
        'INSERT INTO menu_items (id, tenant_id, name, price, category, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, tenant_id, name, price, category, image_url]
      );
      return res.status(201).json({ success: true, data: { id, name, price, category, image_url } });
    } catch (e) {
      console.error('Add menu item error:', e);
      return res.status(500).json({ success: false, error: { message: 'Failed to add item' } });
    }
  }

  // Fallback
  const newItem = { id, tenant_id, name, price: Number(price), category, image_url, is_available: true };
  MEMORY_DB.menu_items.push(newItem);
  res.status(201).json({ success: true, data: newItem, simulator: true });
});

app.delete('/api/v1/menu/:id', authMiddleware, requireRoles(['MANAGER']), async (req, res) => {
  const id = req.params.id;
  const tenant_id = req.user.tenant_id;

  if (pool) {
    try {
      await pool.query('DELETE FROM menu_items WHERE id = $1 AND tenant_id = $2', [id, tenant_id]);
      return res.json({ success: true });
    } catch (e) {
      console.error('Delete menu item error:', e);
      return res.status(500).json({ success: false, error: { message: 'Failed to delete item' } });
    }
  }

  // Fallback
  MEMORY_DB.menu_items = MEMORY_DB.menu_items.filter(i => i.id !== id);
  res.json({ success: true, simulator: true });
});

app.get('/api/v1/orders', authMiddleware, requireRoles(['MANAGER', 'STAFF']), async (req, res) => {
  const tenant_id = req.user.tenant_id;

  if (pool) {
    try {
      const r = await pool.query('SELECT * FROM orders WHERE tenant_id = $1 ORDER BY created_at DESC', [tenant_id]);
      return res.json({ success: true, data: r.rows });
    } catch (e) {
      console.error('Orders error:', e);
    }
  }

  // Fallback
  const orders = MEMORY_DB.orders.filter(o => o.tenant_id === tenant_id);
  res.json({ success: true, data: orders, simulator: true });
});

app.post('/api/v1/orders', authMiddleware, requireRoles(['MANAGER', 'STAFF']), async (req, res) => {
  const tenant_id = req.user.tenant_id;
  const { items } = req.body;
  const orderId = crypto.randomUUID();
  
  if (pool) {
    try {
      await pool.query('BEGIN');
      let total = 0;
      for (const item of items) {
        const menu_r = await pool.query('SELECT price FROM menu_items WHERE id = $1', [item.menu_item_id]);
        const price = menu_r.rows[0].price;
        const lineTotal = price * item.quantity;
        total += lineTotal;
        await pool.query('INSERT INTO order_items (id, order_id, menu_item_id, quantity, unit_price, total_price) VALUES ($1, $2, $3, $4, $5, $6)',
          [crypto.randomUUID(), orderId, item.menu_item_id, item.quantity, price, lineTotal]);
      }
      await pool.query('INSERT INTO orders (id, tenant_id, total_amount, status) VALUES ($1, $2, $3, $4)', [orderId, tenant_id, total, 'PAID']);
      await pool.query('COMMIT');
      return res.json({ success: true, data: { id: orderId, total } });
    } catch (e) {
      await pool.query('ROLLBACK');
      console.error('Order error:', e);
    }
  }

  // Fallback
  let total = 0;
  items.forEach(item => {
    const mi = MEMORY_DB.menu_items.find(i => i.id === item.menu_item_id);
    if (mi) {
      const lineTotal = mi.price * item.quantity;
      total += lineTotal;
      MEMORY_DB.order_items.push({ id: crypto.randomUUID(), order_id: orderId, menu_item_id: item.menu_item_id, quantity: item.quantity, unit_price: mi.price, total_price: lineTotal });
    }
  });
  MEMORY_DB.orders.push({ id: orderId, tenant_id, total_amount: total, status: 'PAID', created_at: new Date() });
  res.json({ success: true, data: { id: orderId, total }, simulator: true });
});
// Admin Endpoints
app.get('/api/v1/admin/merchants', authMiddleware, requireRoles(['SUPER_ADMIN']), async (req, res) => {
  if (pool) {
    try {
      const r = await pool.query('SELECT id, slug, is_active FROM tenants WHERE id != $1', ['00000000-0000-0000-0000-000000000000']);
      return res.json({ success: true, data: r.rows });
    } catch (e) {
      console.error('Admin merchants error:', e);
    }
  }
  // Fallback
  res.json({ success: true, data: MEMORY_DB.tenants, simulator: true });
});

app.patch('/api/v1/admin/merchants/:id/status', authMiddleware, requireRoles(['SUPER_ADMIN']), async (req, res) => {
  const { is_active } = req.body;
  if (pool) {
    try {
      await pool.query('UPDATE tenants SET is_active = $1 WHERE id = $2', [is_active, req.params.id]);
      return res.json({ success: true });
    } catch (e) {
      console.error('Admin status error:', e);
    }
  }
  // Fallback
  const t = MEMORY_DB.tenants.find(t => t.id === req.params.id);
  if (t) t.is_active = is_active;
  res.json({ success: true, simulator: true });
});

app.delete('/api/v1/admin/merchants/:id', authMiddleware, requireRoles(['SUPER_ADMIN']), async (req, res) => {
  if (pool) {
    try {
      await pool.query('BEGIN');
      await pool.query('DELETE FROM users WHERE tenant_id = $1', [req.params.id]);
      await pool.query('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE tenant_id = $1)', [req.params.id]);
      await pool.query('DELETE FROM orders WHERE tenant_id = $1', [req.params.id]);
      await pool.query('DELETE FROM menu_items WHERE tenant_id = $1', [req.params.id]);
      await pool.query('DELETE FROM tenants WHERE id = $1', [req.params.id]);
      await pool.query('COMMIT');
      return res.json({ success: true });
    } catch (e) {
      await pool.query('ROLLBACK');
      console.error('Admin delete error:', e);
    }
  }
  // Fallback
  MEMORY_DB.tenants = MEMORY_DB.tenants.filter(t => t.id !== req.params.id);
  res.json({ success: true, simulator: true });
});

// --- REAL-TIME QR MENU & KDS LIVE ORDERS ---
MEMORY_DB.liveOrders = [];
MEMORY_DB.completedOrders = [];

app.get('/api/live-orders', (req, res) => {
  res.json({
    success: true,
    data: {
      liveOrders: MEMORY_DB.liveOrders,
      completedOrders: MEMORY_DB.completedOrders,
      updatedAt: Date.now()
    }
  });
});

app.post('/api/live-orders', (req, res) => {
  const body = req.body || {};
  const rawItems = Array.isArray(body.items) ? body.items : (Array.isArray(body.itemsList) ? body.itemsList : []);
  const items = rawItems.map(item => ({
    name: String(item.name || item.item || 'Article').trim(),
    qty: Math.max(1, parseInt(item.qty ?? item.quantity ?? 1, 10) || 1),
    price: Math.max(0, parseFloat(item.price ?? item.unit_price ?? 0) || 0),
    mods: Array.isArray(item.mods) ? item.mods : [],
    notes: item.notes ? String(item.notes) : '',
    image_url: item.image_url || item.image || ''
  }));
  if (!items.length) return res.status(400).json({ success: false, error: { message: 'Invalid order items' } });
  const total = Number(body.total) || items.reduce((s, i) => s + i.price * i.qty, 0);
  const order = {
    id: body.id || ('ORD-' + Math.floor(100 + Math.random() * 900) + '-' + String(Date.now()).slice(-3)),
    table: String(body.table || 'Walk-in').replace(/^Table\s+/i, '').trim() || 'Walk-in',
    customerName: body.customerName || body.guestName || body.customer || undefined,
    guestName: body.customerName || body.guestName || body.customer || undefined,
    notes: body.notes || '',
    items,
    total: Number(total.toFixed(2)),
    status: 'Received',
    time: Date.now()
  };
  MEMORY_DB.liveOrders = MEMORY_DB.liveOrders.filter(o => o.id !== order.id);
  MEMORY_DB.liveOrders.push(order);
  res.status(201).json({ success: true, data: order });
});

app.get('/api/live-orders/:id', (req, res) => {
  const found = MEMORY_DB.liveOrders.find(o => o.id === req.params.id) || MEMORY_DB.completedOrders.find(o => o.id === req.params.id);
  if (!found) return res.status(404).json({ success: false, error: { message: 'Order not found' } });
  res.json({ success: true, data: found });
});

app.patch('/api/live-orders/:id', (req, res) => {
  const newStatus = req.body?.status;
  if (!['Received', 'Preparing', 'Ready', 'Completed'].includes(newStatus)) {
    return res.status(400).json({ success: false, error: { message: 'Invalid status' } });
  }
  const idx = MEMORY_DB.liveOrders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, error: { message: 'Order not found' } });
  const order = MEMORY_DB.liveOrders[idx];
  order.status = newStatus;
  if (newStatus === 'Completed') {
    const completed = { ...order, completedAt: Date.now() };
    MEMORY_DB.completedOrders.push(completed);
    MEMORY_DB.liveOrders.splice(idx, 1);
    return res.json({ success: true, data: completed });
  }
  res.json({ success: true, data: order });
});

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/ready', (req, res) => res.json({ db: DB_READY }));
initDb().then(() => initSchema()).then(() => seedDemo()).finally(() => {
  app.listen(process.env.PORT || 3000, '0.0.0.0');
});
