import mongoose from 'mongoose';
import { Product } from './product.js';

export const connectDb = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mock_ecom_cart';
  await mongoose.connect(uri, { dbName: undefined });

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { _id: 'p1', name: 'Wireless Mouse', price: 19.99 },
      { _id: 'p2', name: 'Mechanical Keyboard', price: 59.99 },
      { _id: 'p3', name: 'USB-C Hub', price: 24.99 },
      { _id: 'p4', name: 'Noise-cancel Headphones', price: 89.99 },
      { _id: 'p5', name: 'Webcam 1080p', price: 39.99 },
      { _id: 'p6', name: 'Portable SSD 1TB', price: 109.99 },
      { _id: 'p7', name: 'Laptop Stand', price: 29.99 },
      { _id: 'p8', name: 'Bluetooth Speaker', price: 34.99 }
    ]);
  }
};
