import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, FormFeedback, FormText, Input } from "reactstrap";
export default function AdminProfile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const scrollIntoBtnView = (e) => {
    document
      .getElementById(e.target.getAttribute("data-anchor"))
      .scrollIntoView({
        behavior: "smooth",
      });
  };
  /* States*/
  // Input states
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  // Error States
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  useEffect(() => {
    setFirstNameInput(userData.firstName);
    setLastNameInput(userData.lastName);
  }, []);
  return (
    <div className="mt-4">
      <Row>
        <Col
          lg="2"
          className="border-secondary"
          style={{ borderWidth: "2px", borderRight: "solid" }}
        >
          <img
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
            src={userData.photo}
            alt="Admin profile avatar"
          />
          <div className="mt-3" style={{ textAlign: "center" }}>
            <p className="h4"> {userData.firstName} </p>
            <p className="h4"> {userData.lastName} </p>
          </div>
          <hr />
          <ul
            style={{
              height: "200px",
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <li>
              {" "}
              <button
                data-anchor="personal"
                className="btn btn-link"
                onClick={(e) => scrollIntoBtnView(e)}
              >
                {" "}
                Personal info
              </button>
            </li>
            <li>
              {" "}
              <button
                data-anchor="address"
                className="btn btn-link"
                onClick={(e) => scrollIntoBtnView(e)}
              >
                {" "}
                Address
              </button>
            </li>
            <li>
              {" "}
              <button
                data-anchor="description"
                className="btn btn-link"
                onClick={(e) => scrollIntoBtnView(e)}
              >
                {" "}
                Description
              </button>
            </li>
            <li>
              {" "}
              <button
                data-anchor="phone"
                className="btn btn-link"
                onClick={(e) => scrollIntoBtnView(e)}
              >
                {" "}
                Phone number
              </button>
            </li>
          </ul>
        </Col>
        <Col style={{ height: "100vh", overflowY: "scroll" }}>
          <div id="personal">
            <fieldset
              className="border-primary p-2 shadow-3"
              style={{
                borderWidth: "2px",
                border: "solid",
                borderRadius: "10px",
              }}
            >
              <legend className="w-auto text-secondary-2">
                Personal Infos
              </legend>
              <div>
                <Row>
                  <Col>
                    <FormGroup>
                      <label htmlFor="firstNameId">First Name</label>
                      {firstNameError?.length > 0 ? (
                        <>
                          <Input
                            id="firstNameId"
                            placeholder="Your first name"
                            value={firstNameInput}
                            onChange={(e) => {
                              setFirstNameInput(e.target.value);
                              if (firstNameInput.length > 3) {
                                setFirstNameError("");
                              }
                            }}
                            invalid
                          />
                          <FormFeedback> {firstNameError} </FormFeedback>
                        </>
                      ) : (
                        <Input
                          value={firstNameInput}
                          id="firstNameId"
                          placeholder="Your first name"
                          onChange={(e) => {
                            setFirstNameInput(e.target.value);
                            if (firstNameInput.length < 3) {
                              setFirstNameError(
                                "First name length should be greater than 3"
                              );
                            }
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label htmlFor="lastNameId">Last Name</label>
                      <Input
                        value={lastNameInput}
                        id="lastNameId"
                        placeholder="Your last name"
                        onChange={(e) => {
                          setLastNameInput(e.target.value);
                          if (lastNameInput.lenght < 3) {
                            setLastNameError(
                              "Last name length should be greater than 3"
                            );
                          }
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </fieldset>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div id="address">
            <fieldset
              className="border-primary p-2 shadow-3"
              style={{
                borderWidth: "2px",
                border: "solid",
                borderRadius: "10px",
              }}
            >
              <legend className="w-auto text-secondary-2">Address</legend>
            </fieldset>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div id="description">
            <fieldset
              className="border-primary p-2 shadow-3"
              style={{
                borderWidth: "2px",
                border: "solid",
                borderRadius: "10px",
              }}
            >
              <legend className="w-auto text-secondary-2">Description</legend>
            </fieldset>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div id="phone">
            <fieldset
              className="border-primary p-2 shadow-3"
              style={{
                borderWidth: "2px",
                border: "solid",
                borderRadius: "10px",
              }}
            >
              <legend className="w-auto text-secondary-2">Phone</legend>
            </fieldset>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Col>
      </Row>
    </div>
  );
}
