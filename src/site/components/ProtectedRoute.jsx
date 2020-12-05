import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import hasPermission from "../functions/hasPermission";
export default function ProtectedRoute({ children, permission, ...reste }) {
  const location = useLocation();
  return (
    <Route
      {...reste}
      render={({ location }) => {
        return hasPermission(permission) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: location }} />
        );
      }}
    />
  );
}
