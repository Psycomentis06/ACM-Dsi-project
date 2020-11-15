import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// import components
import Routes from "./Routes";
import Admin from "../pages/admin/Admin";
//import UserNavbar from "../pages/user/UserNavbar";
//import Chatbox from "../components/Chatbox";

export default function MainInterface() {
  return (
    <Router>
      {/*
      <UserNavbar />
      <Chatbox />
      */}

      <Admin />
      <Routes />
    </Router>
  );
}
