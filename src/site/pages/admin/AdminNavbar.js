import React, { useState } from "react";
import { Navbar, Nav, NavItem, NavLink, NavbarToggler } from "reactstrap";
import "./dashboard.scss";
import AdminAvatar from "../../../assets/images/avatar.svg";
export default function AdminNavbar() {
  const [openSlider, setOpenSlider] = useState(false);
  return (
    <>
      <Navbar expand="md" className="gradient-full" color="light" light>
        <div className="navbar-slider-background"></div>
        <NavbarToggler
          onClick={() => {
            setOpenSlider(!openSlider);
          }}
        ></NavbarToggler>
        <div className={"navbar-slider " + (openSlider ? "show" : "")}>
          <Nav>
            <NavItem>
              <NavLink href="#">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="admin-logo" href="#">
                <img src={AdminAvatar} alt="Admin avatar" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Inbox</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Orders</NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </>
  );
}
