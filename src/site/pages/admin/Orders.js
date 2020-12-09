import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Order from "./Order";
import "./Orders.scss";
export default function Orders() {
  let { path, url } = useRouteMatch();
  return (
    <Router>
      <Container className="mt-3 orders-page">
        <Row>
          <Col sm="4">
            <h3>Users</h3>
            <hr />
            <div className="orders-items">
              <NavLink
                to={url + "/user1"}
                className="orders-item"
                activeClassName="active"
              >
                User1
                <div className="last-time">Last order : 11/30/2020</div>
              </NavLink>
              <NavLink
                to={url + "/user2"}
                className="orders-item"
                activeClassName="active"
              >
                User2
              </NavLink>
              <NavLink
                to={url + "/user3"}
                className="orders-item"
                activeClassName="active"
              >
                User3
              </NavLink>
              <NavLink
                to={url + "/user4"}
                className="orders-item"
                activeClassName="active"
              >
                User4
              </NavLink>
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
