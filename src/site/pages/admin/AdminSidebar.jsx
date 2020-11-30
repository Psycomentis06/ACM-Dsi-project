import React from "react";
export default function AdminSidebar(props) {
  return (
    <div
      className={
        "side-bar bg-gradient " +
        (props.isOpen ? "open-sidebar" : "close-sidebar")
      }
    >
      <ul>
        <li className="text-shadow">Profile</li>
        <li className="text-shadow">Password</li>
        <li className="text-shadow">Account</li>
      </ul>
    </div>
  );
}
