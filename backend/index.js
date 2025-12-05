import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Stripe from "stripe";
import orderRoutes from "./routes/orderRoutes.js"; // ✅ import order routes

dotenv.config();

const app = express();
const port = process.env.PORT || 6005;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/api", orderRoutes); // ✅ attach order routes

// ✅ Stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Define Mongoose Schema & Model for users
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  Password: String, // same case as frontend
});

const User = mongoose.model("User", userSchema);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🎁 Personalized Gift Store Backend Running Successfully");
});

// ✅ Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, Password } = req.body;
    if (!name || !email || !Password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(Password, 10);
    const newUser = new User({ name, email, Password: hashed });
    await newUser.save();

    res.status(201).json({ message: "✅ Registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, Password } = req.body;
    console.log("🟢 Login attempt:", email);

    if (!email || !Password)
      return res.status(400).json({ message: "Email and Password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "✅ Login success", user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Password Reset
app.put("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { $set: { Password: hashed } });

    res.json({ message: "✅ Password reset successful" });
  } catch (error) {
    console.error("❌ Password Reset Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Stripe Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, userEmail } = req.body;
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          description: item.desc,
        },
        unit_amount: item.price * 100, // in paise
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/cart?success=true",
      cancel_url: "http://localhost:3000/cart?canceled=true",
    });

    console.log("✅ Stripe Session created:", session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error.message);
    res.status(500).json({ message: "Payment session failed", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
