import React from "react";
import { Switch, Route } from "react-router-dom";

// import pages
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Store from "../pages/Store";
import Dashboard from "../pages/admin/Dashboard";

export default function Routes() {
  return (
    <Switch>
      {/* User Routes*/}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/store">
        <Store />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/">
        <Dashboard />
      </Route>
      <Route path="**">
        <NotFound />
      </Route>
    </Switch>
  );
}
