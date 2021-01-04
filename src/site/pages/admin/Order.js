import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import errorHandler from "../../functions/errorHandler";
import NoData from "../../components/NoData";
import { updateLabel } from "typescript";
export default function Order(props) {
  let { userId } = useParams();
  const swal = withReactContent(Swal);
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    setLoading(true);
    getOrder();
  }, [userId]);
  return (
    <div>
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
        <ul>
          {orders.map((order) => (
            <li>{order.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
