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
import AdminProfileNotification from "./AdminProfileNotification";
import AdminProfilePassword from "./AdminProfilePassword";
import AdminProfileSettings from "./AdminProfileSettings";
export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { path, url } = useRouteMatch();
  return (
    <Router>
      <div className="profile">
        <SidebarContent isOpen={sidebarOpen}>
          <div className="sidebar">
            <AdminSidebar isOpen={sidebarOpen} url={url} />
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
              <Route exact path={path + "/password"}>
                <AdminProfilePassword />
              </Route>
              <Route exact path={path + "/notification"}>
                <AdminProfileNotification />
              </Route>
              <Route exact path={path + "/settings"}>
                <AdminProfileSettings />
              </Route>
              <Route exact path={path + "/"}>
                {
                  // Profile content here
                  <h1>Profile home page</h1>
                }
              </Route>
            </Switch>
          </div>
        </SidebarContent>
      </div>
    </Router>
  );
}
