import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { store } from './features/store'
import { productsFetch } from "./features/products/productsSlice"
// import { useDispatch, useSelector } from 'react-redux'


store.dispatch(productsFetch());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

