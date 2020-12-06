import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoadingPage from "../components/LoadingPage";

function Store() {
  useEffect(() => {
    setTimeout(() => setLoading(false), 100000);
  });
  const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <LoadingPage />
      </div>
    );
  }
  return <h1>Store</h1>;
}

export default Store;
