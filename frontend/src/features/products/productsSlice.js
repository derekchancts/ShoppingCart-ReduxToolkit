import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(
        // "https://chaoo-online-shop.herokuapp.com/products"
        "http://localhost:5000/products"
      );
      console.log({ response })
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState = {
  items: [],
  status: null,
};


// A SLICE - AN OBJECT CONTAINS THE REDUCERS AND ACTIONS
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  }

});



export default productsSlice.reducer;
