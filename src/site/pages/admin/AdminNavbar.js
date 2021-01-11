import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import Axios from "axios";
import "./dashboard.scss";
import AdminAvatar from "../../../assets/images/avatar.svg";
export default function AdminNavbar() {
  const [redirect, setRedirect] = useState({
    valid: false,
    message: "",
    path: "",
  });
  const getUser = (unmounted) => {
    const userData = localStorage.getItem("userData"); // if user logged before
    if (userData !== undefined && userData !== null) {
      const parsedData = JSON.parse(userData);
      Axios.get(process.env.REACT_APP_API_URL + "/user/" + parsedData.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => {
        if (!unmounted) {
          if (err.response) {
            if (err.response.status === 401) {
              if (
                err.response.data.message === "Wrong privileges" ||
                err.response.data.message === "Auth error"
              ) {
                setRedirect({
                  valid: true,
                  message: "Your session is expired, please login again",
                  path: "/login",
                });
              }
            } else if (err.response.status === 404) {
              setRedirect({
                valid: true,
                message: "It looks like your id is not valid, log in again",
                path: "/login",
              });
            }
          }
        }
      });
    }
  };
  useEffect(() => {
    let unmounted = false;
    getUser(unmounted);
    setInterval(() => getUser(unmounted), 1800000);
    return () => (unmounted = true);
  }, []);

  const [openSlider, setOpenSlider] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const navDropdownHandler = () => {
    setNavDropdown(!navDropdown);
  };
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("token"); // lose token
    localStorage.removeItem("userData"); // remove userdata
    Axios.put(
      process.env.REACT_APP_API_URL +
        "/user/" +
        JSON.parse(localStorage.getItem("userData")).id +
        "/status",
      { status: "offline" },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    history.push("/");
  };

  if (redirect.valid) {
    return (
      <Redirect
        to={{
          pathname: redirect.path,
          state: {
            message: redirect.message,
            path: "/admin",
          },
        }}
      />
    );
  }
  const userData = JSON.parse(localStorage.getItem("userData"));
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
              <Link
                to="/admin/users"
                className={
                  "nav-link " +
                  (userData?.roles === "ROLE_SUPERADMIN" ? "" : "disabled")
                }
              >
                Users
              </Link>
            </NavItem>
            <NavItem>
              <Link className="admin-logo" to="/admin/profile">
                <img src={userData?.photo || AdminAvatar} alt="Admin avatar" />
              </Link>
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
                  <DropdownItem>
                    <Link
                      to="/admin/products"
                      style={{ textDecoration: "none" }}
                    >
                      Products
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link
                      to="/admin/uploads"
                      style={{ textDecoration: "none" }}
                    >
                      Uploads
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
