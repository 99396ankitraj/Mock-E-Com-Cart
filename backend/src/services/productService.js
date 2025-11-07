export const listProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  const products = (data.products || []).map(p => ({
    id: String(p.id),
    name: p.title,
    price: Number(p.price),
  }));
  return products;
};
