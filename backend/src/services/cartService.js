import { addOrUpdateCartItem, removeCartItem, getCartWithTotals } from '../models/cartModel.js';

export const addToCart = async (productId, qty) => {
  if (!productId || !Number.isInteger(qty) || qty < 1) {
    const err = new Error('Invalid productId or qty');
    err.status = 400;
    throw err;
  }
  await addOrUpdateCartItem(productId, qty);
  return getCartWithTotals();
};

export const deleteFromCart = async (id) => {
  if (!id) {
    const err = new Error('Invalid cart item id');
    err.status = 400;
    throw err;
  }
  await removeCartItem(id);
  return getCartWithTotals();
};

export const getCart = async () => getCartWithTotals();
