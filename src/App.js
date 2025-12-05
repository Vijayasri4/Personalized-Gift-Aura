// App.js
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// 🔹 Pages & Components
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders"; // ✅ new page for order confirmation

function App() {
  // ✅ Check for logged-in user
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Forget />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/orders"
            element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
          />

          {/* ✅ Confirmation Page after Payment */}
          <Route
            path="/my-orders"
            element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" />}
          />

          {/* ✅ Other Routes */}
          <Route path="/logout" element={<Logout />} />
          

          {/* ✅ Fallback route (optional) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
