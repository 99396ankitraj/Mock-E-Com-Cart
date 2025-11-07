import { addToCart, deleteFromCart, getCart } from '../services/cartService.js';

export const postCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const cart = await addToCart(productId, qty);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message || 'Failed to add to cart' });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await deleteFromCart(id);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message || 'Failed to remove item' });
  }
};

export const getCartItems = async (_req, res) => {
  try {
    const cart = await getCart();
    res.json(cart);
  } catch (e) {
    res.status(500).json({ error: 'Failed to get cart' });
  }
};
