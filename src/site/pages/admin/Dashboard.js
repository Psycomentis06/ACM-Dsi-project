import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Line } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import errorHandler from "../../functions/errorHandler";
import StatCard from "../../components/StatCard";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chart, setChart] = useState({ charOne: [], chartTwo: [] });
  const [stats, setStats] = useState({
    likes: 0,
    usersMonthly: 0,
    usersDaily: 0,
    orders: 0,
  });
  const getHistoryByMonth = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/history/month", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.valid === true) {
          let monthlyUsers = 0;
          response.data.data.map((item) => {
            if (
              new Date(item.day).toDateString() === new Date().toDateString()
            ) {
              // today
              setStats((prevState) => ({
                ...prevState,
                likes: item.likedProducts,
                orders: item.orders,
                usersDaily: item.loggedUsers,
              }));
            }
            monthlyUsers += item.loggedUsers;
          });
          setStats((prevState) => ({
            ...prevState,
            usersMonthly: monthlyUsers,
          }));
        } else {
          setError("Unhandled response");
        }
      })
      .catch((err) => {
        const error = errorHandler(err);
        if (error.type === "error") {
          setError(error.message);
        } else {
          return (
            <Redirect
              to={{
                pathname: error.path,
                state: { path: "/admin", message: error.message },
              }}
            />
          );
        }
      });
  };
  useEffect(() => getHistoryByMonth(), []);
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
                <h6 className="mt-1"> {stats.usersDaily} </h6>
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
                <h6 className="mt-1"> {stats.likes} </h6>
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
                <h6 className="mt-1"> {stats.usersMonthly} </h6>
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
                <h6 className="mt-1"> {stats.orders} </h6>
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
