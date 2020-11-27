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
} from "reactstrap";
import UserCard from "../../components/UserCard";
import UserListItem from "../../components/UserListItem";
import axios from "axios";
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
  const [loading, setLoading] = useState(true); // request loader
  const getUsers = () => {
    axios
      .get("/api/getusers")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  };
  let usersData = users;
  useEffect(() => {
    getUsers();
  }, []);
  // Filter by user status
  const [filterValue, setFilterValue] = useState("all");
  // filter by search
  const [searchValue, setSearchValue] = useState("");
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
                    <Button>
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
      {
        // render gird if viewType is grid
        viewType === "grid" ? (
          <Row>
            <Col>
              <UserCard
                imgSrc="https://images.unsplash.com/photo-1605562181850-9bb0267553a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                username="Ali Amor"
                email="alibenamor30@gmail.com"
                bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fuga reprehenderit, rerum officiis atque modi laboriosam esse. Eos, laborum veritatis placeat dolorum blanditiis quibusdam eveniet totam nostrum quisquam vitae ipsa!"
                orders="15"
                products="52"
                reviews="13"
              />
            </Col>
            <Col>
              <UserCard
                role="admin"
                imgSrc="https://images.unsplash.com/photo-1605562181850-9bb0267553a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                username="Ali Amor"
                email="alibenamor30@gmail.com"
                bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fuga reprehenderit, rerum officiis atque modi laboriosam esse. Eos, laborum veritatis placeat dolorum blanditiis quibusdam eveniet totam nostrum quisquam vitae ipsa!"
                orders="15"
                products="52"
                reviews="13"
              />
            </Col>
            <Col>
              <UserCard
                role="superadmin"
                imgSrc="https://images.unsplash.com/photo-1605562181850-9bb0267553a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                username="Ali Amor"
                email="alibenamor30@gmail.com"
                bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fuga reprehenderit, rerum officiis atque modi laboriosam esse. Eos, laborum veritatis placeat dolorum blanditiis quibusdam eveniet totam nostrum quisquam vitae ipsa!"
                orders="15"
                products="52"
                reviews="13"
              />
            </Col>
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
                        user.role === "ROLE_USER" &&
                        (user.first_name + " " + user.last_name)
                          .toLowerCase()
                          .includes(searchValue)
                      ); // all user in user section
                    } else {
                      return (
                        user.status === filterValue &&
                        user.role === "ROLE_USER" &&
                        (user.first_name + " " + user.last_name)
                          .toLowerCase()
                          .includes(searchValue)
                      ); // active or offline regular users
                    }
                  })
                  .map((el) => (
                    <UserListItem
                      key={el.id}
                      avatarSrc={el.avatar}
                      avatarAlt="userprofile image"
                      username={el.first_name + " " + el.last_name}
                      email={el.email}
                      bio="try something"
                    />
                  ))}
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
                        user.role === "ROLE_ADMIN" &&
                        (user.first_name + " " + user.last_name)
                          .toLowerCase()
                          .includes(searchValue)
                      ); // all admins
                    } else {
                      return (
                        user.status === filterValue &&
                        user.role === "ROLE_ADMIN" &&
                        (user.first_name + " " + user.last_name)
                          .toLowerCase()
                          .includes(searchValue)
                      ); // active or offline admins
                    }
                  })
                  .map((el) => (
                    <UserListItem
                      key={el.id}
                      avatarSrc={el.avatar}
                      avatarAlt="userprofile image"
                      username={el.first_name + " " + el.last_name}
                      email={el.email}
                      bio="try something"
                    />
                  ))}
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
                        user.role === "ROLE_SUPERADMIN" &&
                        (user.first_name + " " + user.last_name)
                          .toLowerCase()
                          .includes(searchValue)
                      ); // all user in user section
                    } else {
                      return (
                        user.status === filterValue &&
                        user.role === "ROLE_SUPERADMIN" &&
                        (user.first_name + " " + user.last_name)
                          .toLowerCase()
                          .includes(searchValue)
                      ); // active or offline regular users
                    }
                  })
                  .map((el) => (
                    <UserListItem
                      key={el.id}
                      avatarSrc={el.avatar}
                      avatarAlt="userprofile image"
                      username={el.first_name + " " + el.last_name}
                      email={el.email}
                      bio="try something"
                    />
                  ))}
              </div>
            </Col>
          </Row>
        )
      }
    </Container>
  );
}
