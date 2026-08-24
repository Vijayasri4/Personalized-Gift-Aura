# 🎁 Personalized Gift Aura

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application that lets customers design and purchase personalized gifts online — mugs, t-shirts, photo frames, keychains, and more — with real-time customization, secure payments, and order tracking.

---

## 📖 About the Project

**Personalized Gift Aura** provides a creative, interactive platform for users to choose from a wide range of gift products and personalize them with their own images, names, and messages. The platform focuses on a smooth end-to-end experience — from browsing products to real-time customization, secure checkout, and order history — while keeping user data and transactions secure.

Key highlights:
- Real-time, drag-and-drop gift customization built with **react-rnd**
- Secure authentication with **bcrypt**-encrypted passwords
- Secure online payments via **Stripe**
- Persistent order history via **MongoDB**
- Fully responsive UI for desktop and mobile

---

## ✨ Features

### 👤 User Management
- Secure registration and login (bcrypt-encrypted passwords)
- Email-based account identification
- Session-based authentication using LocalStorage
- Password reset via email
- Logout functionality

### 🛍️ Product & Gift Catalog
- Responsive, grid-based gift gallery
- Product title, description, price, and image for each item
- Backend-driven catalog — products can be updated without frontend changes

### 🎨 Customization Module
- Draggable and resizable text/images using **react-rnd**
- Add custom text (names, quotes, messages)
- Upload personal images onto products
- Real-time preview of the final design before purchase

### 🛒 Cart & Checkout
- Dynamic cart with live quantity/price updates
- Secure checkout via **Stripe** payment gateway
- Automatic cart clearing after successful payment
- Real-time payment success/failure feedback

### 📦 Order Management
- "My Orders" page with full order history
- Displays product image, title, quantity, price, total, and payment status
- Orders sorted with the latest first
- User-specific order retrieval via email filtering

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Payments | Stripe API |
| Authentication | bcrypt, session/LocalStorage-based auth |
| Customization UI | react-rnd |
| Email Notifications | Nodemailer |

---

## 🔄 Workflow

```
Start
 └─ User Registration
     └─ View Gift Aura
         └─ Add Image/Text (Customization)
             └─ Checkout
                 └─ Update Shopping Cart
                     └─ Proceed to Payment
                         └─ Initiate Secure Payment via Stripe
                             ├─ Payment Successful → Add to My Orders → End
                             └─ Payment Failed → Return to Cart
```

---

## 📂 Project Modules

1. **User Management Module** – Registration, login, session handling, password reset
2. **Product & Gift Catalog Module** – Browsing and product display
3. **Customization Module** – Interactive text/image personalization
4. **Cart & Checkout Module** – Cart management and Stripe checkout
5. **Order Management Module** – Order history and tracking

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or Atlas)
- Stripe API keys (publishable & secret)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/personalized-gift-aura.git
cd personalized-gift-aura

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Running the App

```bash
# Start backend server
cd backend
npm start

# Start frontend (in a new terminal)
cd frontend
npm start
```

The app will be available at `http://localhost:3000` (frontend) and your configured backend port (commonly `5000`).

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Register/Login | Secure account creation and login |
| Home Page | Landing page with categories |
| Order Page | Browse and add gifts to cart |
| Cart Page | Customize items, adjust quantity |
| Stripe Checkout | Secure payment processing |
| My Orders | Order history dashboard |

*(Add screenshots from your `/screenshots` folder here)*

---

## 🔐 Security

- Passwords hashed using **bcrypt**
- API routes protected with middleware
- Payment data handled exclusively through **Stripe**, never stored locally
- User order and personal data kept confidential

---

## 🔮 Future Enhancements

- Discount offers and coupon codes
- Delivery/shipment tracking
- Admin analytics dashboard
- Wishlist functionality

