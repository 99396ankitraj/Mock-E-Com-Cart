import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true },
    total: { type: Number, required: true },
    items: { type: [OrderItemSchema], default: [] },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  { timestamps: false }
);

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
