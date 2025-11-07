import { getCartWithTotals } from '../models/cartModel.js';
import { CartItem } from '../models/cart.js';
import { Order } from '../models/order.js';
import { v4 as uuidv4 } from 'uuid';

export const checkout = async (cartItemsInput, buyer = {}) => {
  let cartSnapshot;
  if (Array.isArray(cartItemsInput) && cartItemsInput.length > 0) {
    // trust client snapshot for mock purposes
    const total = cartItemsInput.reduce((s, it) => s + (it.qty * it.price), 0);
    cartSnapshot = { items: cartItemsInput, total: Number(total.toFixed(2)) };
  } else {
    cartSnapshot = await getCartWithTotals();
  }

  const receipt = {
    orderId: uuidv4(),
    timestamp: new Date().toISOString(),
    total: cartSnapshot.total,
    items: cartSnapshot.items.map(({ id, productId, name, price, qty, lineTotal }) => ({ id, productId, name, price, qty, lineTotal })),
    name: buyer.name || '',
    email: buyer.email || ''
  };

  // persist order
  await Order.create({
    orderId: receipt.orderId,
    timestamp: new Date(receipt.timestamp),
    total: receipt.total,
    items: receipt.items.map(({ productId, name, price, qty, lineTotal }) => ({ productId, name, price, qty, lineTotal })),
    name: receipt.name,
    email: receipt.email
  });

  // clear purchased items from cart
  if (Array.isArray(cartItemsInput) && cartItemsInput.length > 0) {
    const ids = cartItemsInput
      .map(ci => ci.id)
      .filter(Boolean);
    if (ids.length > 0) {
      await CartItem.deleteMany({ _id: { $in: ids } });
    }
  } else {
    await CartItem.deleteMany({});
  }

  return receipt;
};
