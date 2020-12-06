import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarToggler,
  Collapse,
  Input,
  InputGroup,
  Button,
  Tooltip,
  Alert,
  Spinner,
} from "reactstrap";
import UserCard from "../../components/UserCard";
import UserListItem from "../../components/UserListItem";
import axios from "axios";
import NoData from "../../components/NoData";
import LoadingPage from "../../components/LoadingPage";
import excerpt from "../../functions/excerpt";
export default function Users() {
  // filter bar collapse state
  const [navbar, setNavbar] = useState(false);
  const navbarHandler = () => {
    setNavbar(!navbar);
  };
  // View switch state
  const [viewType, setViewType] = useState("list"); // it will be list or grid view
  const viewTypeHandler = (type) => {
    setViewType(type);
  };
  // Tooltip toogle
  const [tooltip, setTooltip] = useState(false);
  const tooltipHandler = () => {
    setTooltip(!tooltip);
  };
  const [listBtnTooltip, setListBtnToolTip] = useState(false);
  const listBtnTooltipHandler = () => {
    setListBtnToolTip(!listBtnTooltip);
  };
  // get users from API
  const [users, setUsers] = useState([]); // data
  const [error, setError] = useState([]); // request errors
  const [pageLoading, setPageLoading] = useState(true); // request loader
  const [usersLoading, setUsersLoading] = useState(false);
  let limit = 15; // result limit
  let offset = 0; // result offset
  const getUsers = (username, limit, offset) => {
    const name = username || "";
    const reqLimit = limit || "";
    const reqOffset = offset || "";
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/all?username=${name}&limit=${reqLimit}&offset=${reqOffset}`
      )
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.error);
        } else if (err.request) {
          setError("Error made in request");
        } else {
          setError("Connection Error");
        }
      })
      .finally(() => {
        setPageLoading(false);
        limit += 15;
        offset += 15;
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getUsers();
    }, 500);
  }, []);
  // Filter by user status
  const [filterValue, setFilterValue] = useState("all");
  // filter by search
  const [searchValue, setSearchValue] = useState("");
  if (pageLoading) {
    return <LoadingPage />;
  }
  return (
    <Container>
      <Navbar className="mt-5" expand="md" light>
        <NavbarToggler onClick={navbarHandler}></NavbarToggler>
        <Collapse isOpen={navbar} navbar>
          <Row className="w-100 text-center">
            <Col lg className="mb-5">
              <Row>
                <Col>
                  <p className="h4"> View Type</p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Button
                    color={viewType === "grid" ? "primary" : ""}
                    onClick={() => viewTypeHandler("grid")}
                    id="grid-btn"
                  >
                    <i className="fas fa-th"></i>
                  </Button>
                  <Tooltip
                    target="grid-btn"
                    toggle={tooltipHandler}
                    isOpen={tooltip}
                  >
                    Grid View
                  </Tooltip>
                  <Button
                    className="ml-2"
                    color={viewType === "list" ? "primary" : ""}
                    onClick={() => viewTypeHandler("list")}
                    id="list-btn"
                  >
                    <i className="fas fa-list"></i>
                  </Button>
                  <Tooltip
                    target="list-btn"
                    toggle={listBtnTooltipHandler}
                    isOpen={listBtnTooltip}
                  >
                    List View
                  </Tooltip>
                </Col>
              </Row>
            </Col>
            <Col lg className="mb-5">
              <Row>
                <Col>
                  <p className="h4"> Find users</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup>
                    <Input
                      placeholder="Search for user by name"
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        setUsers([""]);
                        setUsersLoading(true);
                        setTimeout(() => {
                          getUsers(searchValue);
                          setUsersLoading(false);
                        }, 1000);
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
            <Col lg className="mb-5">
              <Row>
                <Col>
                  <p className="h4">Filter</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>All users</label>
                </Col>
                <Col>
                  <label>Online</label>
                </Col>
                <Col>
                  <label>Offline</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    <input
                      type="radio"
                      value="all"
                      name="radio_filter"
                      style={{ width: "20px", height: "20px" }}
                      onChange={() => {
                        setFilterValue("all");
                      }}
                      checked={filterValue === "all"}
                    />
                  </label>
                </Col>
                <Col>
                  <label>
                    <input
                      type="radio"
                      value="online"
                      name="radio_filter"
                      style={{ width: "20px", height: "20px" }}
                      onChange={() => {
                        setFilterValue("online");
                      }}
                      checked={filterValue === "online"}
                    />
                  </label>
                </Col>
                <Col>
                  <label>
                    <input
                      type="radio"
                      value="offline"
                      name="radio_filter"
                      style={{ width: "20px", height: "20px" }}
                      onChange={() => {
                        setFilterValue("offline");
                      }}
                      checked={filterValue === "offline"}
                    />
                  </label>
                </Col>
              </Row>
            </Col>
          </Row>
        </Collapse>
      </Navbar>
      {error.length > 0 && <Alert color="danger">{error}</Alert>}
      {users.length === 0 ? (
        <NoData />
      ) : // render gird if viewType is grid
      viewType === "grid" ? (
        <Row>
          {usersLoading && (
            <div className="mx-auto">
              <Spinner
                color="danger"
                style={{ height: "50px", width: "50px" }}
                className="mx-auto"
              />
              <p className="h5 text-danger mt-3">Loading users</p>
            </div>
          )}
          {users.length > 1
            ? users
                .filter((user) => {
                  if (filterValue === "all") {
                    return (user.firstName + " " + user.lastName)
                      .toLowerCase()
                      .includes(searchValue); // all user in user section
                  } else {
                    return (
                      user.status === filterValue &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // active or offline users
                  }
                })
                .map((user) => (
                  <Col key={user.id} className="mb-4">
                    <UserCard
                      role="user"
                      imgSrc={user.photo}
                      username={user.firstName + " " + user.lastName}
                      email={user.email}
                      bio={
                        user.bio
                          ? excerpt(user.bio, 50)
                          : "User don't have description"
                      }
                      orders="15"
                      products="52"
                      reviews="13"
                    />
                  </Col>
                ))
            : null}
        </Row>
      ) : (
        <Row className="text-center">
          <Col md>
            <h4 className="mb-3">Regular Users</h4>
            <div
              className="scrollbar-hide"
              style={{ height: "600px", overflowY: "scroll" }}
            >
              {users
                .filter((user) => {
                  if (filterValue === "all") {
                    return (
                      user.roles === "ROLE_USER" &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // all user in user section
                  } else {
                    return (
                      user.status === filterValue &&
                      user.roles === "ROLE_USER" &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // active or offline regular users
                  }
                })
                .map((el) => (
                  <UserListItem
                    key={el.id}
                    avatarSrc={el.photo}
                    avatarAlt="userprofile image"
                    username={el.firstName + " " + el.lastName}
                    email={el.email}
                    bio={el.bio ? excerpt(el.bio, 4) : ""}
                  />
                ))}
              {usersLoading && (
                <div>
                  <Spinner color="success" />
                  <p className="h5 text-success">Loading users</p>
                </div>
              )}
            </div>
          </Col>
          <Col md className="border-primary border-right border-left">
            <h4 className="mb-3">Admin</h4>
            <div
              style={{ height: "600px", overflowY: "scroll" }}
              className="scrollbar-hide"
            >
              {users
                .filter((user) => {
                  if (filterValue === "all") {
                    return (
                      user.roles === "ROLE_ADMIN" &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // all admins
                  } else {
                    return (
                      user.status === filterValue &&
                      user.roles === "ROLE_ADMIN" &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // active or offline admins
                  }
                })
                .map((el) => (
                  <UserListItem
                    key={el.id}
                    avatarSrc={el.photo}
                    avatarAlt="userprofile image"
                    username={el.firstName + " " + el.lastName}
                    email={el.email}
                    bio="try something"
                  />
                ))}
              {usersLoading && (
                <div>
                  <Spinner color="success" />
                  <p className="h5 text-success">Loading admins</p>
                </div>
              )}
            </div>
          </Col>
          <Col md>
            <h4 className="mb-3">Superadmin</h4>
            <div
              className="scrollbar-hide"
              style={{ height: "600px", overflowY: "scroll" }}
            >
              {users
                .filter((user) => {
                  if (filterValue === "all") {
                    return (
                      user.roles === "ROLE_SUPERADMIN" &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // all user in user section
                  } else {
                    return (
                      user.status === filterValue &&
                      user.roles === "ROLE_SUPERADMIN" &&
                      (user.firstName + " " + user.lastName)
                        .toLowerCase()
                        .includes(searchValue)
                    ); // active or offline regular users
                  }
                })
                .map((el) => (
                  <UserListItem
                    key={el.id}
                    avatarSrc={el.photo}
                    avatarAlt="userprofile image"
                    username={el.firstName + " " + el.lastName}
                    email={el.email}
                    bio="try something"
                  />
                ))}
              {usersLoading && (
                <div>
                  <Spinner color="success" />
                  <p className="h5 text-success">Loading superadmins</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
