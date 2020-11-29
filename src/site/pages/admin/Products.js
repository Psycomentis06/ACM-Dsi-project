import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
export default function Product() {
  return (
    <Container className="mt-3">
      <Row>
        <Col md>
          {" "}
          <Link to="/admin/products/p1">Product1</Link>
        </Col>
        <Col md>
          {" "}
          <Link to="/admin/products/p2">Product2</Link>
        </Col>
        <Col md>
          {" "}
          <Link to="/admin/products/p3">Product3</Link>
        </Col>
        <Col md>
          {" "}
          <Link to="/admin/products/p4">Product4</Link>
        </Col>
        <Col md>
          {" "}
          <Link to="/admin/products/p5">Product5</Link>
        </Col>
        <Col md>
          {" "}
          <Link to="/admin/products/p6">Product6</Link>
        </Col>
      </Row>
    </Container>
  );
}
