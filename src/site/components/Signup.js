import React from "react";
import { Row, Col, Form, Input, FormGroup, FormFeedback } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import "./Signup.scss";
export default function Signup() {
  // form validation
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="signup border-danger shadow-4 bg-white">
        <h1 className="text-center">Register</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Controller
                name="firstName"
                defaultValue={false}
                rules={{ required: true, minLength: 3, maxLength: 15 }}
                control={control}
                render={(props) => (
                  <FormGroup>
                    <label htmlFor="__firstName">First Name</label>
                    <Input
                      className="pill"
                      id="__firstName"
                      placeholder="Your first name"
                      onChange={(e) => props.onChange(e.target.value)}
                      invalid={errors.firstName ? true : false}
                    />
                    {errors.firstName?.type === "required" && (
                      <FormFeedback invalid>
                        First name is required
                      </FormFeedback>
                    )}
                    {errors.firstName?.type === "maxLength" && (
                      <FormFeedback invalid>
                        First name length greater than 15
                      </FormFeedback>
                    )}
                    {errors.firstName?.type === "minLength" && (
                      <FormFeedback invalid>
                        First name length lower than 3
                      </FormFeedback>
                    )}
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Controller
                name="lastName"
                defaultValue={false}
                rules={{ required: true, minLength: 3, maxLength: 15 }}
                control={control}
                render={(props) => (
                  <FormGroup>
                    <label htmlFor="__lastName">Last Name</label>
                    <Input
                      className="pill"
                      id="__lastName"
                      placeholder="Your last name"
                      onChange={(e) => props.onChange(e.target.value)}
                      invalid={errors.lastName ? true : false}
                    />
                    {errors.lastName?.type === "required" && (
                      <FormFeedback invalid>Last name is required</FormFeedback>
                    )}
                    {errors.lastName?.type === "maxLength" && (
                      <FormFeedback invalid>
                        Last name length greater than 15
                      </FormFeedback>
                    )}
                    {errors.lastName?.type === "minLength" && (
                      <FormFeedback invalid>
                        Last name length lower than 3
                      </FormFeedback>
                    )}
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Controller
                name="email"
                defaultValue={false}
                rules={{ required: true }}
                control={control}
                render={(props) => (
                  <FormGroup>
                    <label htmlFor="__email">Email</label>
                    <Input
                      type="email"
                      className="pill"
                      id="__email"
                      placeholder="Your email"
                      onChange={(e) => props.onChange(e.target.value)}
                      invalid={errors.email ? true : false}
                    />
                    {errors.email?.type === "required" && (
                      <FormFeedback invalid>Email is required</FormFeedback>
                    )}
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Controller
                name="password"
                defaultValue={false}
                rules={{ required: true, minLength: 8, maxLength: 16 }}
                control={control}
                render={(props) => (
                  <FormGroup>
                    <label htmlFor="__password">Password</label>
                    <Input
                      type="password"
                      className="pill"
                      id="__password"
                      placeholder="Your password"
                      onChange={(e) => props.onChange(e.target.value)}
                      invalid={errors.password ? true : false}
                    />
                    {errors.password?.type === "required" && (
                      <FormFeedback invalid>Password is required</FormFeedback>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <FormFeedback invalid>
                        Password length greater than 16
                      </FormFeedback>
                    )}
                    {errors.password?.type === "minLength" && (
                      <FormFeedback invalid>
                        Password length lower than 8
                      </FormFeedback>
                    )}
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <button className="btn rounded-pill text-font-bold bg-gradient-purple w-25 shadow-2 mx-auto">
              Register
            </button>
          </Row>
        </Form>
      </div>
    </>
  );
}
