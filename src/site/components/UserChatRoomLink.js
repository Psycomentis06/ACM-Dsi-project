import React from "react";
import { useHistory } from "react-router-dom";
import UserLogo from "../../assets/images/avatar.svg";
import "./UserChatRoom.scss";

export default function UserChatRoomLink(props) {
  let history = useHistory();
  const handleOnClick = () => history.push("/admin/inbox/" + props.roomId);

  return (
    <>
      <div
        className={"user-chat-room " + (props.bgColor ? props.bgColor : "")}
        onClick={handleOnClick}
      >
        <div className="avatar">
          <img
            className="shadow-3"
            src={props.userLogo ? props.userLogo : UserLogo}
            alt="user img"
          />
        </div>
        <div className={"data " + (props.textColor ? props.textColor : "")}>
          <div className={"username " + (props.status ? props.status : "")}>
            {props.username ? props.username : "Username"}
          </div>
          <div className="last-message">
            {props.lastMessage ? props.lastMessage : "New Chat"}
          </div>
        </div>
      </div>
    </>
  );
}
