import React from "react";
import "./AdminSidebar.scss";
import AdminSidebar from "./AdminSidebar";
export default function Profile() {
  return (
    <div className="profile">
      <AdminSidebar isOpen={true} />
    </div>
  );
}
