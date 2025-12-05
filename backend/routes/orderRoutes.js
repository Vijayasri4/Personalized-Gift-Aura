import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Save new order after payment success
router.post("/save-order", async (req, res) => {
  try {
    const { items, totalAmount, stripeSessionId, paymentStatus, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    const newOrder = new Order({
      userEmail,
      items,
      totalAmount,
      stripeSessionId,
      paymentStatus,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Save order error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch all orders for a specific user (My Orders)
router.get("/my-orders/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch orders error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch all orders (Admin or full view)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch all orders error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
