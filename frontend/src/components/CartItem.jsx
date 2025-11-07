export default function CartItem({ item, onQtyChange, onRemove, onBuyNow, selected = false, onToggleSelected }) {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelected?.(item.id)}
          className="h-4 w-4 mr-3"
        />
        <div>
          <div className="font-medium leading-tight">{item.name}</div>
          <div className="text-sm text-gray-600">${item.price.toFixed(2)} each</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            aria-label="Decrease quantity"
            onClick={() => onQtyChange(item.productId, Math.max(1, item.qty - 1))}
            className="btn btn-secondary px-2 py-1"
          >-</button>
          <div className="min-w-[2.5rem] text-center font-medium">{item.qty}</div>
          <button
            aria-label="Increase quantity"
            onClick={() => onQtyChange(item.productId, item.qty + 1)}
            className="btn btn-primary px-2 py-1"
          >+</button>
        </div>
        <div className="w-24 text-right font-medium">${item.lineTotal.toFixed(2)}</div>
        <button onClick={()=> onRemove(item.id)} className="btn btn-ghost text-red-600">Remove</button>
        <button onClick={()=> onBuyNow?.(item)} className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  );
}
