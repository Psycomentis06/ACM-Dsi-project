import React, { useState } from "react";
import { Input, FormGroup, Alert, Form, Spinner } from "reactstrap";
import errorHandler from "../../functions/errorHandler";
//import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import Axios from "axios";
export default function AdminProfilePassword() {
  const swal = WithReactContent(Swal);
  //const history = useHistory();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const changePass = (e) => {
    e.preventDefault();
    if (newPass !== rePass) {
      setError("New Password and retyped password dosn't match");
    } else {
      setLoading(true);
      Axios.put(
        process.env.REACT_APP_API_URL +
          "/user/" +
          JSON.parse(localStorage.getItem("userData")).id +
          "/password",
        {
          password: oldPass,
          new_password: newPass,
          re_password: rePass,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          if (response.data.valid === true) {
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            window.location.href = "/login";
            /*history.replace({
              pathname: "/login",
              state: {
                message: "Password Changed login in again",
                path: "/admin/profile",
              },
            });*/
          } else {
            swal.fire("", "Unhandled response", "warning");
          }
        })
        .catch((err) => {
          const error = errorHandler(err);
          if (error.valid === true) {
            // error encountred
            if (error.type === "error") {
              swal.fire("Error", error.message, "error");
            } else if (error.type === "redirect") {
              window.location.href = "/login";
              /*return history.replace({
                pathname: error.path,
                state: {
                  message: error.message,
                  path: "/admin/profile",
                },
              });*/
            }
          }
        })
        .finally(() => setLoading(false));
    }
  };
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
        {error.length > 0 && <Alert color="danger"> {error} </Alert>}
        <h1 className="text-center"> Change password </h1>
        <fieldset
          className="mt-3 border-primary p-2"
          style={{ borderWidth: "2px" }}
        >
          <legend className="w-auto">Password</legend>
          <Form onSubmit={(e) => changePass(e)}>
            <FormGroup>
              <label htmlFor="curr_pass">Current password</label>
              <Input
                required
                type="password"
                id="curr_pass"
                placeholder="Your current password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <label htmlFor="new_pass">New password</label>
              <Input
                required
                type="password"
                id="new_pass"
                placeholder="Your new password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-3">
              <label htmlFor="re_pass">Re-Type new password</label>
              <Input
                required
                type="password"
                id="re_pass"
                placeholder="Retype your new password"
                value={rePass}
                onChange={(e) => setRePass(e.target.value)}
              />
            </FormGroup>
            <div className="w-100">
              <button
                type="submit"
                className="btn btn-secondary w-100 text-center"
              >
                {loading ? <Spinner /> : "Submit"}
              </button>
            </div>
          </Form>
        </fieldset>
      </div>
    </div>
  );
}
