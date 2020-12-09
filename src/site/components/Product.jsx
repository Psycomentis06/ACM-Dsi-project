import React from "react";

export default function Product({ title, sale, img, imgAlt, ...rest }) {
  return (
    <div className="product-card" {...rest}>
      <h2 className="text-center text-wrap">{title || "Title"}</h2>
      {sale && <span className="sales">{sale}</span>}
      <div className="body">
        <div className="left">
          <div className="product-img">
            <div className="like">
              <button className="btn">
                <i className="fas fa-heart fa-2x"></i>
              </button>
            </div>
            <div className="share">
              <button className="btn">
                <i className="fas fa-share"></i>
              </button>
            </div>
            <img
              src={
                img ||
                "https://images.unsplash.com/photo-1556912743-54b370e8385b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              }
              alt={imgAlt || "Product image"}
            />
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
