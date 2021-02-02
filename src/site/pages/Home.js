import React, { useRef } from "react";
import Chatbox from "../components/Chatbox";
import FAQCasourel from "../components/FAQCasourel";
function Home() {
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  const learnMoreRef = useRef();
  return (
    <div className="container-fluid">
      {currentUser ? <Chatbox /> : null}

      <div style={{ height: "calc(100vh - 50px)" }}>
        <div
          className="container-fluid bg-gradient-primary-45 shadow-4"
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: "110%, 150%",
            borderBottomLeftRadius: "20%",
            borderBottomRightRadius: "20%",
          }}
        >
          <div className="container-sm">
            <div className="jumbotron shadow-2">
              <div
                className="bg-gradient-primary-180"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <h1 className="text-center text-secondary-2">
                  ACM Admin panel
                </h1>
              </div>
              <p
                className="text-dark text-center mt-4 px-3"
                style={{ fontSize: "15pt" }}
              >
                Hello there welcome to ACM admin panel where you can controll
                and monitor everything happening on ACM platform.
              </p>
              <div className="text-center mt-4">
                <button
                  className="btn bg-gradient-purple-45 shadow-3 mx-auto"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                  onClick={() =>
                    learnMoreRef.current.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn more
                  <span className="material-icons">keyboard_arrow_down</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section style={{ marginTop: "50px" }} ref={learnMoreRef}>
        <div style={{ position: "absolute", zIndex: -1 }}>
          <svg height="300" width="300">
            <circle cx="50" cy="50" r="300" fill="#9f5afd" />
            <circle cx="1300" cy="250" r="250" fill="#963694" />
          </svg>
        </div>
        <div className="container">
          <div className="jumbotron shadow-3">
            <FAQCasourel />
          </div>
        </div>
      </section>
      <section style={{ marginTop: "200px", paddingBottom: "200px" }}>
        <div style={{ position: "absolute", zIndex: -1 }}>
          <svg height="300" width="300">
            <circle cx="1400" cy="0" r="158" fill="#bf55ec" />
            <circle cx="150" cy="100" r="250" fill="#9f5afd" />
            <circle cx="650" cy="50" r="140" fill="#963694" />
            <circle cx="800" cy="0" r="100" fill="#8c14fc" />
            <circle cx="1000" cy="250" r="200" fill="#a29bfe" />
          </svg>
        </div>
        <div className="container">
          <div className="jumbotron shadow-3">
            <div
              className="bg-gradient-peach-90"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <h1 className="text-center">What ACM Panel offers ?!</h1>
            </div>
            <div className="row">
              <div className="col">
                <h4 className="text-center my-4">
                  With ACM panel you can manage everything on the ACM platform
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col mt-4 p-4 bg-primary text-white shadow-1 m-2">
                <div className="row text-center">
                  <div className="col-12">
                    <span className="material-icons fa-4x">bar_chart</span>
                  </div>
                  <div className="col">
                    <h5> Analytics </h5>
                  </div>
                </div>
              </div>

              <div className="col mt-4 p-4 bg-primary text-white shadow-1 m-2">
                <div className="row text-center">
                  <div className="col-12">
                    <i className="fas fa-users fa-4x"></i>
                  </div>
                  <div className="col">
                    <h5> Users managment </h5>
                  </div>
                </div>
              </div>

              <div className="col mt-4 p-4 bg-primary text-white shadow-1 m-2">
                <div className="row text-center">
                  <div className="col-12">
                    <span className="material-icons fa-4x">
                      production_quantity_limits
                    </span>
                  </div>
                  <div className="col">
                    <h5> Products managment </h5>
                  </div>
                </div>
              </div>

              <div className="col mt-4 p-4 bg-primary text-white shadow-1 m-2">
                <div className="row text-center">
                  <div className="col-12">
                    <span className="material-icons fa-4x">local_shipping</span>
                  </div>
                  <div className="col">
                    <h5> Orders managment </h5>
                  </div>
                </div>
              </div>

              <div className="col mt-4 p-4 bg-primary text-white shadow-1 m-2">
                <div className="row text-center">
                  <div className="col-12">
                    <span className="material-icons fa-4x">chat</span>
                  </div>
                  <div className="col">
                    <h5> Real time chat with clients </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
