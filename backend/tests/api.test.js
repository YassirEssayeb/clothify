const request = require('supertest');
const path = require('path');
const fs = require('fs');

const TEST_DB = path.join(__dirname, 'test-data.db');
process.env.DB_PATH = TEST_DB;

afterAll(() => {
  try { fs.unlinkSync(TEST_DB); } catch {}
});

let app;
beforeAll(async () => {
  app = require('../server');
  await new Promise(r => setTimeout(r, 500));
});

describe('GET /api/products', () => {
  it('returns all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(20);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
    expect(res.body[0]).toHaveProperty('category');
  });
});

describe('GET /api/products/:id', () => {
  it('returns single product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Premium Tee');
    expect(res.body.price).toBe(29.00);
  });

  it('returns 404 for non-existent product', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Product not found');
  });
});

describe('GET /api/categories', () => {
  it('returns category list', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain('Tops');
    expect(res.body).toContain('Outerwear');
    expect(res.body).toContain('Footwear');
  });
});

describe('GET /api/search', () => {
  it('returns matching products', async () => {
    const res = await request(app).get('/api/search?q=denim');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name.toLowerCase()).toContain('denim');
  });

  it('returns empty for no match', async () => {
    const res = await request(app).get('/api/search?q=zzzzznonexistent');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it('returns empty when no query', async () => {
    const res = await request(app).get('/api/search');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /api/orders', () => {
  const validOrder = {
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St',
    cart: [{ id: 1, name: 'Premium Tee', quantity: 2, price: 29.00 }],
    total: 58.00,
    paymentMethod: 'COD'
  };

  it('creates an order', async () => {
    const res = await request(app).post('/api/orders').send(validOrder);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Order placed successfully!');
    expect(res.body).toHaveProperty('orderId');
  });

  it('rejects order missing required fields', async () => {
    const res = await request(app).post('/api/orders').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Missing required');
  });

  it('rejects order with empty cart', async () => {
    const res = await request(app).post('/api/orders').send({
      ...validOrder, cart: []
    });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/orders/:id', () => {
  it('returns order details for existing order', async () => {
    const created = await request(app).post('/api/orders').send({
      name: 'Jane', email: 'jane@test.com', address: '456 Oak St',
      cart: [{ id: 2, name: 'Denim Jacket', quantity: 1, price: 89.00 }],
      total: 89.00, paymentMethod: 'COD'
    });
    const res = await request(app).get(`/api/orders/${created.body.orderId}`);
    expect(res.status).toBe(200);
    expect(res.body.customer_name).toBe('Jane');
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('tracking');
  });

  it('returns 404 for non-existent order', async () => {
    const res = await request(app).get('/api/orders/9999');
    expect(res.status).toBe(404);
  });
});

describe('PATCH /api/orders/:id/status', () => {
  let orderId;
  beforeEach(async () => {
    const res = await request(app).post('/api/orders').send({
      name: 'Status Test', email: 'status@test.com', address: 'Addr',
      cart: [{ id: 1, name: 'Tee', quantity: 1, price: 29.00 }],
      total: 29.00, paymentMethod: 'COD'
    });
    orderId = res.body.orderId;
  });

  it('updates order status', async () => {
    const res = await request(app).patch(`/api/orders/${orderId}/status`).send({ status: 'shipped' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Order status updated');
  });

  it('rejects invalid status', async () => {
    const res = await request(app).patch(`/api/orders/${orderId}/status`).send({ status: 'invalid_status' });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/register', () => {
  it('registers a new user', async () => {
    const res = await request(app).post('/api/register').send({
      name: 'Test User', email: 'test@example.com', password: 'password123'
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toContain('successful');
  });

  it('rejects duplicate email', async () => {
    const res = await request(app).post('/api/register').send({
      name: 'Another', email: 'test@example.com', password: 'password123'
    });
    expect(res.status).toBe(409);
  });

  it('rejects short password', async () => {
    const res = await request(app).post('/api/register').send({
      name: 'User', email: 'short@example.com', password: '123'
    });
    expect(res.status).toBe(400);
  });

  it('rejects missing fields', async () => {
    const res = await request(app).post('/api/register').send({ name: 'No Email' });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/login', () => {
  beforeAll(async () => {
    await request(app).post('/api/register').send({
      name: 'Login User', email: 'login@example.com', password: 'secret123'
    });
  });

  it('logs in with valid credentials', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'login@example.com', password: 'secret123'
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('login@example.com');
  });

  it('rejects invalid password', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'login@example.com', password: 'wrongpass'
    });
    expect(res.status).toBe(401);
  });

  it('rejects non-existent email', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'noone@example.com', password: 'anything'
    });
    expect(res.status).toBe(401);
  });
});

describe('POST /api/reviews', () => {
  it('submits a review', async () => {
    const res = await request(app).post('/api/reviews').send({
      productId: 1, userName: 'Reviewer', rating: 5, comment: 'Great product!'
    });
    expect(res.status).toBe(201);
  });

  it('rejects review without productId and rating', async () => {
    const res = await request(app).post('/api/reviews').send({ userName: 'Anon' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/reviews/:productId', () => {
  it('returns reviews for product', async () => {
    const res = await request(app).get('/api/reviews/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('reviews');
    expect(res.body).toHaveProperty('average');
    expect(res.body).toHaveProperty('count');
  });
});

describe('POST /api/coupon/validate', () => {
  it('validates a valid coupon', async () => {
    const res = await request(app).post('/api/coupon/validate').send({ code: 'SAVE10' });
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
    expect(res.body.discountPercent).toBe(10);
  });

  it('validates case-insensitive coupon', async () => {
    const res = await request(app).post('/api/coupon/validate').send({ code: 'save10' });
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
  });

  it('rejects invalid coupon', async () => {
    const res = await request(app).post('/api/coupon/validate').send({ code: 'INVALID' });
    expect(res.status).toBe(404);
  });
});

describe('POST /api/subscribe', () => {
  it('subscribes an email', async () => {
    const res = await request(app).post('/api/subscribe').send({ email: 'sub@example.com' });
    expect(res.status).toBe(201);
  });

  it('handles duplicate subscription', async () => {
    const res = await request(app).post('/api/subscribe').send({ email: 'sub@example.com' });
    expect(res.status).toBe(200);
  });

  it('rejects empty email', async () => {
    const res = await request(app).post('/api/subscribe').send({});
    expect(res.status).toBe(400);
  });
});

describe('POST /api/feedback', () => {
  it('submits feedback', async () => {
    const res = await request(app).post('/api/feedback').send({
      name: 'User', email: 'user@example.com', message: 'Great store!'
    });
    expect(res.status).toBe(201);
  });

  it('rejects empty feedback', async () => {
    const res = await request(app).post('/api/feedback').send({ name: 'User' });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/products (admin)', () => {
  it('creates a new product', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Test Product', category: 'Tops', price: 39.99,
      image: 'https://example.com/img.jpg', description: 'A test product', stock: 10
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('rejects product without name and price', async () => {
    const res = await request(app).post('/api/products').send({ category: 'Tops' });
    expect(res.status).toBe(400);
  });
});

describe('PUT /api/products/:id (admin)', () => {
  let productId;
  beforeAll(async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Editable Product', category: 'Tops', price: 25.00, stock: 5
    });
    productId = res.body.id;
  });

  it('updates product fields', async () => {
    const res = await request(app).put(`/api/products/${productId}`).send({ price: 29.99, stock: 8 });
    expect(res.status).toBe(200);
  });

  it('returns 404 for non-existent product', async () => {
    const res = await request(app).put('/api/products/9999').send({ price: 10 });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/products/:id (admin)', () => {
  let productId;
  beforeAll(async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Deletable Product', category: 'Accessories', price: 15.00
    });
    productId = res.body.id;
  });

  it('deletes a product', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    const check = await request(app).get(`/api/products/${productId}`);
    expect(check.status).toBe(404);
  });
});

describe('POST /api/password-reset', () => {
  it('initiates reset for registered email', async () => {
    const res = await request(app).post('/api/password-reset').send({ email: 'test@example.com' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('returns 404 for unregistered email', async () => {
    const res = await request(app).post('/api/password-reset').send({ email: 'unknown@example.com' });
    expect(res.status).toBe(404);
  });
});

describe('GET / - root', () => {
  it('returns API status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('Clothify API');
  });
});

describe('404 handler', () => {
  it('returns error for unknown routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('API Route Not Found');
  });
});
