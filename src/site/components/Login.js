import React, { useState } from "react";
import { Form, Col, Input, Row, FormFeedback, Button, Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Axios from "axios";
import "./Login.scss";
export default function Login({ locationState }) {
  const history = useHistory();
  // form hook
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => login(data);
  // password toggle
  const [passwordType, setPasswordType] = useState(true); // true = password is set to type="password"
  // loading state
  const [loading, setLoading] = useState(false);
  // error state
  const [reqError, setReqError] = useState("");
  // login request
  const login = (data) => {
    setLoading(true);
    Axios.post(process.env.REACT_APP_API_URL + "/user/authenticate", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.data.valid) {
          // valid response
          // 1st we save the token
          localStorage.setItem("token", response.data.token);
          // 2nd set userData
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          // we redirect for last route
          history.push(locationState?.path || "/"); // if user redirected take him to last path otherwise go to home
        } else {
          setReqError("Unhandled response please try again");
        }
      })
      .catch((err) => {
        if (err.response) {
          setReqError(err.response.data.message);
        } else if (err.request) {
          setReqError("Error made in request try again");
        } else {
          console.log(err);
          setReqError("Connection error");
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="login border-danger shadow-4 bg-white">
      <div className="user-logo bg-white text-danger">
        <i className="fas fa-user-tie fa-5x"></i>
      </div>
      <div className="content">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center"> Login</h1>
          {reqError?.length > 0 ? (
            <Alert color="danger">{reqError} </Alert>
          ) : null}
          {locationState !== undefined ? (
            <Alert color="danger">{locationState.message}</Alert>
          ) : null}
          <Row className="mt-4">
            <Col>
              <Controller
                name="email"
                defaultValue={false}
                control={control}
                rules={{ required: true }}
                render={(props) => (
                  <div className="input-float">
                    <label htmlFor="__email" className="label bg-white">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="User Email"
                      id="__email"
                      onChange={(e) => props.onChange(e.target.value)}
                      autoComplete="off"
                      invalid={errors.email ? true : false}
                    />
                    {errors.email && (
                      <FormFeedback invalid>Email is required</FormFeedback>
                    )}
                  </div>
                )}
              ></Controller>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Controller
                name="password"
                control={control}
                defaultValue={false}
                rules={{ required: true, maxLength: 16, minLength: 8 }}
                render={(props) => (
                  <div className="input-float">
                    <label htmlFor="__password" className="label bg-white">
                      Password
                    </label>
                    <Input
                      type={passwordType ? "password" : "text"}
                      placeholder="User password"
                      id="__password"
                      invalid={errors.password ? true : false}
                      onChange={(e) => props.onChange(e.target.value)}
                    />
                    <Button
                      type="button"
                      className="pass-btn"
                      onClick={() => {
                        setPasswordType(!passwordType);
                      }}
                    >
                      <i
                        className={
                          "fas " + (passwordType ? "fa-eye" : "fa-eye-slash")
                        }
                      ></i>
                    </Button>
                    {errors.password?.type === "required" && (
                      <FormFeedback invalid>Password is required</FormFeedback>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <FormFeedback invalid>
                        Password max length is 16{" "}
                      </FormFeedback>
                    )}
                    {errors.password?.type === "minLength" && (
                      <FormFeedback invalid>
                        Password min length is 8{" "}
                      </FormFeedback>
                    )}
                  </div>
                )}
              ></Controller>
            </Col>
          </Row>
          <Row className="mt-4">
            {loading ? (
              <button
                className="btn bg-gradient-purple shadow-2 w-25 rounded-pill mx-auto font-weight-bolder"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Loading...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-gradient-purple shadow-2 w-25 rounded-pill mx-auto font-weight-bolder"
              >
                Login
              </button>
            )}
          </Row>
        </Form>
      </div>
    </div>
  );
}
