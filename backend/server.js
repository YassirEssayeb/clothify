require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;
const dbPath = process.env.DB_PATH || path.join(__dirname, 'data.db');

app.use(cors());
app.use(express.json());

let db;

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows.length ? rows[0] : null;
}

function run(sql, params = []) {
  db.run(sql, params);
  saveDb();
}

function insertAndGetId(sql, params = []) {
  db.run(sql, params);
  const stmt = db.prepare('SELECT last_insert_rowid() as id');
  stmt.step();
  const result = stmt.getAsObject();
  stmt.free();
  saveDb();
  return result.id;
}

function runMany(sql) {
  db.exec(sql);
  saveDb();
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

async function initDb() {
  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    category TEXT,
    stock INTEGER DEFAULT 10,
    rating REAL DEFAULT 4.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount REAL NOT NULL,
    payment_method TEXT DEFAULT 'COD',
    payment_status TEXT DEFAULT 'Pending',
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    product_name TEXT,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS order_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    status TEXT NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    address TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    used INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS coupons (
    code TEXT PRIMARY KEY,
    discount_percent INTEGER NOT NULL,
    description TEXT,
    active INTEGER DEFAULT 1
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  const cnt = queryOne('SELECT COUNT(*) as cnt FROM products');
  if (cnt.cnt === 0) {
    runMany(`INSERT INTO products (name, price, image, description, category, stock, rating) VALUES
      ('Premium Tee', 29.00, 'https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Elevate your daily style with this premium quality tee.', 'Tops', 15, 4.5),
      ('Denim Jacket', 89.00, 'https://images.pexels.com/photos/13662420/pexels-photo-13662420.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Classic denim jacket with a modern fit and durable design.', 'Outerwear', 8, 4.2),
      ('Summer Dress', 49.00, 'https://images.pexels.com/photos/19895977/pexels-photo-19895977.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Experience ultimate comfort and style with this premium summer dress.', 'Dresses', 12, 4.7),
      ('Canvas Sneakers', 59.00, 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Modern sneakers designed for comfort and durability.', 'Footwear', 20, 4.3),
      ('Linen Shirt', 39.00, 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Light and breathable linen shirt for any occasion.', 'Tops', 3, 3.8),
      ('Chino Pants', 45.00, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=1260', 'Comfortable chino pants with a modern tapered fit.', 'Pants', 10, 4.0),
      ('Beanie Hat', 19.00, 'https://images.pexels.com/photos/11170599/pexels-photo-11170599.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Keep warm and stylish with this premium beanie hat.', 'Accessories', 25, 4.1),
      ('Leather Belt', 34.00, 'https://images.pexels.com/photos/31367058/pexels-photo-31367058.jpeg?auto=compress&cs=tinysrgb&w=1260', 'High-quality leather belt with a classic finish.', 'Accessories', 18, 3.9),
      ('Urban Hoodie', 54.00, 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Stay cozy and stylish with this oversized urban hoodie.', 'Outerwear', 7, 4.6),
      ('Floral Skirt', 35.00, 'https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260', 'A beautiful floral skirt perfect for spring and summer days.', 'Dresses', 0, 4.0),
      ('Classic Polo', 32.00, 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Timeless polo shirt made from breathable cotton piqu\u00e9.', 'Tops', 14, 4.4),
      ('Leather Boots', 89.00, 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Rugged and stylish leather boots built for any adventure.', 'Footwear', 5, 4.8),
      ('Silk Scarf', 25.00, 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=1260', 'Elegant silk scarf to add a touch of class to your outfit.', 'Accessories', 30, 3.5),
      ('Slim Fit Jeans', 49.00, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1260', 'Durable slim-fit jeans with a comfortable stretch.', 'Pants', 11, 4.2),
      ('Wool Overcoat', 99.00, 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1260', 'Stay warm this winter with our premium wool blend overcoat.', 'Outerwear', 4, 4.6),
      ('Wrist Watch', 59.00, 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Minimalist analog watch with a genuine leather strap.', 'Accessories', 9, 4.3),
      ('Suede Loafers', 69.00, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Elegant suede loafers for a sophisticated look.', 'Footwear', 6, 4.1),
      ('Aviator Sunglasses', 45.00, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1260', 'Classic aviator sunglasses with polarized lenses.', 'Accessories', 22, 4.5),
      ('V-Neck Sweater', 49.00, 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Soft wool-blend V-neck sweater for layering.', 'Tops', 2, 4.0),
      ('Cargo Pants', 55.00, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=1260', 'Durable cargo pants with multiple utility pockets.', 'Pants', 16, 3.7)`);
  }

  const couponCnt = queryOne('SELECT COUNT(*) as cnt FROM coupons');
  if (couponCnt.cnt === 0) {
    runMany(`INSERT INTO coupons (code, discount_percent, description) VALUES
      ('SAVE10', 10, 'Save 10% on your order'),
      ('WELCOME20', 20, 'Welcome discount - 20% off'),
      ('FREESHIP', 0, 'Free shipping on your order')`);
  }

  saveDb();
}

// ─── Routes ───────────────────────────────────────────────────

app.get('/api/categories', (req, res) => {
  const rows = queryAll('SELECT DISTINCT category FROM products ORDER BY category ASC');
  res.json(rows.map(r => r.category));
});

app.get('/api/products', (req, res) => {
  res.json(queryAll('SELECT * FROM products'));
});

app.get('/api/search', (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);
  const term = `%${q}%`;
  res.json(queryAll('SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ?', [term, term, term]));
});

app.get('/api/products/:id', (req, res) => {
  const row = queryOne('SELECT * FROM products WHERE id = ?', [req.params.id]);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(row);
});

app.post('/api/orders', (req, res) => {
  const { name, email, address, cart, total, paymentMethod, paymentStatus } = req.body;
  if (!name || !email || !address || !cart || cart.length === 0) {
    return res.status(400).json({ error: 'Missing required order information' });
  }
  try {
    const orderId = insertAndGetId('INSERT INTO orders (customer_name, customer_email, customer_address, total_amount, payment_method, payment_status, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, address, total, paymentMethod || 'COD', paymentStatus || 'Pending', 'pending']);
    for (const item of cart) {
      run('INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.id, item.name, item.quantity, item.price]);
    }
    run('INSERT INTO order_tracking (order_id, status, note) VALUES (?, ?, ?)',
      [orderId, 'pending', 'Order placed successfully']);
    res.json({ message: 'Order placed successfully!', orderId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process order' });
  }
});

app.get('/api/orders', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const orders = queryAll('SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC', [email]);
  for (const order of orders) {
    order.items = queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    order.tracking = queryAll('SELECT * FROM order_tracking WHERE order_id = ? ORDER BY created_at ASC', [order.id]);
  }
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = queryOne('SELECT * FROM orders WHERE id = ?', [req.params.id]);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.items = queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
  order.tracking = queryAll('SELECT * FROM order_tracking WHERE order_id = ? ORDER BY created_at ASC', [order.id]);
  res.json(order);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const order = queryOne('SELECT * FROM orders WHERE id = ?', [req.params.id]);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
  run('INSERT INTO order_tracking (order_id, status, note) VALUES (?, ?, ?)',
    [req.params.id, status, `Status updated to ${status.replace(/_/g, ' ')}`]);
  res.json({ message: 'Order status updated' });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  try {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
    res.status(201).json({ message: 'Registration successful!', user: { name, email } });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  const user = queryOne('SELECT id, name, email, address, phone FROM users WHERE email = ? AND password = ?', [email, hash]);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  res.json({ message: 'Login successful!', user, token });
});

app.post('/api/password-reset', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const user = queryOne('SELECT id FROM users WHERE email = ?', [email]);
  if (!user) return res.status(404).json({ error: 'Email not found' });
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000).toISOString();
  run('INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)', [email, token, expires]);
  res.json({ message: 'Password reset email sent! Check your inbox.', token });
});

app.get('/api/reviews/:productId', (req, res) => {
  const reviews = queryAll('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC', [req.params.productId]);
  const stats = queryOne('SELECT AVG(rating) as average, COUNT(*) as count FROM reviews WHERE product_id = ?', [req.params.productId]);
  res.json({ reviews, average: stats ? stats.average || 0 : 0, count: stats ? stats.count || 0 : 0 });
});

app.post('/api/reviews', (req, res) => {
  const { productId, userName, rating, comment } = req.body;
  if (!productId || !userName || !rating) {
    return res.status(400).json({ error: 'productId, userName, and rating are required' });
  }
  run('INSERT INTO reviews (product_id, user_name, rating, comment) VALUES (?, ?, ?, ?)',
    [productId, userName, rating, comment || '']);
  res.status(201).json({ message: 'Review submitted!' });
});

app.post('/api/coupon/validate', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Coupon code is required' });
  const coupon = queryOne('SELECT * FROM coupons WHERE code = ? AND active = 1', [code.toUpperCase()]);
  if (!coupon) return res.status(404).json({ error: 'Invalid or expired coupon code' });
  res.json({ valid: true, discountPercent: coupon.discount_percent, description: coupon.description });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    run('INSERT INTO subscribers (email) VALUES (?)', [email]);
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) return res.json({ message: 'Already subscribed' });
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });
  try {
    run('INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)', [name || null, email || null, message]);
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// ─── Admin: Product CRUD ────────────────────────────────────────

app.post('/api/products', (req, res) => {
  const { name, category, price, image, description, stock, rating } = req.body;
  if (!name || price === undefined) return res.status(400).json({ error: 'Name and price are required' });
  try {
    const id = insertAndGetId('INSERT INTO products (name, category, price, image, description, stock, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category || null, parseFloat(price), image || '', description || '', stock !== undefined ? parseInt(stock) : 10, rating !== undefined ? parseFloat(rating) : 4.0]);
    res.status(201).json({ message: 'Product created', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  const { name, category, price, image, description, stock, rating } = req.body;
  if (!queryOne('SELECT id FROM products WHERE id = ?', [req.params.id])) {
    return res.status(404).json({ error: 'Product not found' });
  }
  try {
    const fields = {}, params = [];
    if (name !== undefined) { fields.name = name; params.push(name); }
    if (category !== undefined) { fields.category = category; params.push(category); }
    if (price !== undefined) { fields.price = parseFloat(price); params.push(parseFloat(price)); }
    if (image !== undefined) { fields.image = image; params.push(image); }
    if (description !== undefined) { fields.description = description; params.push(description); }
    if (stock !== undefined) { fields.stock = parseInt(stock); params.push(parseInt(stock)); }
    if (rating !== undefined) { fields.rating = parseFloat(rating); params.push(parseFloat(rating)); }
    const setClause = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    params.push(req.params.id);
    run(`UPDATE products SET ${setClause} WHERE id = ?`, params);
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    run('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ─── Admin: Orders ──────────────────────────────────────────────

app.get('/api/admin/orders', (req, res) => {
  const orders = queryAll('SELECT * FROM orders ORDER BY created_at DESC');
  for (const order of orders) {
    order.items = queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    order.tracking = queryAll('SELECT * FROM order_tracking WHERE order_id = ? ORDER BY created_at ASC', [order.id]);
  }
  res.json(orders);
});

app.put('/api/orders/:id', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  if (!queryOne('SELECT id FROM orders WHERE id = ?', [req.params.id])) {
    return res.status(404).json({ error: 'Order not found' });
  }
  try {
    run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    run('INSERT INTO order_tracking (order_id, status, note) VALUES (?, ?, ?)',
      [req.params.id, status, `Status updated to ${status.replace(/_/g, ' ')}`]);
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// ─── Auth ───────────────────────────────────────────────────────

app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Clothify API is running...' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'API Route Not Found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;
