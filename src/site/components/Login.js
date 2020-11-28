import React from "react";
import { Col, Input, Row } from "reactstrap";
export default function Login() {
  return (
    <div className="login">
      <div className="user-logo">
        <i class="fas fa-user-tie fa-5x"></i>
      </div>
      <div className="content">
        <Row>
          <Col>
            <Input type="email" placeholder="User Email" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="password" placeholder="User password" />
          </Col>
        </Row>
      </div>
    </div>
  );
}
