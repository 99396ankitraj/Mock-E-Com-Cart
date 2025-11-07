export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card h-full flex flex-col">
      <div className="card-body flex-1">
        <h3 className="font-semibold leading-snug">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">${product.price.toFixed(2)}</p>
      </div>
      <div className="card-section flex items-center gap-2">
        <button onClick={() => onAdd(product.id, 1)} className="btn btn-primary w-full">Add to Cart</button>
      </div>
    </div>
  );
}
