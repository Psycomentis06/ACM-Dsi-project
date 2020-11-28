import React, { useState } from "react";
import { Form, Col, Input, Row, FormFeedback, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import "./Login.scss";
export default function Login() {
  // form hook
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  // password toggle
  const [passwordType, setPasswordType] = useState(true); // true = password is set to type="password"
  return (
    <div className="login border-danger shadow-4">
      <div className="user-logo bg-white text-danger">
        <i className="fas fa-user-tie fa-5x"></i>
      </div>
      <div className="content">
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <button
              type="submit"
              className="btn bg-gradient-purple shadow-2 w-25 rounded-pill mx-auto font-weight-bolder"
            >
              Login
            </button>
          </Row>
        </Form>
      </div>
    </div>
  );
}
