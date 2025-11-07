export default function ReceiptModal({ open, onClose, receipt }) {
  if (!open) return null;
  const items = receipt.items || [];
  const total = Number(receipt.total || 0);
  const when = receipt.timestamp ? new Date(receipt.timestamp) : new Date();

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white opacity-90"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v4H3zM3 7l2 14h14l2-14M8 11h8m-8 4h6"/></svg>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest opacity-80">Order Receipt</div>
                <div className="text-lg font-semibold">Mock E-Com Cart</div>
              </div>
            </div>
            <button onClick={onClose} className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition">Close</button>
          </div>

          <div className="p-6">
            <div className="grid sm:grid-cols-3 gap-4 text-sm mb-2">
              <div>
                <div className="text-gray-500">Order ID</div>
                <div className="font-medium break-all">{receipt.orderId}</div>
              </div>
              <div>
                <div className="text-gray-500">Date</div>
                <div className="font-medium">{when.toLocaleString()}</div>
              </div>
              <div className="sm:text-right">
                <div className="text-gray-500">Total</div>
                <div className="text-xl font-semibold">${total.toFixed(2)}</div>
              </div>
            </div>

            {(receipt.name || receipt.email) && (
              <div className="grid sm:grid-cols-2 gap-4 text-sm mb-5">
                {receipt.name && (
                  <div>
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">{receipt.name}</div>
                  </div>
                )}
                {receipt.email && (
                  <div className="sm:text-right">
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium break-all">{receipt.email}</div>
                  </div>
                )}
              </div>
            )}

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-600">Items</div>
              <div className="divide-y max-h-64 overflow-auto">
                {items.map((it) => (
                  <div key={it.id || it.productId} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
                    <div className="col-span-6 font-medium">{it.name}</div>
                    <div className="col-span-2 text-gray-600">x{it.qty}</div>
                    <div className="col-span-2 text-gray-600">${Number(it.price).toFixed(2)}</div>
                    <div className="col-span-2 text-right font-medium">${Number(it.lineTotal ?? it.qty * it.price).toFixed(2)}</div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">No items</div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-xs text-gray-500">Thank you for shopping with us!</div>
              <div className="px-3 py-1.5 rounded-full bg-black text-white text-sm font-medium">Total: ${total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
