const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join('/tmp', 'data.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount REAL NOT NULL,
    payment_method TEXT DEFAULT 'COD',
    payment_status TEXT DEFAULT 'Pending',
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.prepare('SELECT COUNT(*) as cnt FROM products').get();
if (count.cnt === 0) {
  db.exec(`
    INSERT INTO products (name, price, image, description, category) VALUES
    ('Premium Tee', 290.00, 'https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Elevate your daily style with this premium quality tee.', 'Tops'),
    ('Denim Jacket', 899.00, 'https://images.pexels.com/photos/13662420/pexels-photo-13662420.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Classic denim jacket with a modern fit and durable design.', 'Outerwear'),
    ('Summer Dress', 499.00, 'https://images.pexels.com/photos/19895977/pexels-photo-19895977.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Experience ultimate comfort and style with this premium summer dress.', 'Dresses'),
    ('Canvas Sneakers', 599.00, 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Modern sneakers designed for comfort and durability.', 'Footwear'),
    ('Linen Shirt', 390.00, 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Light and breathable linen shirt for any occasion.', 'Tops'),
    ('Chino Pants', 450.00, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=1260', 'Comfortable chino pants with a modern tapered fit.', 'Pants'),
    ('Beanie Hat', 190.00, 'https://images.pexels.com/photos/11170599/pexels-photo-11170599.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Keep warm and stylish with this premium beanie hat.', 'Accessories'),
    ('Leather Belt', 340.00, 'https://images.pexels.com/photos/31367058/pexels-photo-31367058.jpeg?auto=compress&cs=tinysrgb&w=1260', 'High-quality leather belt with a classic finish.', 'Accessories'),
    ('Urban Hoodie', 540.00, 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Stay cozy and stylish with this oversized urban hoodie.', 'Outerwear'),
    ('Floral Skirt', 350.00, 'https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260', 'A beautiful floral skirt perfect for spring and summer days.', 'Dresses'),
    ('Classic Polo', 320.00, 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Timeless polo shirt made from breathable cotton piqué.', 'Tops'),
    ('Leather Boots', 1200.00, 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Rugged and stylish leather boots built for any adventure.', 'Footwear'),
    ('Silk Scarf', 250.00, 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=1260', 'Elegant silk scarf to add a touch of class to your outfit.', 'Accessories'),
    ('Slim Fit Jeans', 650.00, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1260', 'Durable slim-fit jeans with a comfortable stretch.', 'Pants'),
    ('Wool Overcoat', 1490.00, 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1260', 'Stay warm this winter with our premium wool blend overcoat.', 'Outerwear'),
    ('Wrist Watch', 850.00, 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Minimalist analog watch with a genuine leather strap.', 'Accessories'),
    ('Suede Loafers', 950.00, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Elegant suede loafers for a sophisticated look.', 'Footwear'),
    ('Aviator Sunglasses', 450.00, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1260', 'Classic aviator sunglasses with polarized lenses.', 'Accessories'),
    ('V-Neck Sweater', 590.00, 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Soft wool-blend V-neck sweater for layering.', 'Tops'),
    ('Cargo Pants', 680.00, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=1260', 'Durable cargo pants with multiple utility pockets.', 'Pants')
  `);
}

app.get('/api/categories', (req, res) => {
  const rows = db.prepare('SELECT DISTINCT category FROM products ORDER BY category ASC').all();
  res.json(rows.map(r => r.category));
});

app.post('/api/orders', (req, res) => {
  const { name, email, address, cart, total, paymentMethod, paymentStatus } = req.body;
  if (!name || !email || !address || !cart || cart.length === 0) {
    return res.status(400).json({ error: 'Missing required order information' });
  }
  const insertOrder = db.prepare('INSERT INTO orders (customer_name, customer_email, customer_address, total_amount, payment_method, payment_status) VALUES (?, ?, ?, ?, ?, ?)');
  const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
  const transaction = db.transaction((name, email, address, total, method, pStatus, cart) => {
    const result = insertOrder.run(name, email, address, total, method, pStatus);
    const orderId = result.lastInsertRowid;
    for (const item of cart) insertItem.run(orderId, item.id, item.quantity, item.price);
    return orderId;
  });
  try {
    const orderId = transaction(name, email, address, total, paymentMethod || 'COD', paymentStatus || 'Pending', cart);
    res.json({ message: 'Order placed successfully!', orderId });
  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(email);
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.json({ message: 'Already subscribed' });
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });
  try {
    db.prepare('INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)').run(name || null, email || null, message);
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.get('/api/products', (req, res) => {
  res.json(db.prepare('SELECT * FROM products').all());
});

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) return res.json([]);
  const wildcard = `%${searchTerm}%`;
  res.json(db.prepare('SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ?').all(wildcard, wildcard, wildcard));
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(row);
});

app.get('/', (req, res) => {
  res.json({ message: 'Clothify API is running...' });
});

module.exports = app;
