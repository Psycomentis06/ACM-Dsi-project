import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import errorHandler from "../../functions/errorHandler";
import Order from "./Order";
import "./Orders.scss";
export default function Orders() {
  let { path, url } = useRouteMatch();
  const swal = withReactContent(Swal);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsers = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/user/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.valid) {
          setUsers(response.data.users);
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled response",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        const error = errorHandler(err);
        if (error.type === "error") {
          swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        } else if (error.type === "redirect") {
          history.replace({
            pathname: error.path,
            state: { message: error.message, path: "/admin/orders" },
          });
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled error",
            icon: "error",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Container className="mt-3 orders-page">
        <Row>
          <Col sm="4">
            <h3>Users</h3>
            <hr />
            <div className="orders-items">
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner />
                </div>
              ) : (
                users.map((user) => (
                  <NavLink
                    key={user.id}
                    to={url + "/" + user.id}
                    className="orders-item"
                    activeClassName="active"
                  >
                    {user.firstName + " " + user.lastName}
                    <div className="last-time">
                      Last order : {new Date(user.updatedAt).toLocaleString()}
                    </div>
                  </NavLink>
                ))
              )}
            </div>
          </Col>
          <Col>
            <h3>Orders</h3>
            <hr />
            <Switch>
              <Route exact path={path + "/:userId"}>
                <Order />
              </Route>
              <Route path={path}>
                <Order userId="user1" /> {/* Display first user orders */}
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
