import React from "react";
import { useParams } from "react-router-dom";
export default function Product() {
  let { productId } = useParams();
  return (
    <h1>
      Product page {"=>"} productId: {productId}
    </h1>
  );
}
