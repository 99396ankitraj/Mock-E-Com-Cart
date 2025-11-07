import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="section-title mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-sm text-gray-600">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.orderId}
              className="card overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded-md bg-indigo-600/10 text-indigo-700 font-medium">Order</span>
                  <span className="font-semibold break-all">#{o.orderId}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{new Date(o.timestamp).toLocaleString()}</div>
              </div>

              <div className="card-body">
                <div className="text-sm divide-y">
                  {o.items.map((it, idx) => (
                    <div key={idx} className="py-2 grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-6 font-medium">{it.name}</div>
                      <div className="col-span-2 text-gray-600">x{it.qty}</div>
                      <div className="col-span-2 text-gray-600">${Number(it.price).toFixed(2)}</div>
                      <div className="col-span-2 text-right font-semibold">${Number(it.lineTotal ?? (it.qty * it.price)).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">Thanks for your purchase!</div>
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold">
                      ${Number(o.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
