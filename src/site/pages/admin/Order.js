import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Input } from "reactstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Row, Col, Modal, ModalBody } from "reactstrap";
import withReactContent from "sweetalert2-react-content";
import errorHandler from "../../functions/errorHandler";
import NoData from "../../components/NoData";
export default function Order(props) {
  let { userId } = useParams();
  const swal = withReactContent(Swal);
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState({});
  const [dateInput, setDateInput] = useState("");
  const getOrder = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/order/" + userId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.valid) {
          setOrders(response.data.data);
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled response",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        const error = errorHandler(err);
        if (error.type === "error") {
          swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        } else if (error.type === "redirect") {
          history.replace({
            pathname: error.path,
            state: { message: error.message, path: "/admin/orders" },
          });
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled error",
            icon: "error",
          });
        }
      })
      .finally(() => setLoading(false));
  };
  const setState = () => {
    setEditLoading(true);
    Axios.put(
      process.env.REACT_APP_API_URL + "/order/" + editOrder.id,
      {
        address: editOrder.address,
        products: editOrder.productid,
        state: dateInput,
        nproducts: editOrder.nproduct,
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
      .then((response) => {
        if (response.data.valid === true) {
          swal.fire("Success", "Time set", "success");
          getOrder();
        } else {
          swal.fire("Error", "Unhandled response", "error");
        }
      })
      .catch((err) => {
        const error = errorHandler(err);
        if (error.type === "error") {
          swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        } else if (error.type === "redirect") {
          history.replace({
            pathname: error.path,
            state: { message: error.message, path: "/admin/orders" },
          });
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled error",
            icon: "error",
          });
        }
      })
      .finally(() => setEditLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getOrder();
  }, [userId]);
  return (
    <div>
      {editModal && (
        <Modal
          size="lg"
          isOpen={editModal}
          toggle={() => setEditModal(!editModal)}
        >
          <ModalBody>
            <ul style={{ listStyle: "none" }}>
              {editOrder.productid.map((product, index) => (
                <li
                  key={product}
                  className="mt-3"
                  style={{ textAlign: "center" }}
                >
                  <Row>
                    <Col> Product ID </Col>
                    <Col> Product Quantity </Col>
                    <Col> Price </Col>
                  </Row>
                  <Row>
                    <Col> {product} </Col>
                    <Col> {editOrder.nproduct[index]} </Col>
                    <Col> {editOrder.price[index]} </Col>
                  </Row>
                </li>
              ))}
              <li className="mt-3">
                <Row>
                  <Col>
                    <Input
                      type="datetime-local"
                      placeholder="Day to recive order"
                      className="w-50"
                      className="mx-auto"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                    />
                    <button
                      className="btn btn-primary mt-3 w-100"
                      onClick={() => setState()}
                    >
                      {editLoading ? <Spinner /> : "Set Date"}
                    </button>
                  </Col>
                </Row>
              </li>
            </ul>
          </ModalBody>
        </Modal>
      )}
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : orders.length <= 0 ? (
        <NoData status="Client has no orders" />
      ) : (
        <ul style={{ listStyle: "none" }}>
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-materialgray my-3"
              style={{
                width: "100%",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                if (!e.target.className.includes("link")) {
                  setEditModal(!editModal);
                  setEditOrder(order);
                  setDateInput(
                    new Date(order.state).toISOString().replace("Z", "")
                  );
                }
              }}
            >
              <Row>
                <Col> ID </Col>
                <Col> Products </Col>
                <Col>Address</Col>
                <Col> Date </Col>
              </Row>
              <Row>
                <Col> {order.id} </Col>
                <Col>
                  <a
                    className="link"
                    target="_blank"
                    href={"/admin/products/" + order.productid[0]}
                    rel="noopener noreferrer"
                  >
                    {order.productid[0]}, ...
                  </a>
                </Col>
                <Col> {order.address} </Col>
                <Col> {new Date(order.state).toLocaleDateString()} </Col>
              </Row>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
