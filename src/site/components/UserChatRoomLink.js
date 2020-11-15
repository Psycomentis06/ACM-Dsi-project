import React from "react";
import UserLogo from "../../assets/images/avatar.svg";
import "./UserChatRoom.scss";

export default function UserChatRoomLink(props) {
  return (
    <>
      <div className={"user-chat-room " + (props.bgColor ? props.bgColor : "")}>
        <div className="avatar shadow-3">
          <img
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
