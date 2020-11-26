import React from "react";
import { Row, Col } from "reactstrap";
import "./UserCard.scss";
export default function UserCard(props) {
  return (
    <div className="user-card shadow-1">
      <div className="header">
        <div className="img">
          <img src={props.imgSrc} alt={props.imgAlt} />
        </div>
        <div className="meta text-center">
          <div className="username">{props.username}</div>
          <div className="email">{props.email}</div>
        </div>
      </div>
      <div className="body">
        <p>{props.bio}</p>
      </div>
      <div className="footer">
        <Row className="text-center">
          <Col>
            <h5>Reviews</h5>
            <h2>{props.reviews}</h2>
          </Col>
          <Col>
            <h5>Orders</h5>
            <h2>{props.orders}</h2>
          </Col>
          <Col>
            <h5>Products</h5>
            <h2>{props.products}</h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}
