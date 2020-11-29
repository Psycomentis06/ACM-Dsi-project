import React from "react";
import { useParams } from "react-router-dom";
export default function Order(props) {
  let { userId } = useParams();
  return (
    <div>
      Order Component
      <br />
      orders for user id: {props.userId || userId || "not found"}
    </div>
  );
}
