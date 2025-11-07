import { Order } from '../models/order.js';

export const listOrders = async () => {
  const docs = await Order.find({}, { _id: 0 }).sort({ timestamp: -1 }).lean();
  return docs.map((o) => ({
    orderId: o.orderId,
    timestamp: o.timestamp,
    total: o.total,
    items: o.items,
  }));
};
