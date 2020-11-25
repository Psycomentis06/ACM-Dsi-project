import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Chat from "../../components/Chat";
import UserChatRoom from "../../components/UserChatRoomLink";

export default function Inbox(props) {
  return (
    <>
      <Router>
        <UserChatRoom roomId="user152" />
      </Router>
    </>
  );
}
