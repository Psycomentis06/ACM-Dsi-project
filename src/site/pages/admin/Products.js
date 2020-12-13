import React from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../../components/Product";
import AddProduct from "../../components/AddProduct";
export default function Product() {
  return (
    <Container className="mt-3">
      <AddProduct />
      <Row>
        <Col md>
          {" "}
          <ProductCard
            productBgColor="rgb(64, 128, 224)"
            path="/admin/products/p1"
            liked={true}
          />
        </Col>
        <Col md>
          {" "}
          <ProductCard path="/admin/products/p2" liked={false} />
        </Col>
      </Row>
    </Container>
  );
}
