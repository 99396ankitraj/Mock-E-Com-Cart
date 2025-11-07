import { Product } from './product.js';

export const getAllProducts = async () => {
  const docs = await Product.find({}, { _id: 1, name: 1, price: 1 }).lean();
  return docs.map((d) => ({ id: d._id, name: d.name, price: d.price }));
};
