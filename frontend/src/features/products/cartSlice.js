import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  // cartItems: [],
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {  // addCart is action creator
      // state.cartItems.push(action.payload);
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
      // if (itemIndex >= 0) {
      //   state.cartItems[itemIndex] = {
      //     ...state.cartItems[itemIndex],
      //     cartQuantity: state.cartItems[itemIndex].cartQuantity + 1
      //   }
        toast.info(`Increased ${state.cartItems[itemIndex].name} quantity`, {
          // position: "bottom-left",
          // autoClose: 1000,
          // hideProgressBar: true,
        });
        // toast.warning("test")
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.name} added to cart`, {
          // position: "bottom-left",
          // autoClose: 1000,
          // hideProgressBar: true,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems) )
      
    }
  }
});


export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

