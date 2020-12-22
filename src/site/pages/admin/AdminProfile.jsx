import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Input, Form, Spinner } from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
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
  const [emailInput, setEmailInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  // submit state
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setFirstNameInput(userData.firstName);
    setLastNameInput(userData.lastName);
    setEmailInput(userData.email);
    setCountryInput(userData.country || "");
    setAddressInput(userData.address || "");
    setBioInput(userData.bio || "");
    setPhoneInput(userData.phoneNumber || "");
  }, []);

  const EditPersonalInfos = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1000);
    console.log(firstNameInput + " | " + lastNameInput + " | " + emailInput);
  };
  const EditAddress = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1000);
    console.log(countryInput + " | " + addressInput);
  };
  const EditBio = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1000);
    console.log(bioInput);
  };
  const EditPhone = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1000);
    console.log(phoneInput);
  };
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
              <Form onSubmit={(e) => EditPersonalInfos(e)}>
                <Row className="p-3 mt-4">
                  <Col>
                    <FormGroup>
                      <label htmlFor="firstNameId">First Name</label>
                      <Input
                        id="firstNameId"
                        placeholder="Your first name"
                        value={firstNameInput}
                        onChange={(e) => {
                          setFirstNameInput(e.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label htmlFor="lastNameId">Last Name</label>
                      <Input
                        value={lastNameInput}
                        id="lastNameId"
                        placeholder="Your last name"
                        onChange={(e) => {
                          setLastNameInput(e.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <label htmlFor="emailId">Email</label>
                      <Input
                        type="email"
                        value={emailInput}
                        id="emailId"
                        placeholder="Your email"
                        onChange={(e) => {
                          setEmailInput(e.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center my-3">
                    <button
                      type="submit"
                      className="btn bg-gradient-purple w-75"
                      disabled={submitted ? true : false}
                    >
                      {submitted ? (
                        <Spinner style={{ width: "25px", height: "25px" }} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Col>
                </Row>
              </Form>
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
              <div>
                <Form onSubmit={(e) => EditAddress(e)}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="countryId">Country</label>
                        <Input
                          id="countryId"
                          placeholder="Your country"
                          value={countryInput}
                          onChange={(e) => setCountryInput(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor="addressId">Address</label>
                        <Input
                          id="addressId"
                          placeholder="Your address"
                          value={addressInput}
                          onChange={(e) => setAddressInput(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center my-3">
                      <button
                        type="submit"
                        className="btn bg-gradient-purple w-75"
                        disabled={submitted ? true : false}
                      >
                        {submitted ? (
                          <Spinner style={{ width: "25px", height: "25px" }} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </fieldset>
          </div>{" "}
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
              <Form onSubmit={(e) => EditBio(e)}>
                <Row>
                  <Col>
                    <FormGroup>
                      <label htmlFor="bioId">Bio</label>
                      <textarea
                        id="bioId"
                        value={bioInput}
                        placeholder="Your Bio"
                        onChange={(e) => setBioInput(e.target.value)}
                        style={{
                          width: "100%",
                          height: "250px",
                          resize: "none",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center my-3">
                    <button
                      type="submit"
                      className="btn bg-gradient-purple w-75"
                      disabled={submitted ? true : false}
                    >
                      {submitted ? (
                        <Spinner style={{ width: "25px", height: "25px" }} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Col>
                </Row>
              </Form>
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
              <Form onSubmit={(e) => EditPhone(e)}>
                <Row>
                  <Col>
                    <FormGroup>
                      <label htmlFor="phoneId">Phone Number</label>
                      <PhoneInput
                        id="phoneId"
                        country="tn"
                        value={phoneInput}
                        placeholder="Your phone number"
                        onChange={(phone) => setPhoneInput(phone)}
                        inputClass="border-secondary"
                        inputStyle={{
                          width: "100%",
                          borderRadius: "15px",
                          border: "2px solid",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center my-3">
                    <button
                      type="submit"
                      className="btn bg-gradient-purple w-75"
                      disabled={submitted ? true : false}
                    >
                      {submitted ? (
                        <Spinner style={{ width: "25px", height: "25px" }} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Col>
                </Row>
              </Form>
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
