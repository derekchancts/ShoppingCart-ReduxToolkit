import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// action creator
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id=null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // "https://chaoo-online-shop.herokuapp.com/products"
        "http://localhost:5000/products"
      );
      // console.log({ response })
      return response?.data;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error.response.data)
      return rejectWithValue("an error occurred")
    }
  }
);


const initialState = {
  items: [],
  status: null,
  error: null
};


// A SLICE - AN OBJECT CONTAINS THE REDUCERS AND ACTIONS
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},  // will generate action creators, and handle the state for the action creators
  extraReducers: {  // will NOT generate action creators. only handles the action creators and their action types - pending, fulfilled, rejected
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload
    },
  }

});



export default productsSlice.reducer;
