import React from "react";
import { useParams } from "react-router-dom";
export default function Order() {
  const { id } = useParams();
  return (
    <div>
      Order Component
      <br />
      orders for user id: {id}
    </div>
  );
}
