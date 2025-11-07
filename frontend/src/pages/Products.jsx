import { useEffect, useState } from 'react';
import { addToCart, fetchProducts } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const { refreshFromServer } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts).finally(()=> setLoading(false));
  }, []);

  const onAdd = async (productId, qty) => {
    try {
      await addToCart(productId, qty);
      refreshFromServer();
      setMsg('Added to cart');
      setTimeout(()=> setMsg(''), 1500);
    } catch (e) {
      setMsg('Failed to add');
      setTimeout(()=> setMsg(''), 1500);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {msg && <div className="mb-3 text-sm text-green-700">{msg}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
      </div>
    </div>
  );
}
