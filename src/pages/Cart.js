import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, deleteFromCart } from "../redux/Cartslice";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css";

const stripePromise = loadStripe(
  "pk_test_51S8j1bHKiu5VdfAvpnHCPRy0zQKFhAC5T8I1CpNrLPByS0PRUeHmtyYa1jpKSzLOjXsdrHfl2e0Pu6846EcB651c00bRaw6zTb"
);

const Cart = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();

  const [customTexts, setCustomTexts] = useState({});
  const [customImages, setCustomImages] = useState({});
  const [fileInputKeys, setFileInputKeys] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // ✅ new state

  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Detect Stripe payment result
  useEffect(() => {
    const query = new URLSearchParams(location.search);

    if (query.get("success")) {
      setMessage("✅ Payment successful! Your order has been placed.");
      setPaymentSuccess(true); // ✅ prevent empty cart showing

      // Save order and clear cart
      saveOrder();
      dispatch({ type: "cart/clearCart" });
      localStorage.removeItem("cartItems");

      // Redirect after delay
      setTimeout(() => navigate("/my-orders"), 2000);
    }

    if (query.get("canceled")) {
      setMessage("❌ Payment canceled. Please try again.");
      setPaymentSuccess(false);
    }
  }, [location, dispatch, navigate]);

  // ✅ Save order to database
  const saveOrder = async () => {
    try {
      const totalAmount = calculateTotal();
      const response = await fetch("http://localhost:6005/api/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user?.email,
          items: cartitems,
          totalAmount,
          paymentStatus: "paid",
        }),
      });

      if (!response.ok) throw new Error("Failed to save order");
      console.log("✅ Order saved successfully!");
    } catch (error) {
      console.error("❌ Save Order Error:", error);
    }
  };

  const deleteCart = (item) => dispatch(deleteFromCart(item));
  const incrementCart = (id, quantity) =>
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  const decrementCart = (id, quantity) =>
    quantity > 1 && dispatch(updateQuantity({ id, quantity: quantity - 1 }));

  const handleTextChange = (e, id) =>
    setCustomTexts({ ...customTexts, [id]: e.target.value });

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setCustomImages({ ...customImages, [id]: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id) => {
    const updated = { ...customImages };
    delete updated[id];
    setCustomImages(updated);
    setFileInputKeys((prev) => ({ ...prev, [id]: Date.now() }));
  };

  const calculateTotal = () =>
    cartitems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  // ✅ Stripe Checkout logic
  const handleCheckout = async () => {
    if (cartitems.length === 0) return alert("Cart is empty!");
    if (!user?.email) return navigate("/login");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:6005/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          items: cartitems.map((item) => ({
            title: item.title,
            desc: item.desc,
            price: Number(item.price),
            quantity: item.quantity,
            img: item.img,
          })),
        }),
      });

      const { id } = await res.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) alert(error.message);
    } catch (err) {
      console.error(err);
      alert("Payment failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Rendering Logic
  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <h2>🎉 Payment Successful!</h2>
        <p>Your order has been placed successfully.</p>
        <p>Redirecting you to your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-grid">
      {message && <div className="cart-message">{message}</div>}

      {cartitems.length === 0 ? (
        <div className="empty-cart">
          <h2>🛒 Your Cart is Empty!</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <button
            className="start-shopping-btn"
            onClick={() => navigate("/order")}
          >
            🛍️ Start Shopping
          </button>
        </div>
      ) : (
        <>
          {cartitems.map((item, index) => (
            <div className="order-card" key={index}>
              <div className="image-wrapper">
                <img src={item.img} alt={item.title} className="gift-image" />

                {customTexts[item.id] && (
                  <Rnd
                    default={{ x: 50, y: 50, width: 120, height: 40 }}
                    bounds="parent"
                    enableResizing={false}
                    className="custom-text"
                  >
                    {customTexts[item.id]}
                  </Rnd>
                )}

                {customImages[item.id] && (
                  <Rnd
                    default={{ x: 30, y: 30, width: 100, height: 100 }}
                    bounds="parent"
                    style={{ cursor: "move" }}
                  >
                    <img
                      src={customImages[item.id]}
                      alt="custom overlay"
                      className="overlay-image"
                    />
                  </Rnd>
                )}
              </div>

              <h5>{item.title}</h5>
              <p>
                ₹{item.price} - {item.desc}
              </p>

              <div className="quantity-controls">
                <button
                  className="btn-secondary"
                  onClick={() => decrementCart(item.id, item.quantity)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn-secondary"
                  onClick={() => incrementCart(item.id, item.quantity)}
                >
                  +
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter custom text"
                value={customTexts[item.id] || ""}
                onChange={(e) => handleTextChange(e, item.id)}
                className="custom-input"
              />

              <div className="upload-section">
                <input
                  key={fileInputKeys[item.id] || "file-" + item.id}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, item.id)}
                />
                {customImages[item.id] && (
                  <button
                    className="remove-btn"
                    onClick={() => handleImageDelete(item.id)}
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className="cart-buttons">
                <button className="delete-btn" onClick={() => deleteCart(item)}>
                  Delete
                </button>
                <button
                  className="add-more-btn"
                  onClick={() => navigate("/order")}
                >
                  ➕ Add More
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Checkout Section */}
          <div className="checkout-section">
            <h4>Total: ₹{calculateTotal()}</h4>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
