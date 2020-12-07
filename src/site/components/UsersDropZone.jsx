import React from "react";
import { useDrop } from "react-dnd";
export default function UsersDropZone({
  message,
  userType,
  children,
  ...rest
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "User",
    drop: (e) => console.log(e),
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
          height: "100%",
        }}
      >
        {children}
        <div
          className="overlay"
          style={{
            width: "100%",
            height: "600px",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
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
            <h4 className="text-white">{message}</h4>
          ) : (
            <h4 className="text-danger">Can't drop user here</h4>
          )}
        </div>
      </div>
    </>
  );
}
