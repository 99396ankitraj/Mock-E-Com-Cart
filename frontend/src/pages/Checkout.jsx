import { useEffect, useState } from 'react';
import { checkout, getCart } from '../api/client.js';
import ReceiptModal from '../components/ReceiptModal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState({});
  const { refreshFromServer } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIds = Array.isArray(location.state?.selectedIds) ? location.state.selectedIds : [];

  useEffect(() => { getCart().then(setCart); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const items = (selectedIds.length > 0)
      ? cart.items.filter(it => selectedIds.includes(it.id))
      : cart.items;
    const payloadItems = items.map(it => ({ id: it.id, productId: it.productId, name: it.name, price: it.price, qty: it.qty, lineTotal: it.lineTotal }));
    const r = await checkout(payloadItems, { name, email });
    setReceipt(r);
    setOpen(true);
    // cart is cleared on server after checkout; refresh navbar count
    refreshFromServer();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card">
        <div className="card-body">
          <h2 className="section-title mb-4">Checkout</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <div className="label">Full Name</div>
              <input className="input" placeholder="Jane Doe" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div>
              <div className="label">Email</div>
              <input type="email" className="input" placeholder="jane@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-full">Pay (Mock)</button>
            <div className="text-xs text-gray-500 text-center">This is a mock checkout — no real payment is processed.</div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <h3 className="section-title">Order Summary</h3>
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold">${((selectedIds.length>0? cart.items.filter(it=>selectedIds.includes(it.id)) : cart.items).reduce((s,it)=> s+it.lineTotal, 0)).toFixed(2)}</span>
          </div>
          <div className="divide-y text-sm">
            {(selectedIds.length>0? cart.items.filter(it=>selectedIds.includes(it.id)) : cart.items).map((it)=> (
              <div key={it.id} className="py-2 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-7 font-medium">{it.name}</div>
                <div className="col-span-2 text-gray-600">x{it.qty}</div>
                <div className="col-span-3 text-right font-semibold">${it.lineTotal.toFixed(2)}</div>
              </div>
            ))}
            {(selectedIds.length>0? cart.items.filter(it=>selectedIds.includes(it.id)).length===0 : cart.items.length===0) && (
              <div className="py-6 text-center text-gray-500">Your cart is empty.</div>
            )}
          </div>
        </div>
      </div>

      <ReceiptModal open={open} onClose={()=> { setOpen(false); refreshFromServer(); navigate('/orders'); }} receipt={receipt} />
    </div>
  );
}
