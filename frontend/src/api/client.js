import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || '/api';
export const api = axios.create({ baseURL });

export const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const getCart = async () => {
  const { data } = await api.get('/cart');
  return data;
};

export const addToCart = async (productId, qty) => {
  const { data } = await api.post('/cart', { productId, qty });
  return data;
};

export const removeCartItem = async (id) => {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
};

export const checkout = async (cartItems, buyer = {}) => {
  const { data } = await api.post('/checkout', { cartItems, ...buyer });
  return data;
};
