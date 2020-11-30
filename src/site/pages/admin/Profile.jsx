import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "./AdminSidebar.scss";
import AdminSidebar from "./AdminSidebar";
import SidebarContent from "./SidebarContent";
export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { url } = useRouteMatch();
  return (
    <Router>
      <div className="profile">
        <SidebarContent isOpen={sidebarOpen}>
          <div className="sidebar">
            <AdminSidebar isOpen={sidebarOpen} />
          </div>
          <div className="content">
            <div className="sidebar-toggler">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                <i
                  className={
                    sidebarOpen
                      ? "fas fa-chevron-circle-left"
                      : "fas fa-chevron-circle-right"
                  }
                ></i>
              </button>
            </div>
            <Switch>
              <Route path={url + "/password"}></Route>
              <Route path={url + "/"}></Route>
            </Switch>
          </div>
        </SidebarContent>
      </div>
    </Router>
  );
}
