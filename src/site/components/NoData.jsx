import React from "react";
import SearchSVG from "../../assets/images/search.svg";
export default function NoData({ status }) {
  return (
    <div
      className="bg-materialgray"
      style={{
        width: "100%",
        height: "100%",
        opacity: 0.7,
        padding: 20,
      }}
    >
      <div style={{ margin: "auto" }}>
        <img
          src={SearchSVG}
          alt="Search SVG"
          style={{
            width: "150px",
            height: "150px",
            margin: "auto",
            display: "block",
          }}
        />
        <h3
          style={{
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {status || "No data found"}
        </h3>
      </div>
    </div>
  );
}
