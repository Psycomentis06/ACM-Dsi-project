import React from "react";
import { NavLink } from "react-router-dom";
export default function AdminSidebar(props) {
  return (
    <div
      className={
        "side-bar shadow-2 " + (props.isOpen ? "open-sidebar" : "close-sidebar")
      }
    >
      <div className="list-items">
        <NavLink
          to={props.url + "/"}
          className="list-item text-shadow"
          exact
          activeClassName="active-nav"
        >
          Profile
        </NavLink>
        <NavLink
          to={props.url + "/password"}
          className="list-item text-shadow"
          activeClassName="active-nav"
        >
          Password
        </NavLink>
        {/*
              <NavLink
          to={props.url + "/notification"}
          className="list-item text-shadow"
          activeClassName="active-nav"
        >
          Notifications
        </NavLink>
      */}
        <NavLink
          to={props.url + "/contact"}
          className="list-item text-shadow"
          activeClassName="active-nav"
        >
          Contact
        </NavLink>
        <NavLink
          to={props.url + "/settings"}
          className="list-item text-shadow"
          activeClassName="active-nav"
        >
          Settings
        </NavLink>
        <span className="active-link list-item shadow-2"></span>
      </div>
    </div>
  );
}
