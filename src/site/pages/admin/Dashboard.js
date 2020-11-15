import React from "react";

import { Container, Row, Col } from "reactstrap";
import StatCard from "../../components/StatCard";
export default function Dashboard() {
  return (
    <>
      <Container fluid={true}>
        <Container className="mt-3">
          <h1 className="display-4">Stats</h1>
          <hr className="my-4" />
          <Row>
            <Col>
              <StatCard
                bg="materialgray"
                textColor="dark"
                className="shadow-1 py-4 px-4 rounded border-0"
                radial
              >
                <div className="rounded-circle bg-primary w-50px h-50px d-flex">
                  <span className="material-icons md-36 m-auto text-white">
                    visibility
                  </span>
                </div>
                <h6 className="mt-1">500</h6>
                <h3>Daily Visits</h3>
              </StatCard>
            </Col>

            <Col>
              <StatCard
                bg="materialgray"
                textColor="dark"
                className="shadow-1 py-4 px-4 rounded border-0"
                radial
              >
                <div className="rounded-circle bg-primary w-50px h-50px d-flex">
                  <span className="material-icons md-36 m-auto text-white">
                    favorite
                  </span>
                </div>
                <h6 className="mt-1">4.5k</h6>
                <h3>Likes</h3>
              </StatCard>
            </Col>

            <Col>
              <StatCard
                bg="materialgray"
                textColor="dark"
                className="shadow-1 py-4 px-4 rounded border-0"
                radial
              >
                <div className="rounded-circle bg-primary w-50px h-50px d-flex">
                  <span className="material-icons md-36 m-auto text-white">
                    group
                  </span>
                </div>
                <h6 className="mt-1">30.6K</h6>
                <h3>Global Visits</h3>
              </StatCard>
            </Col>

            <Col>
              <StatCard
                bg="materialgray"
                textColor="dark"
                className="shadow-1 py-4 px-4 rounded border-0"
                radial
              >
                <div className="rounded-circle bg-primary w-50px h-50px d-flex">
                  <span className="material-icons md-36 m-auto text-white">
                    shopping_cart
                  </span>
                </div>
                <h6 className="mt-1">650</h6>
                <h3>Daily orders</h3>
              </StatCard>
            </Col>
          </Row>

          <h1 className="display-4 mt-4">Charts</h1>
          <hr className="my-4" />
        </Container>
      </Container>
    </>
  );
}
