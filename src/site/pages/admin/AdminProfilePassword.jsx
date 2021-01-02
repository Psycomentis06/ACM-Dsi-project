import React from "react";
import { Input, FormGroup } from "reactstrap";
export default function AdminProfilePassword() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 150px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
      className="bg-materialgray mt-4"
    >
      <div style={{ width: "70%", padding: "10px" }}>
        <h1 className="text-center"> Change password </h1>
        <fieldset
          className="mt-3 border-primary p-2"
          style={{ borderWidth: "2px" }}
        >
          <legend className="w-auto">Password</legend>
          <FormGroup>
            <label htmlFor="curr_pass">Current password</label>
            <Input
              type="password"
              id="curr_pass"
              placeholder="Your current password"
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="new_pass">New password</label>
            <Input
              type="password"
              id="new_pass"
              placeholder="Your new password"
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="re_pass">Re-Type new password</label>
            <Input
              type="password"
              id="re_pass"
              placeholder="Retype your new password"
            />
          </FormGroup>
          <div className="w-100">
            <button className="btn btn-secondary w-100 text-center">
              Submit
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
