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
        <Navbar color="light" light expand="sm">
          <NavbarBrand href="/"> Test </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto gradient" navbar>
              <NavItem>
                <Link to="/" className="nav-link">
                  {" "}
                  Home{" "}
                </Link>
              </NavItem>

              <NavItem>
                <Link to="/store" className="nav-link">
                  {" "}
                  Store{" "}
                </Link>
              </NavItem>

              <NavItem>
                <Link to="/dashboard" className="nav-link">
                  {" "}
                  Dashboard{" "}
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}
