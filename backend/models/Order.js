import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      title: String,
      desc: String,
      price: Number,
      quantity: Number,
      img: String,
    },
  ],
  totalAmount: Number,
  stripeSessionId: String,
  paymentStatus: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
