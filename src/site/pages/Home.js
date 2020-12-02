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
    </div>
  );
}

export default Home;
