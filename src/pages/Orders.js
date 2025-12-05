import React, { useEffect } from 'react';
import img5 from '../images/cup.jpg';
import img6 from '../images/fruit2.jpeg';
import img7 from '../images/choco.jpg';
import img8 from '../images/red.jpg';
import img9 from '../images/cheese.jpg';
import img10 from '../images/ice2.jpeg';
import img11 from '../images/chocho.png';
import img12 from '../images/rasamalai.jpeg';
import img14 from '../images/brownie.avif';
import img15 from '../images/ice.avif';
import './Orders.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTocart, deleteFromCart } from '../redux/Cartslice';

const Orders = () => {
  const navigate = useNavigate();

  // ✅ Restrict access to logged-in users
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  // ✅ Products list with numeric prices
  const gifts = [
    { id: 6, img: img5, title: 'White T-shirt', price: 250, desc: 'Size from M to XXL', quantity: 1 },
    { id: 7, img: img6, title: 'White Coffee Mug', price: 480, desc: 'White coffee mug', quantity: 1 },
    { id: 8, img: img7, title: 'Black T-shirt', price: 520, desc: 'Size from M to XXL', quantity: 1 },
    { id: 9, img: img8, title: 'Wooden Keychain', price: 500, desc: 'Rectangle shaped wooden keychain.', quantity: 1 },
    { id: 10, img: img9, title: 'Heart shaped keychain', price: 550, desc: 'Plastic Heart shaped keychain.', quantity: 1 },
    { id: 11, img: img10, title: 'Photo Frame', price: 800, desc: '5x8 photo frame.', quantity: 1 },
    { id: 12, img: img11, title: 'Wooden Keychain', price: 480, desc: 'Round shaped Wooden keychain.', quantity: 1 },
    { id: 13, img: img12, title: 'Photo pendant', price: 370, desc: 'Heart shaped photo pendant.', quantity: 1 },
    { id: 14, img: img14, title: 'Wallet', price: 550, desc: 'Brown coloured wallet for men', quantity: 1 },
    { id: 15, img: img15, title: 'Black Coffee Mug', price: 550, desc: 'Black coffee mug', quantity: 1 },
  ];

  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addTocart(item));
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  return (
    <div className="orders-section">
      <h2>Order Your Gifts</h2>
      <div className="orders-grid">
        {gifts.map((gift, index) => (
          <div className="order-card" key={index}>
            <img src={gift.img} alt={gift.title} />
            <h5>{gift.title}</h5>
            {/* ✅ Add ₹ only when displaying */}
            <p>₹{gift.price} - {gift.desc}</p>
            {cartitems.find((reduxdata) => reduxdata.id === gift.id) ? (
              <button className="btn btn-danger cartbutton" onClick={() => deleteCart(gift)}>
                Remove From Cart
              </button>
            ) : (
              <button className="btn btn-danger cartbutton" onClick={() => addCart(gift)}>
                Add To Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
