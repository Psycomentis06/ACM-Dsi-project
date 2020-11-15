import React from "react";
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Chat.scss";
export default (props) => {
  return (
    <Container fluid={false}>
      <Jumbotron className="mt-2">
        <div className="back-arrow">
          <Link to="/admin/inbox">Back</Link>
        </div>
        <h2 className="mt-3">Username</h2>
        <hr />
        <Container>
          <ul className="messages">
            <li>Hello</li>
            <li className="mine">Hello</li>
            <li>Hello</li>
            <li className="mine">Hello</li>
            <li>Hello</li>
            <li className="mine">Hello</li>
            <li>Hello</li>
            <li>Hello</li>
          </ul>
          <hr className="my-3" />
          <InputGroup>
            <Input placeholder="Send text to the user" />
            <Button>Send</Button>
          </InputGroup>
        </Container>
      </Jumbotron>
    </Container>
  );
};
