import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./dashboard.scss";
import AdminAvatar from "../../../assets/images/avatar.svg";
export default function AdminNavbar() {
  const [openSlider, setOpenSlider] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const navDropdownHandler = () => {
    setNavDropdown(!navDropdown);
  };
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("token"); // lose token
    history.push("/");
  };
  return (
    <>
      <Navbar expand="md" className="gradient-full" color="light" light>
        {openSlider ? <div className="navbar-slider-background"></div> : ""}
        <NavbarToggler
          onClick={() => {
            setOpenSlider(!openSlider);
          }}
        ></NavbarToggler>
        <div className={"navbar-slider " + (openSlider ? "show" : "")}>
          <Nav>
            <NavItem>
              <Link to="/admin/" className="nav-link">
                Dashboard
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/admin/users" className="nav-link">
                Users
              </Link>
            </NavItem>
            <NavItem>
              <NavLink className="admin-logo">
                <img src={AdminAvatar} alt="Admin avatar" />
              </NavLink>
            </NavItem>
            <NavItem>
              <Link to="/admin/inbox" className="nav-link">
                Inbox
              </Link>
            </NavItem>
            <NavItem>
              <Dropdown
                isOpen={navDropdown}
                toggle={navDropdownHandler}
                inNavbar={true}
              >
                <DropdownToggle
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                  className="text-primary"
                >
                  <i className="fas fa-sort-down fa-2x"></i>
                </DropdownToggle>
                <DropdownMenu style={{ left: "auto", right: 0 }}>
                  <DropdownItem>
                    <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                      Orders
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </>
  );
}
