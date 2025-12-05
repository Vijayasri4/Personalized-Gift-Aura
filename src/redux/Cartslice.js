import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartitems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const existing = state.cartitems.find(item => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartitems.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },

    deleteFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(item => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },

    updateQuantity: (state, action) => {
      const item = state.cartitems.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },

    clearCart: (state) => {
      state.cartitems = [];
      localStorage.removeItem("cartItems");
    }
  },
});

export const { addTocart, deleteFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
