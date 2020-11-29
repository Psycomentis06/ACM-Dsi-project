import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Order from "./Order";
import UserListItem from "../../components/UserListItem";
export default function Orders() {
  let { path, url } = useRouteMatch();
  return (
    <Router>
      <Container className="mt-3">
        <Row>
          <Col sm="4">
            <h3>Users</h3>
            <hr />
            <Link to={url + "/user1"}>User1</Link>
            <Link to={url + "/user2"}>User2</Link>
            <Link to={url + "/user3"}>User3</Link>
            <Link to={url + "/user4"}>User4</Link>
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
