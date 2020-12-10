import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Product.scss";
import { Tooltip } from "reactstrap";
export default function Product({
  path,
  title,
  sale,
  img,
  imgAlt,
  category,
  price,
  description,
  liked,
  productBgColor,
  ...rest
}) {
  const history = useHistory();
  const [likeTooltip, setLikeTooltip] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);
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
        <h1 className="text-center text-wrap pt-3 text-primary">
          {title || "Title"}
        </h1>
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
            className="content shadow-4"
            style={{ backgroundColor: productBgColor || "#e9e9e9" }}
          >
            <div className="product-img">
              <div className="actions">
                <div className={!liked ? "like" : "dislike"}>
                  <button className="btn" id="likedislikebutton">
                    <i
                      className={
                        "fas " + (!liked ? "fa-heart" : "fa-heart-broken")
                      }
                    ></i>
                    <Tooltip
                      isOpen={likeTooltip}
                      toggle={() => {
                        setLikeTooltip(!likeTooltip);
                      }}
                      target="likedislikebutton"
                    >
                      {!liked ? "Like product" : "Dislike product"}
                    </Tooltip>
                  </button>
                </div>
                <div className="share">
                  <button className="btn" id="sharebutton">
                    <i className="fas fa-share"></i>
                    <Tooltip
                      isOpen={shareTooltip}
                      toggle={() => {
                        setShareTooltip(!shareTooltip);
                      }}
                      target="sharebutton"
                    >
                      Share product
                    </Tooltip>
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
            <div className="text-secondary">
              <p className="h2 price">
                Price: &nbsp;
                <span>{(price || "Price") + " TND"}</span>
              </p>
            </div>
            <div>
              <p className="h3 text-secondary description">Description</p>
              <p
                className="ml-4 p5 text-wrap text-justify"
                style={{ opacity: 0.7 }}
              >
                {description || "Description"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer w-100 p-4 text-center">
        <button className="btn bg-gradient-primary-45 rounded-pill">
          <i className="fas fa-shopping-cart mr-2"></i>
          Add to card
        </button>
      </div>
    </div>
  );
}
