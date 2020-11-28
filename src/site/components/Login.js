import React from "react";
import { Button, Col, Input, Row } from "reactstrap";
import "./Login.scss";
export default function Login() {
  return (
    <div className="login border-danger shadow-4">
      <div className="user-logo bg-white text-danger">
        <i className="fas fa-user-tie fa-5x"></i>
      </div>
      <div className="content">
        <h2 className="text-center">Login</h2>
        <Row className="mt-4">
          <Col>
            <div className="input-float">
              <label htmlFor="__email" className="label bg-white">
                Email
              </label>
              <Input type="email" placeholder="User Email" id="__email" />
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
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
        <Row className="mt-4">
          <button className="btn bg-gradient-purple rounded-pill mx-auto font-weight-bolder">
            Login
          </button>
        </Row>
      </div>
    </div>
  );
}
