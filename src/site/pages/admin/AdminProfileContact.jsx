import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import errorHandler from "../../functions/errorHandler";
import excerpt from "../../functions/excerpt";
export default function AdminProfileNotification() {
  const swal = withReactContent(Swal);
  const history = useHistory();
  const [contacts, setContacts] = useState([]);
  const [modal, setModal] = useState(false);
  const [contact, setContact] = useState({});
  const getContact = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/contact/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.valid) {
          setContacts(response.data.data);
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
      });
  };
  useEffect(() => getContact(), []);
  return (
    <div
      className="bg-materialgray"
      style={{
        width: "100%",
        height: "calc(100vh - 90px)",
        padding: "20px",
        overflowY: "scroll",
      }}
    >
      {modal && (
        <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            {" "}
            <a href={"mailto:" + contact.email}> {contact.email} </a>{" "}
          </ModalHeader>
          <ModalBody>
            <h3 className="text-center text-info"> {contact.name} </h3>
            <p className="h4 text-justify mt-3"> {contact.description} </p>
            <div
              className="mt-4"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p> Phone: {contact.phoneNumber}</p>
              <p style={{ opacity: 0.8 }}>
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>
          </ModalBody>
        </Modal>
      )}
      <ul style={{ listStyle: "none", marginTop: "30px" }}>
        {contacts.map((contact) => (
          <li
            className="shadow-1"
            style={{
              width: "90%",
              margin: "10px auto",
              padding: "10px",
              backgroundColor: "whitesmoke",
            }}
            key={contact.id}
            onClick={() => {
              setModal(!modal);
              setContact(contact);
            }}
          >
            <Row>
              <Col>ID</Col>
              <Col>Sender</Col>
              <Col>Téléphone</Col>
              <Col>Content</Col>
            </Row>
            <Row>
              <Col> {contact.id} </Col>
              <Col> {contact.name} </Col>
              <Col> {contact.phoneNumber} </Col>
              <Col> {excerpt(contact.description, 10)} </Col>
            </Row>
          </li>
        ))}
      </ul>
    </div>
  );
}
