import React, { useState } from "react";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import "./UserListItem.scss";
export default function UserListItem(props) {
  const [popover, setPopover] = useState(false);
  return (
    <div className="user-list-item bg-materialgray shadow-2">
      <div className="avatar" id="user-list">
        <figure>
          <img src={props.avatarSrc} alt={props.avatarAlt} />
          <figcaption>{props.username}</figcaption>
        </figure>
      </div>
      <UncontrolledPopover
        trigger="legacy"
        target="user-list"
        toggle={() => setPopover(!popover)}
        isOpen={popover}
        placement="top-start"
        delay="200"
      >
        <PopoverBody className="text-center">
          <p className="h6 mb-3">{props.email}</p>
          <p className="text-justified">{props.bio}</p>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}
