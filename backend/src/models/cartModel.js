import { CartItem } from './cart.js';

export const addOrUpdateCartItem = async (productId, qty) => {
  const exists = await CartItem.findOne({ productId });
  if (exists) {
    exists.qty = qty;
    await exists.save();
    return { id: exists._id.toString(), productId: exists.productId, qty: exists.qty };
  }
  const doc = await CartItem.create({ productId, qty });
  return { id: doc._id.toString(), productId: doc.productId, qty: doc.qty };
};

export const removeCartItem = async (id) => {
  await CartItem.deleteOne({ _id: id });
};

export const getCartWithTotals = async () => {
  const cartDocs = await CartItem.find({}).lean();
  if (cartDocs.length === 0) return { items: [], total: 0 };

  // Fetch products from DummyJSON and build a map by id
  const res = await fetch('https://dummyjson.com/products?limit=100');
  if (!res.ok) throw new Error('Failed to fetch products for cart');
  const data = await res.json();
  const map = new Map((data.products || []).map(p => [String(p.id), { name: p.title, price: Number(p.price) }]));

  const items = cartDocs.map((c) => {
    const meta = map.get(String(c.productId)) || { name: 'Unknown', price: 0 };
    const lineTotal = Number((c.qty * meta.price).toFixed(2));
    return {
      id: String(c._id),
      productId: c.productId,
      qty: c.qty,
      name: meta.name,
      price: meta.price,
      lineTotal,
    };
  });
  const total = items.reduce((s, it) => s + it.lineTotal, 0);
  return { items, total: Number(total.toFixed(2)) };
};

export const clearCart = async () => {
  await CartItem.deleteMany({});
};
