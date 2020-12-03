import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const alert = withReactContent(Swal);
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => alert.fire("Hello there", "simple text", "success")}
      >
        Open
      </button>
      <div className="alert-float-container">
        <div className="alert alert-danger top left slide-left">
          Alert top left
        </div>
        <div className="alert alert-danger top right slide-right">
          Alert top right
        </div>
        <div className="alert alert-danger bottom left slide-left">
          Alert bottom left
        </div>
        <div className="alert alert-danger bottom right slide-right">
          Alert bottom right
        </div>
      </div>
    </div>
  );
}

export default Home;
