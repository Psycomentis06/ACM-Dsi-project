import React from "react";

import { Container, Row, Col } from "reactstrap";
import { Line } from "react-chartjs-2";
import StatCard from "../../components/StatCard";
export default function Dashboard() {
  return (
    <>
      <Container fluid={true}>
        <Container className="mt-3">
          <h1 className="display-4">Stats</h1>
          <hr className="my-4" />
          <Row>
            <Col md className="mb-md-5">
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

            <Col md className="mb-md-5">
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

            <Col md className="mb-md-5">
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

            <Col md className="mb-md-5">
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
          <Row>
            <Col lg="6">
              <Line
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "Monthly Users login",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: "butt",
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [65, 59, 80, 81, 56, 55, 40],
                    },
                  ],
                }}
              />
            </Col>
            <Col lg="6">
              <Line
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "Monthly ordered products",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: "butt",
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(75,100,100,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [140, 14, 54, 142, 48, 88, 67],
                    },
                  ],
                }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
