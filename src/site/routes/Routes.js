import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
//---
import ProtectedRoute from "../components/ProtectedRoute";
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
import Profile from "../pages/admin/Profile";
export default function Routes() {
  let location = useLocation();
  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key || false}
        timeout={800}
        classNames="fadeScale"
      >
        <Switch location={location}>
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
          <ProtectedRoute permission="admin" exact path="/admin">
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" exact path="/admin/inbox">
            <Inbox />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" exact path="/admin/inbox/:id">
            <Chat />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" exact path="/admin/users">
            <Users />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" exact path="/admin/users/:userId">
            <User />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" path="/admin/orders">
            <Orders />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" exact path="/admin/products">
            <Products />
          </ProtectedRoute>
          <ProtectedRoute
            permission="admin"
            exact
            path="/admin/products/:productId"
          >
            <Product />
          </ProtectedRoute>
          <ProtectedRoute permission="admin" path="/admin/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/404">
            <NotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </CSSTransition>
    </SwitchTransition>
  );
}
