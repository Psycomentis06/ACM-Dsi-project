import React from "react";
import { Container, Row, Col } from "reactstrap";
export default function Orders() {
  return (
    <Container>
      <Row>
        <Col sm="4">
          <h3>Users</h3>
          <hr />
          <ul>
            <li>user1</li>
            <li>user2</li>
            <li>user3</li>
            <li>user4</li>
          </ul>
        </Col>
        <Col>
          <h3>Orders</h3>
          <hr />
          <ul>
            <li>o1</li>
            <li>o2</li>
            <li>o3</li>
            <li>o4</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
