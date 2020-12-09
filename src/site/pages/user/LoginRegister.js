import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import "./LoginRegister.scss";
export default function LoginRegister() {
  const [registerView, setRegisterView] = useState(false); // true = show signup component
  const location = useLocation();
  const registerText = `If you already registred and you have a verified account you don't have to
  create another one just login with your cridentials or if you have a problem contuct us`;
  const loginText = `Welcome! If you are a new user click the register button bellow so you can create
  and account in less than 30 seconds and try our service`;
  return (
    <>
      <div className="login-register-container">
        <div className="login-register">
          <div className={registerView ? "login-row reverse" : "login-row"}>
            <div className="col1">
              <div style={{ height: "100%" }}>
                <CSSTransition
                  in={registerView}
                  timeout={800}
                  classNames="col1-animation"
                >
                  {registerView ? (
                    <Signup />
                  ) : (
                    <Login locationState={location.state} />
                  )}
                </CSSTransition>
              </div>
            </div>
            <CSSTransition
              in={registerView}
              timeout={800}
              classNames="col2-animation"
            >
              <div className="col2 shadow-3 bg-gradient-purple-90">
                <div className="content">
                  <Link
                    to="/"
                    className="btn my-3 bg-gradient-purple-45 rounded-circle shadow-3"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </Link>
                  <h3 className={registerView ? "text-right" : "text-left"}>
                    {registerView ? "Login" : "Register"}
                  </h3>
                  <p
                    className={
                      registerView ? "h6 text-right" : "h6 text-justify"
                    }
                  >
                    {registerView ? loginText : registerText}
                  </p>
                  <div>
                    {registerView ? (
                      <button
                        style={{ float: "right" }}
                        className="text-primary my-3 btn bg-gradient font-weight-bolder p-2"
                        onClick={() => setRegisterView(false)}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="text-primary my-3 btn bg-gradient font-weight-bolder p-2"
                        onClick={() => setRegisterView(true)}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </>
  );
}
