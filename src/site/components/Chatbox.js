import React, { useState } from "react";
import { Row, Col, Collapse } from "reactstrap";

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [minimise, setMinimise] = useState(true); // minimise chat state false == minimised
  const [closeBox, setCloseBox] = useState(true); // close box or open it false == opened
  const messagesHandler = (e) => {
    e.preventDefault();
    if (message === null || message === undefined || message.length === 0) {
      return null;
    } else {
      setMessages([{ message: message, sender: true }, ...messages]);
      setMessage("");
    }
  };
  const inputHandler = (e) => {
    setMessage(e.target.value);
  };
  const minimiseHandler = () => {
    setMinimise(!minimise);
  };
  const openBoxHandler = () => {
    setCloseBox(true);
    setMinimise(true);
  };
  const closeBoxHandler = () => {
    setCloseBox(false);
    setMinimise(false);
  };

  return (
    <>
      <button
        className="btn btn-fab gradient float-right-bottom"
        onClick={closeBoxHandler}
        style={closeBox ? { display: "block" } : { display: "none" }}
      >
        <i className="fas fa-inbox fa-2x"></i>
      </button>
      <div
        className="chat-box"
        style={closeBox ? { display: "none" } : { display: "block" }}
      >
        <div className="content">
          <div className="header">
            <div className="actions text-right">
              <button className="btn" onClick={minimiseHandler}>
                <i
                  className={
                    "fas " +
                    (minimise ? "fa-window-minimize" : "fa-window-maximize")
                  }
                ></i>
              </button>
              <button className="btn" onClick={openBoxHandler}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <Collapse isOpen={minimise}>
            <div className="messages-container">
              {
                // display this only if there is no messages
                messages.length === 0 ? (
                  <div className="empty-box">
                    <div className="subtitle">New Converstation</div>
                  </div>
                ) : (
                  ""
                )
              }
              <ol className="messages">
                {messages.map((message) => (
                  <span key={Math.random() * 1000}>
                    <li className={message.sender ? "mine" : ""}>
                      {message.message}
                    </li>
                  </span>
                ))}
              </ol>
            </div>
            <div className="footer">
              <hr />
              <Row>
                <Col xs="10">
                  <form onSubmit={messagesHandler}>
                    <input
                      type="text"
                      name="message"
                      value={message}
                      onChange={inputHandler}
                      className="form-control"
                      placeholder="Need help ? ask for it"
                    />
                  </form>
                </Col>
                <Col xs="2">
                  <button className="btn" onClick={messagesHandler}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </Col>
              </Row>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Chatbox;
