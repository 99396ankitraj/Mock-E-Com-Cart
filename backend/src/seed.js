import { connectDb } from './models/mongo.js';
import { Product } from './models/product.js';

(async () => {
  try {
    await connectDb();
    await Product.deleteMany({});
    const items = [
      { _id: 'p1', name: 'Wireless Mouse', price: 19.99 },
      { _id: 'p2', name: 'Mechanical Keyboard', price: 59.99 },
      { _id: 'p3', name: 'USB-C Hub', price: 24.99 },
      { _id: 'p4', name: 'Noise-cancel Headphones', price: 89.99 },
      { _id: 'p5', name: 'Webcam 1080p', price: 39.99 },
      { _id: 'p6', name: 'Portable SSD 1TB', price: 109.99 },
      { _id: 'p7', name: 'Laptop Stand', price: 29.99 },
      { _id: 'p8', name: 'Bluetooth Speaker', price: 34.99 }
    ];
    await Product.insertMany(items);
    console.log('Seeded products (MongoDB)');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
