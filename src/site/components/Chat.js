import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Jumbotron,
  Input,
  InputGroup,
  Button,
  Tooltip,
} from "reactstrap";
import { Link, useParams, Redirect } from "react-router-dom";
import firebase from "../../firebase.config";
import "./Chat.scss";
export default () => {
  let { id } = useParams();
  const [firebaseMessages, setFirebaseMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [backToolTip, setBackToolTip] = useState(false);
  const [message, setMessage] = useState("");
  const [sendMsgError, setSendMsgError] = useState("");
  const [redirect, setRedirect] = useState({
    valid: false,
    message: "",
    path: "",
  });
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
      const fireRef = firebase
        .database()
        .ref("rooms")
        .child(id + "/messages");
      fireRef.push(
        {
          message: message,
          sender: JSON.parse(localStorage.getItem("userData")).id,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        },
        (err) => {
          if (err) {
            // error happend
            setSendMsgError(err);
          } else {
            fireRef.parent.update({
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              adminMessages: firebaseMessages.adminMessages + 1,
            });
          }
        }
      );
      setMessage("");
      scrollBottom();
    }
  };

  // get messages
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      firebase
        .database()
        .ref("rooms/" + id)
        .on(
          "value",
          (data) => {
            if (data.exists()) {
              // valid room
              let exportedData = data.exportVal();
              let messages = exportedData.messages;
              let arrayMsgs = [];
              for (const msg in messages) {
                messages[msg].id = msg;
                arrayMsgs.push(messages[msg]);
              }
              exportedData.messages = arrayMsgs;
              setFirebaseMessages(exportedData);
            } else {
              setRedirect({
                valid: true,
                message: "Can't find room with id: " + id,
                path: "/404",
              });
            }
            setLoading(false);
          },
          (err) => {
            if (err) {
              setError(err.message);
            }
          }
        );

      firebase
        .database()
        .ref("rooms/" + id)
        .update({ userMessages: 0 });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (redirect.valid) {
    return (
      <Redirect
        to={{
          pathname: redirect.path,
          state: { message: redirect.message, path: "/admin/inbox/" + id },
        }}
      />
    );
  }
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
        <h2 className="mt-3">
          <Link to={"/admin/users/" + firebaseMessages.userId || ""}>
            {firebaseMessages.username || "Username"}
          </Link>
        </h2>
        <h3>Room id : {id}</h3>
        <hr />
        <Container>
          <div className="messages">
            {error && <strong>Error: {error}</strong>}
            {loading && <span>List: Loading...</span>}
            {/*!loading && scrollBottom()*/}
            {!loading &&
              (firebaseMessages?.messages?.length === 0 ||
                firebaseMessages.messages === undefined) && (
                <h2 className="text-center text-success">
                  {"New Conversation Say hi to " + firebaseMessages.username}
                </h2>
              )}
            {firebaseMessages?.messages?.map((el) => (
              <div
                className={
                  "line " +
                  (el.sender === JSON.parse(localStorage.getItem("userData")).id
                    ? "mine"
                    : "")
                }
                key={el.id}
              >
                {el.message}
                <span className="message-date">
                  {new Date(el.createdAt).toLocaleString()}
                </span>
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
