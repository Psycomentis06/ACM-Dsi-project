import React from "react";

import AdminNavbar from "./AdminNavbar";
//import UserChatRoomLink from "../../components/UserChatRoomLink";
import Chat from "../../components/Chat";
export default function Admin() {
  return (
    <>
      <AdminNavbar />
      <Chat />
      {/*
      <UserChatRoomLink />
      <UserChatRoomLink />
      <UserChatRoomLink />
      <UserChatRoomLink />
      <UserChatRoomLink />
        */}
    </>
  );
}
