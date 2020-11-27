import React, { useState } from "react";
import "./UserListItem.scss";
export default function UserListItem(props) {
  return (
    <div className="user-list-item shadow-2">
      <div className="avatar">
        <figure>
          <img src={props.avatarSrc} alt={props.avatarAlt} />
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
