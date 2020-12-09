import React, { useState, useEffect } from "react";
import { Row, Col, Container, Input, Alert, Spinner } from "reactstrap";
import firebase from "../../../firebase.config";
import useInfiniteScroll from "react-infinite-scroll-hook";
//import Axios from "axios";
import UserChatRoom from "../../components/UserChatRoomLink";
import LoadingPage from "../../components/LoadingPage";
//import { Redirect } from "react-router-dom";
//import LoadingPage from "../../components/LoadingPage";
export default function Inbox() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [usernameSearch, setUsernameSearch] = useState("");
  const getRooms = (offset) => {
    setLoading(true);
    setTimeout(() => {
      firebase
        .database()
        .ref("rooms")
        .orderByKey()
        .startAt(offset || "0")
        .limitToFirst(16)
        .on(
          "value",
          (data) => {
            const table = [];
            data.forEach((e) => {
              let value = e.exportVal();
              value.chatRoom = e.key;
              table.push(value);
            });
            if (table.length <= 1) {
              setHasNextPage(false);
            } else {
              setHasNextPage(true);
            }
            delete rooms[rooms.length - 1]; // remove last element cuz it"s first one in the new added list
            setRooms(rooms.concat(table));
            setLoading(false);
          },
          (err) => {
            if (err) {
              setError(err.message);
            }
          }
        );
    }, 500);
  };

  const setRandomRooms = () => {
    for (let i = 0; i < 50; i++) {
      firebase
        .database()
        .ref("rooms")
        .child(Math.floor(Math.random(20) * 10000))
        .set({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          username: Math.floor(Math.random(20) * 10000),
          userId: Math.floor(Math.random(30) * 50000),
        });
    }
  };
  useEffect(() => {
    getRooms();
    setTimeout(() => {
      setLoadingPage(false);
    }, 1000);
    //setRandomRooms();
  }, []);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      getRooms(rooms[rooms.length - 1].chatRoom);
    },
    scrollContainer: "window",
  });
  if (loadingPage) {
    return <LoadingPage />;
  }
  return (
    <Container className="mt-4" style={{ position: "relative" }}>
      <Input
        type="text"
        placeholder="Search for users"
        value={usernameSearch}
        onChange={(e) => {
          setUsernameSearch(e.target.value);
        }}
      />
      {error && <Alert color="danger">{error}</Alert>}
      <Row>
        {rooms.length > 0 &&
          rooms
            .filter((room) => {
              return room.username
                .toString()
                .toLowerCase()
                .includes(usernameSearch);
            })
            .map((user, index) => (
              <Col key={user.chatRoom}>
                <UserChatRoom
                  roomId={user.chatRoom}
                  userLogo={user.photo}
                  username={user.username}
                  lastMessage={"Last seen " + user.lastMessage}
                  status={user.status}
                />
              </Col>
            ))}
        {rooms.length > 0 && <div ref={infiniteRef}></div>}
      </Row>
      {!hasNextPage && (
        <h4 className="text-center text-warning"> "No more users" </h4>
      )}
      {loading && (
        <div
          style={{
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Spinner
            color="primary"
            style={{
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
          />
        </div>
      )}
    </Container>
  );

  /*const [users, setUsers] = useState([]);
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
  );*/
}
