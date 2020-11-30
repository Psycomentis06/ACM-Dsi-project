import React from "react";
import { Nav, NavItem } from "reactstrap";
export default function Profile() {
  return (
    <div className="profile">
      <div className="side-bar">
        <Nav>
          <NavItem>Profile</NavItem>
          <NavItem>Password</NavItem>
          <NavItem>Account</NavItem>
        </Nav>
      </div>
    </div>
  );
}
