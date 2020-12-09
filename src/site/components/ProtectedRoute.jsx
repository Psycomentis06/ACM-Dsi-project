import React from "react";
import { Redirect, Route } from "react-router-dom";
import hasPermission from "../functions/hasPermission";
export default function ProtectedRoute({ children, permission, ...reste }) {
  return (
    <Route
      {...reste}
      render={({ location }) => {
        return hasPermission(permission) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                message:
                  "Route protected only for " +
                  permission +
                  ", login to proove it",
                path: location.pathname,
              },
            }}
          />
        );
      }}
    />
  );
}
