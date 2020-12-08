import React, { useState, use, useEffect } from "react";
import { Row, Col, Container, Input, Alert } from "reactstrap";
import Axios from "axios";
import UserChatRoom from "../../components/UserChatRoomLink";
import { Redirect } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
export default function Inbox() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState({
    valid: false,
    path: "",
    message: "",
  });
  useEffect(() => {
    setTimeout(() => {
      getUsers();
    }, 500);
  }, []);

  const getUsers = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/user/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setRedirect({ valid: true, path: "/404" });
            case 401:
              if (err.response.data.message === "Auth error") {
                setRedirect({
                  valid: true,
                  path: "/login",
                  message: "You must login to continue",
                });
              } else if (err.response.data.message === "Wrong privileges") {
                setRedirect({
                  valid: true,
                  path: "/login",
                  message: "Missing privileges try other account",
                });
              } else if (err.response.data.error) {
                setError(err.response.data.error);
              }
            default:
              if (err.response.data.error) {
                setError(err.response.data.error);
              } else if (err.response.data.message) {
                setError(err.response.data.message);
              }
          }
        } else if (err.request) {
          setError("Error made in request");
        } else {
          setError("Connection Error");
        }
      })
      .finally(() => setLoadingPage(false));
  };
  if (redirect.valid) {
    return (
      <Redirect
        to={{
          pathname: redirect.path,
          state: { message: redirect.message, path: "/admin/inbox" },
        }}
      />
    );
  }
  if (loadingPage) {
    return <LoadingPage />;
  }
  return (
    <>
      <Container className="mt-4">
        <Input type="text" placeholder="Search for users" />
        {error.length > 0 && <Alert color="danger">{error}</Alert>}
        <Row>
          {users.map((user) => (
            <Col key={user.id}>
              <UserChatRoom
                roomId={user.chatRoom}
                userLogo={user.photo}
                username={user.firstName + " " + user.lastName}
                lastMessage={
                  "Last seen " + new Date(user.updatedAt).toLocaleString()
                }
                status={user.status}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
