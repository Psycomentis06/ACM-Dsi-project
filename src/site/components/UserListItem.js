import React from "react";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";
import "./UserListItem.scss";
export default function UserListItem(props) {
  const history = useHistory();
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "User",
      user: {
        name: props.username,
        role: props.role,
        id: props.userId,
      },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      className="user-list-item shadow-2"
      ref={drag}
      style={{ display: isDragging ? "none" : "block" }}
      onClick={() => history.push("/admin/users/" + props.userId)}
    >
      <div className="avatar">
        <figure>
          <img
            className={
              props.status === "online"
                ? props.status
                : props.status === "offline"
                ? props.status
                : ""
            }
            src={props.avatarSrc}
            alt={props.avatarAlt}
          />
          <figcaption>{props.username}</figcaption>
        </figure>
      </div>
      <div className="popover-data">
        <p className="h6 mb-3">{props.email}</p>
        <p className="text-justified">
          {props.bio === undefined || props.bio.length < 1 ? (
            <span style={{ opacity: 0.5 }}>No bio</span>
          ) : (
            props.bio
          )}
        </p>
      </div>
    </div>
  );
}
