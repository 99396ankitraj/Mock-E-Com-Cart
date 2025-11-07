import { listOrders } from '../services/orderService.js';

export const getOrders = async (_req, res) => {
  try {
    const orders = await listOrders();
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
