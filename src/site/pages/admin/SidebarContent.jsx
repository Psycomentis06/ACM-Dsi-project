import React from "react";
import "./SidebarContent.scss";
export default function SidebarContent(props) {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div className={"sidebar-content " + (!props.isOpen ? "is-active" : "")}>
        {props.children}
      </div>
    </div>
  );
}
