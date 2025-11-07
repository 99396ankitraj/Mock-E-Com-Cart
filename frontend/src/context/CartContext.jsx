import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { getCart } from '../api/client.js';

const CartContext = createContext({ count: 0, refreshFromServer: async () => {}, setCount: () => {} });

export function CartProvider({ children }) {
  const [count, setCount] = useState(0);

  const computeCount = (cart) => (Array.isArray(cart?.items) ? cart.items.reduce((s, it) => s + (it.qty || 0), 0) : 0);

  const refreshFromServer = useCallback(async () => {
    try {
      const cart = await getCart();
      setCount(computeCount(cart));
    } catch (_) {}
  }, []);

  useEffect(() => { refreshFromServer(); }, [refreshFromServer]);

  return (
    <CartContext.Provider value={{ count, setCount, refreshFromServer }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
