import { listProducts } from '../services/productService.js';

export const getProducts = async (_req, res) => {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
