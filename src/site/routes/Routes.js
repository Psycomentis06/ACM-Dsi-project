import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// import pages
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Store from "../pages/Store";
import LoginRegister from "../pages/user/LoginRegister";
import Dashboard from "../pages/admin/Dashboard";
import Inbox from "../pages/admin/Inbox";
import Chat from "../components/Chat";
import Users from "../pages/admin/Users";
import User from "../pages/admin/User";
import Orders from "../pages/admin/Orders";
import Products from "../pages/admin/Products";
import Product from "../pages/admin/Product";
export default function Routes() {
  return (
    <Switch>
      {/* User Routes*/}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/store">
        <Store />
      </Route>
      <Route exact path="/login">
        <LoginRegister />
      </Route>

      {/* Admin Routes */}
      <Route exact path="/admin">
        <Dashboard />
      </Route>
      <Route exact path="/admin/inbox">
        <Inbox />
      </Route>
      <Route exact path="/admin/inbox/:id">
        <Chat />
      </Route>
      <Route exact path="/admin/users">
        <Users />
      </Route>
      <Route exact path="/admin/users/:userId">
        <User />
      </Route>
      <Route path="/admin/orders">
        <Orders />
      </Route>
      <Route exact path="/admin/products">
        <Products />
      </Route>
      <Route exact path="/admin/products/:productId">
        <Product />
      </Route>
      <Route path="/404">
        <NotFound />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
}
