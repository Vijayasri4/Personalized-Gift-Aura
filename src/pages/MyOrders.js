import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if not logged in
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login", { replace: true, state: { from: "/my-orders" } });
    }
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:6005/api/my-orders/${user.email}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          // sort newest first
          setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else if (data && Array.isArray(data.orders)) {
          setOrders(data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

if (loading) {
  return (
    <div className="orders-loading">
      <div className="loader-box">
        <div className="gift-icon">🎁</div>
        <h3>Fetching Your Orders...</h3>
        <p>Just a moment while we unwrap your gifts!</p>
      </div>
    </div>
  );
}

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="my-orders-container">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="my-orders-grid">
          {orders.map((order, index) => (
            <div key={index} className="my-order-card">
              <h4>🧾 Order #{orders.length - index}</h4>

              <p><strong>Amount:</strong> ₹{order.amount || order.totalAmount || "—"}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: order.status === "paid" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {order.status || order.paymentStatus || "Processing"}
                </span>
              </p>
              <p>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>

              {order.items && Array.isArray(order.items) && (
                <div className="my-order-items">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="my-order-item">
                      {i.img && <img src={i.img} alt={i.title} />}
                      <div>
                        <p><strong>{i.title}</strong></p>
                        <p>Qty: {i.quantity}</p>
                        <p>₹{i.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
