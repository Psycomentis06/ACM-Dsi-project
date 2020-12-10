import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import "./Product.scss";
export default function Product() {
  let { productId } = useParams();
  return (
    <Container className="mt-3">
      <div className="product-view">
        <div className="left">
          <img
            className="shadow-2"
            src="https://images.unsplash.com/photo-1556912743-54b370e8385b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="Product image preview"
          />
        </div>
        <div className="right">
          <p className="h6" style={{ opacity: 0.6 }}>
            Category
          </p>
          <h2 className="text-wrap text-primary">Product name</h2>
          <p
            className="h5 text-justify text-secondary-1"
            style={{ opacity: 0.7 }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Doloremque, modi, cumque illo optio tenetur alias aliquam porro
            dolorum explicabo vel aspernatur omnis ex reiciendis nemo maiores
            asperiores perferendis? Eaque, velit.
          </p>
          <hr />
          <h4 className="text-secondary" style={{ opacity: 0.9 }}>
            Sale: 10%
          </h4>
          <h5 style={{ color: "#54f1fa" }}>Product color: #54f1fa</h5>
          <h3 className="text-center text-secondary">Price: 25 TND</h3>
        </div>
      </div>
    </Container>
  );
}
