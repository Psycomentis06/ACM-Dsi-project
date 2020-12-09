import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./User.scss";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import LoadingPage from "../../components/LoadingPage";
export default function User() {
  const { userId } = useParams(); // userid
  const history = useHistory();
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState({
    valid: false,
    path: "",
    message: "",
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setTimeout(() => {
      Axios.get(process.env.REACT_APP_API_URL + "/user/" + userId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.valid) {
            setUser(response.data.data);
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 404:
                setRedirect({
                  valid: true,
                  path: "/404",
                  message: "User not found",
                });
                break;
              case 401:
                if (err.response.data.message === "Auth error") {
                  setRedirect({
                    valid: true,
                    path: "/login",
                    message: "You must login to access this route",
                  });
                } else if (err.response.data.message === "Wrong privileges") {
                  setRedirect({
                    valid: true,
                    path: "/login",
                    message:
                      "You need higher privileges to complete this action",
                  });
                } else if (err.response.data.error) {
                  setError(err.response.data.error);
                }
                break;
              default:
                break;
            }
          }
        })
        .finally(() => setPageLoading(false));
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageLoading === true) {
    return <LoadingPage />;
  }

  if (redirect.valid) {
    return (
      <Redirect
        to={{
          pathname: redirect.path,
          state: { message: redirect.message, path: "/admin/user" + userId },
        }}
      />
    );
  }
  return (
    <div className="user-preview">
      <div className="half-bg"></div>
      <div className="content shadow-3 border-primary">
        <div className="left">
          <img
            src={
              user.photo ||
              "https://images.unsplash.com/photo-1500856056008-859079534e9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
            }
            alt="userImage"
          />
        </div>
        <div className="right">
          <div className="body">
            {error.length > 0 && (
              <Alert color="danger" className="my-3">
                {" "}
                {error}{" "}
              </Alert>
            )}
            <h3 className="title">{user.firstName}</h3>
            <h3 className="title">{user.lastName}</h3>
            <p className="subtitle h5">
              {"Member since: " + new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="bio">{user.bio || "No bio for this user"}</div>
            <div className="infos">
              <span>
                <i className="fas fa-globe-africa fa-2x mr-3"></i>
                {user.country === "empty" || user.country === null
                  ? "Not mentioned"
                  : user.country}
              </span>
              <span>
                <i className="fas fa-city fa-2x mr-3"></i>
                {user.city === "empty" || user.city === null
                  ? "Not mentioned"
                  : user.city}
              </span>
              <span>
                <i className="fas fa-phone fa-2x mr-3"></i>
                {user.phoneNumber || "Not mentioned"}
              </span>
              <span>
                <i className="fas fa-at fa-2x mr-3"></i>
                {user.email}
              </span>
              <span>
                <i className="fas fa-address-card fa-2x mr-3"></i>
                {user.address === "empty" || user.address === null
                  ? "Not mentioned"
                  : user.address}
              </span>
            </div>
            <div className="w-100 text-center">
              <button
                className="btn btn-primary rounded-pill shadow-2 w-50"
                onClick={() => {
                  history.push("/admin/inbox/" + user.chatRoom);
                }}
              >
                Inbox
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
