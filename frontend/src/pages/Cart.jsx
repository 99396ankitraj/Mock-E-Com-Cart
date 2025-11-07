import { useEffect, useState } from 'react';
import { addToCart, getCart, removeCartItem } from '../api/client.js';
import CartItem from '../components/CartItem.jsx';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const { refreshFromServer } = useCart();
  const navigate = useNavigate();

  const refresh = () => getCart().then(setCart).finally(()=> setLoading(false));

  useEffect(() => { refresh(); }, []);

  const onQtyChange = async (productId, qty) => {
    await addToCart(productId, qty);
    refresh();
    refreshFromServer();
  };

  const onRemove = async (id) => {
    await removeCartItem(id);
    refresh();
    refreshFromServer();
  };

  const onBuyNow = (item) => {
    navigate('/checkout', { state: { selectedIds: [item.id] } });
  };

  const onToggleSelected = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const buildSnapshotFromIds = (ids) => {
    const map = new Map(cart.items.map(it => [it.id, it]));
    return ids.map(id => {
      const it = map.get(id);
      return it ? { id: it.id, productId: it.productId, name: it.name, price: it.price, qty: it.qty, lineTotal: it.lineTotal } : null;
    }).filter(Boolean);
  };

  const onBuySelected = () => {
    if (selectedIds.length === 0) return;
    const snapshot = buildSnapshotFromIds(selectedIds);
    if (snapshot.length === 0) return;
    navigate('/checkout', { state: { selectedIds } });
  };

  const onBuyAll = () => {
    if (cart.items.length === 0) return;
    navigate('/checkout', { state: { selectedIds: cart.items.map(it => it.id) } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
      <div className="mb-3 flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={selectedIds.length>0 && selectedIds.length===cart.items.length}
                 onChange={(e)=> setSelectedIds(e.target.checked ? cart.items.map(x=>x.id) : [])} />
          <span>Select All</span>
        </label>
        <button onClick={onBuySelected} disabled={selectedIds.length === 0} className={`px-3 py-2 rounded text-sm ${selectedIds.length === 0 ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'}`}>Buy Selected</button>
        <button onClick={onBuyAll} disabled={cart.items.length === 0} className={`px-3 py-2 rounded text-sm ${cart.items.length === 0 ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'}`}>Buy All</button>
      </div>
      <div className="bg-white rounded border">
        <div className="p-3">
          {cart.items.length === 0 ? (
            <div className="text-sm text-gray-600">Cart is empty. <Link className="underline" to="/">Browse products</Link></div>
          ) : (
            cart.items.map((it) => (
              <CartItem key={it.id} item={it} onQtyChange={onQtyChange} onRemove={onRemove} onBuyNow={onBuyNow} selected={selectedIds.includes(it.id)} onToggleSelected={onToggleSelected} />
            ))
          )}
        </div>
        <div className="p-3 border-t flex justify-between font-medium">
          <div>Total</div>
          <div>${cart.total.toFixed(2)}</div>
        </div>
      </div>
      {/* Receipt is handled on Checkout page */}
    </div>
  );
}
