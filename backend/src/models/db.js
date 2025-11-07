import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../data/db.sqlite');

let db;

export const getDb = () => {
  if (!db) throw new Error('DB not initialized');
  return db;
};

export const initDb = async () => {
  await new Promise((resolve, reject) => {
    sqlite3.verbose();
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await run(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS cart (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    qty INTEGER NOT NULL,
    FOREIGN KEY(productId) REFERENCES products(id)
  )`);

  const row = await get('SELECT COUNT(*) as c FROM products');
  if (row.c === 0) {
    const seed = [
      { id: 'p1', name: 'Wireless Mouse', price: 19.99 },
      { id: 'p2', name: 'Mechanical Keyboard', price: 59.99 },
      { id: 'p3', name: 'USB-C Hub', price: 24.99 },
      { id: 'p4', name: 'Noise-cancel Headphones', price: 89.99 },
      { id: 'p5', name: 'Webcam 1080p', price: 39.99 },
      { id: 'p6', name: 'Portable SSD 1TB', price: 109.99 },
      { id: 'p7', name: 'Laptop Stand', price: 29.99 },
      { id: 'p8', name: 'Bluetooth Speaker', price: 34.99 }
    ];
    for (const p of seed) {
      await run('INSERT INTO products (id, name, price) VALUES (?, ?, ?)', [p.id, p.name, p.price]);
    }
  }
};

export const run = (sql, params = []) => new Promise((resolve, reject) => {
  getDb().run(sql, params, function (err) {
    if (err) reject(err);
    else resolve(this);
  });
});

export const get = (sql, params = []) => new Promise((resolve, reject) => {
  getDb().get(sql, params, function (err, row) {
    if (err) reject(err);
    else resolve(row);
  });
});

export const all = (sql, params = []) => new Promise((resolve, reject) => {
  getDb().all(sql, params, function (err, rows) {
    if (err) reject(err);
    else resolve(rows);
  });
});
