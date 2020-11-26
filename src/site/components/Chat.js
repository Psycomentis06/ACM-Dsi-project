import React, { useState, useRef } from "react";
import {
  Container,
  Jumbotron,
  Input,
  InputGroup,
  Button,
  Tooltip,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import firebase from "../../firebase.config";
import { useList } from "react-firebase-hooks/database";
import "./Chat.scss";
export default () => {
  let { id } = useParams();
  const [firebaseMessages, loading, error] = useList(
    firebase
      .database()
      .ref("/rooms/" + id)
      .limitToLast(25)
  );
  const [backToolTip, setBackToolTip] = useState(false);
  const [message, setMessage] = useState("");
  const [sendMsgError, setSendMsgError] = useState("");
  const endLine = useRef(null);
  const backToolTipHandler = () => {
    setBackToolTip(!backToolTip);
  };
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const scrollBottom = () => {
    endLine.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const sendMessage = () => {
    if (message.length > 0) {
      firebase
        .database()
        .ref("/rooms/" + id)
        .push(
          {
            message: message,
            sender: "user1",
            date: Date.now(),
          },
          (err) => {
            if (err) {
              // error happend
              setSendMsgError(err);
            }
          }
        );
      setMessage("");
      scrollBottom();
    }
  };
  return (
    <Container fluid={false}>
      <Jumbotron className="mt-2">
        <div className="back-arrow">
          <Link to="/admin/inbox" id="backToInbox">
            <i className="fas fa-long-arrow-alt-left fa-5x"></i>
          </Link>
          <Tooltip
            placement="top"
            isOpen={backToolTip}
            target="backToInbox"
            toggle={backToolTipHandler}
          >
            Go back To Inbox page
          </Tooltip>
        </div>
        <h2 className="mt-3">Username</h2>
        <h3>Room id : {id}</h3>
        <hr />
        <Container>
          <div className="messages">
            {error && <strong>Error: {error}</strong>}
            {loading && <span>List: Loading...</span>}
            {!loading && scrollBottom()}
            {!loading && firebaseMessages.length === 0 && (
              <h2 className="text-center text-success">
                Conversation is empty
              </h2>
            )}
            {firebaseMessages.map((el) => (
              <div
                className={
                  "line " +
                  (el.val().sender === localStorage.getItem("userId")
                    ? "mine"
                    : "")
                }
                key={el.key}
              >
                {el.val().message}
              </div>
            ))}
            <div ref={endLine} style={{ float: "left", clear: "both" }}></div>
          </div>
          <hr className="my-3" />
          {sendMsgError.length > 0 ? (
            <h5 className="text-danger">
              <strong>Error while sending message:</strong>
              &nbsp;{sendMsgError}
            </h5>
          ) : (
            ""
          )}
          <InputGroup>
            <Input
              placeholder="Send text to the user"
              onChange={messageHandler}
              value={message}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button color="primary" onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </Button>
          </InputGroup>
        </Container>
      </Jumbotron>
    </Container>
  );
};
