import React, { useState } from "react";

export default function StatCard(props) {
  const { className, bg, gradient, textColor, radial, ...attributes } = props;

  const [followPointer, setFollowPointer] = useState({
    top: 1000,
    left: 1000,
  });

  const followPointerHandler = (e) => {
    setFollowPointer({
      top: e.pageY,
      left: e.pageX,
    });
  };
  return (
    <>
      <div
        onMouseMove={props.radial ? followPointerHandler : null}
        {...attributes}
        className={
          "" +
          (props.className ? props.className : "") +
          " card " +
          (props.bg ? "bg-" + props.bg : "") +
          (props.gradient ? " bg-gradient-" + props.gradient : "") +
          (props.textColor ? " text-" + textColor : "")
        }
      >
        {props.radial ? (
          <div
            className="radial"
            style={{
              left: (followPointer.left - 1000) / 2,
              top: (followPointer.top - 1000) / 2,
            }}
          ></div>
        ) : (
          ""
        )}
        <div className="body">{props.children}</div>
      </div>
    </>
  );
}
