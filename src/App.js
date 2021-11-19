import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Error from "./Error";
import ProductDetails from "./ProductDetails";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Home />
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
        <Route path="/cart">
          <Navbar />
          <Cart />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
