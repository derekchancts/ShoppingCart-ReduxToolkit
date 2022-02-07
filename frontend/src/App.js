import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <div className="content-container">
        <Switch>
          <Route path="/cart" exact component={Cart} />
          <Route path="/" exact component={Home} />
          <Route path="*" component={NotFound}/>
          {/* <Route path="/cart/:id" component={Cart} /> */}
          {/* <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" /> */}
        </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;
