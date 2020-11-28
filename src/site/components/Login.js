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
            <div className="input-float">
              <label htmlFor="__email" className="label bg-white">
                Email
              </label>
              <Input type="email" placeholder="User Email" id="__email" />
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="input-float">
              <label htmlFor="__password" className="label bg-white">
                Password
              </label>
              <Input
                type="password"
                placeholder="User password"
                id="__password"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
