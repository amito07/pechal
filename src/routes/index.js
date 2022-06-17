import React from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "../pages/Cart";
import Gifts from "../pages/Gifts";
import Profile from '../pages/Profile';
import Requisition from "../pages/Requisition";
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/feeds" component={Gifts} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/requisition" component={Requisition} />
    </Switch>
  );
};

export default AppRoutes;
