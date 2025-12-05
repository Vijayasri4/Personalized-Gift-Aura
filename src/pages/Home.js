import React from 'react';
import { useNavigate } from 'react-router-dom';
import fruit2 from "../images/fruit2.jpeg";
import cup from "../images/cup.jpg";
import ice2 from "../images/ice2.jpeg";
import download from "../images/download.jpeg";
import backImg from "../images/back.jpeg"; // ✅ background image
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleBrowseGift = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/orders");
    } else {
      navigate("/login", { state: { from: "/orders" } });
    }
  };

  return (
    <div
      className="home-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🎉 Hero Section */}
      <div className="hero-section fade-in">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Personalized Gift Aura 🎁</h1>
          <p className="hero-subtitle">
            Create memories that last forever — customize gifts with love and creativity.
          </p>
          <p>
            Personalized Gift Store is your one-stop destination for unique, heartfelt gifts crafted to make every occasion truly special. We specialize in a wide variety of customized products – from engraved mugs and printed t-shirts to photo frames and accessories – each designed to create lasting memories.
          </p>
          <p>
            Every item in our collection is made with care and attention to detail, ensuring that your gift is not just thoughtful, but also meaningful. Whether it’s a birthday, anniversary, wedding, or any other celebration, we have something perfect to bring smiles to your loved ones.
          </p>
          <p>
            What makes us special? We offer complete personalization – add names, photos, or heartfelt messages to create gifts that are as unique as your relationships. Our goal is to turn simple items into cherished keepsakes. Because here, every gift is more than just a present – it’s a memory wrapped with love!
          </p>
          <button className="hero-btn" onClick={handleBrowseGift}>
            Explore Gifts
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* 🖼️ Categories Section */}
      <div className="categories-section fade-in">
        <h2>✨ Explore Our Categories ✨</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src={fruit2} alt="Mugs" />
            <h4>Custom Mugs</h4>
          </div>
          <div className="category-card">
            <img src={cup} alt="T-shirts" />
            <h4>Printed T-Shirts</h4>
          </div>
          <div className="category-card">
            <img src={ice2} alt="Photo Frames" />
            <h4>Photo Frames</h4>
          </div>
          <div className="category-card">
            <img src={download} alt="Accessories" />
            <h4>Keychains & More</h4>
          </div>
        </div>
      </div>

      {/* 🌈 Quote Section */}
      <div className="quote-section fade-in">
        <blockquote>
          “A personalized gift is not just an object — it’s a reflection of love, thought, and care.”
        </blockquote>
      </div>
    </div>
  );
};

export default Home;
