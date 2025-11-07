import { checkout } from '../services/checkoutService.js';

export const postCheckout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body || {};
    const receipt = await checkout(cartItems, { name, email });
    res.json(receipt);
  } catch (e) {
    res.status(500).json({ error: 'Checkout failed' });
  }
};
