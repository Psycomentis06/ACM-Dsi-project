import React from "react";
import { useHistory } from "react-router-dom";
import "./Product.scss";
export default function Product({
  path,
  title,
  sale,
  img,
  imgAlt,
  category,
  price,
  description,
  productBgColor,
  ...rest
}) {
  const history = useHistory();
  return (
    <div
      className="product-card shadow-4 bg-materialgray"
      {...rest}
      onClick={(e) => {
        if (
          !e.target.className.includes("fas") &&
          !e.target.className.includes("btn")
        ) {
          history.push(path);
        }
      }}
    >
      <div className="w-75 mx-auto">
        <h2 className="text-center text-wrap pt-3 text-primary">
          {title || "Title"}
        </h2>
        <p
          className="h6 mt-3 text-left font-light text-wrap category text-secondary-2"
          style={{ opacity: 0.7 }}
        >
          {category || "Category"}
        </p>
      </div>
      {sale && <span className="sales">{sale}</span>}
      <div className="body">
        <div className="left">
          <div
            className="content"
            style={{ backgroundColor: productBgColor || "unset" }}
          >
            <div className="product-img">
              <div className="actions">
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
        </div>
        <div className="right">
          <div className="content">
            <p className="h3 price">{price || "Price"}</p>
            <p className="h5 description">{description || "Description"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
