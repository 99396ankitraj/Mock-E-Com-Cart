import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, ref: 'Product', required: true },
    qty: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
