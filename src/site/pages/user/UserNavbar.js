import React, { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="container-fluid">
        <Navbar
          dark
          expand="sm"
          className="bg-gradient-primary-45"
          style={{
            backgroundSize: "110%, 150%",
          }}
        >
          <NavbarBrand href="/"> ACM Panel </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto gradient" navbar>
              <NavItem>
                <Link
                  to="/"
                  className="nav-link ml-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "150px",
                  }}
                >
                  <i className="fas fa-home fa-2x"></i>
                  Home
                </Link>
              </NavItem>

              <NavItem>
                <Link
                  to="/admin/"
                  className="nav-link ml-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "150px",
                  }}
                >
                  <span className="material-icons fa-2x">dashboard</span>
                  Dashboard
                </Link>
              </NavItem>

              <NavItem>
                <Link
                  to="/login"
                  className="nav-link ml-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "110px",
                  }}
                >
                  <i className="fas fa-sign-in-alt fa-2x"></i>
                  Login
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}
