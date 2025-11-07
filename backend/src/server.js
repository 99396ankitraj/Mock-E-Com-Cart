import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './models/mongo.js';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import checkoutRouter from './routes/checkout.js';
import ordersRouter from './routes/orders.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser or same-origin
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);
app.options('*', cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', name: 'Mock E-Com Cart API' });
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4000;
connectDb().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error('Failed to initialize DB', err);
  process.exit(1);
});
