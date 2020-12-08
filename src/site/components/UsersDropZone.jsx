import React from "react";
import { useDrop } from "react-dnd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";
import { emitCustomEvent } from "react-custom-events";
export default function UsersDropZone({
  message,
  userType,
  children,
  ...rest
}) {
  const swal = withReactContent(Swal);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "User",
    drop: (e) => {
      swal.fire({
        title: "Confirmation",
        text: `You are going to give the user ${e.user.name} the following role ${e.user.role}. if you are sure click ok or cancel`,
        confirmButtonText: "Confirm",
        cancelButtonText: "Go back",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        icon: "warning",
        allowOutsideClick: () => !swal.isLoading(),
        preConfirm: (user) => {
          return Axios.put(
            process.env.REACT_APP_API_URL + "/user/" + e.user.id + "/roles",
            {
              role: userType,
            }
          )
            .then((response) => {
              swal.fire("Success", response.data.message, "success");
              // emit custom event to handle in parent
              emitCustomEvent("user-role-changed", e.user);
            })
            .catch((err) => {
              swal.fire("Error", err.response.data.message, "error");
            });
        },
      });
    },
    canDrop: (e) => {
      if (e.user.role === userType) {
        return false;
      }
      return true;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <>
      <div
        ref={drop}
        {...rest}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "600px",
        }}
      >
        {children}
        <div
          className="overlay"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: isOver ? 1 : 0,
            visibility: isOver ? "visible" : "hidden",
            transition: "all",
            transitionDuration: 300,
          }}
        >
          {canDrop ? (
            <h4
              className="text-white"
              style={{ position: "sticky", top: "50%" }}
            >
              {message}
            </h4>
          ) : (
            <h4
              className="text-danger"
              style={{ position: "sticky", top: "50%" }}
            >
              Can't drop user here
            </h4>
          )}
        </div>
      </div>
    </>
  );
}
