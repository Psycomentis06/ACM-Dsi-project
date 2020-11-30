import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
export default function AdminSidebar(props) {
  const { path } = useRouteMatch();
  return (
    <div
      className={
        "side-bar shadow-2 " + (props.isOpen ? "open-sidebar" : "close-sidebar")
      }
    >
      <div className="list-items">
        <NavLink
          to={path + "/"}
          className="list-item text-shadow"
          exact
          activeClassName="active-nav"
        >
          Profile
        </NavLink>
        <NavLink
          to={path + "/password"}
          className="list-item text-shadow"
          activeClassName="active-nav"
        >
          Password
        </NavLink>
        <NavLink
          to={path + "/account"}
          className="list-item text-shadow"
          activeClassName="active-nav"
        >
          Account
        </NavLink>
        <a className="active-link list-item shadow-2"></a>
      </div>
    </div>
  );
}
