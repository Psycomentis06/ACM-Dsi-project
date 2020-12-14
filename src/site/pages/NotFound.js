import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./NotFound.scss";
function NotFound() {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className="not-found bg-materialgray">
      <div>
        <div className="_404 bg-gradient-primary">404</div>
        <div className="text">
          <p className="h3">
            {location.state?.message || "Page you are looking for is not found"}
          </p>
        </div>
        <button
          style={{
            transform: "translateY(-90px)",
            backgroundSize: "120%, 110%",
          }}
          className="btn bg-gradient-primary-90 py-2 px-5"
          onClick={() => history.push("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
