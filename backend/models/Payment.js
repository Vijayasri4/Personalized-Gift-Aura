import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentId: String,
  amount: Number,
  currency: String,
  email: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
