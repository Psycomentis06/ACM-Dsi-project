import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

// import components
import Routes from "./Routes";
import UserNavbar from "../pages/user/UserNavbar";
import AdminNavbar from "../pages/admin/AdminNavbar";

export default function MainInterface() {
  const path = useLocation();
  return (
    <>
      {
        path.pathname === "/404" ? (
          ""
        ) : path.pathname.includes("/admin") ? (
          <AdminNavbar />
        ) : (
          <UserNavbar />
        ) // render navbar based on path
      }
      <Routes />
    </>
  );
}
