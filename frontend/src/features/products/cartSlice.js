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
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.name} added to cart`, {
          // position: "bottom-left",
          // autoClose: 1000,
          // hideProgressBar: true,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const updatedCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);
      state.cartItems = updatedCartItems;
      toast.error("Product removed from cart");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload);

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity");
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);
        state.cartItems = nextCartItems;
        toast.error("Product removed from cart");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getQuantityTotals(state, action) {
      const totalQuantity = state.cartItems.reduce((cartTotal, cartItem) => {
        // const { price, cartQuantity } = cartItem;
        cartTotal += cartItem.cartQuantity;
        return cartTotal;
      }, 0)
      // console.log(totalQuantity)
      state.cartTotalQuantity = totalQuantity;
    },
    getCartTotal(state, action) {
      let cartTotal = state.cartItems.reduce((total, cartItem) => {
        total += cartItem.price * cartItem.cartQuantity;
        return total;
      }, 0)
      // console.log({cartTotal})
      cartTotal = parseFloat(cartTotal.toFixed(2));
      state.cartTotalAmount = cartTotal;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart emptied");
    } 
  }
});


export const { addToCart, removeFromCart, decreaseCart, getQuantityTotals, getCartTotal, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

