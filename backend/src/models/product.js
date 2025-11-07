import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false }
);

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
