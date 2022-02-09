import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { store } from './features/store'
import { productsFetch } from "./features/products/productsSlice"
import { getQuantityTotals } from './features/products/cartSlice'
// import { useDispatch, useSelector } from 'react-redux'


store.dispatch(productsFetch());
store.dispatch(getQuantityTotals());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

