import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { useCustomEventListener } from "react-custom-events";
import ColorThief from "colorthief";
import "./AddProduct.scss";
import UploadImage from "./UploadImage";
export default function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    sale: "",
    color: "",
    imageUrl: "",
    description: "",
    stock: 0,
    category: "",
  });
  const [open, setOpen] = useState(false);
  const [minimise, setMinimise] = useState(false);
  const [identifyingColor, setIdentifyingColor] = useState(false);
  useCustomEventListener("image-uploaded", (data) => {
    setProduct((prevState) => ({
      ...prevState,
      imageUrl: data.imageUrl,
    }));
    let image = new Image();
    image.addEventListener("load", () => {
      console.log(ColorThief.getColor(image));
    });
    image.src = data.imageUrl;
    image.crossOrigin = "Anonymous";
  });
  return open === true ? (
    <div className="add-product shadow-3">
      <header>
        <div className="content">
          <button className="btn" onClick={() => setOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
          {minimise ? (
            <button className="btn" onClick={() => setMinimise(false)}>
              <i className="fas fa-window-maximize"></i>
            </button>
          ) : (
            <button className="btn" onClick={() => setMinimise(true)}>
              <i className="fas fa-window-minimize"></i>
            </button>
          )}
        </div>
      </header>
      <Collapse isOpen={!minimise}>
        <section>
          <span>
            <label htmlFor="productName">Product name</label>
            <input
              type="text"
              id="productName"
              placeholder="Product name"
              value={product.title}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
          </span>
          <span>
            <label htmlFor="productPrice">Product price</label>
            <input
              type="number"
              id="productPrice"
              placeholder="Product price"
              value={product.price}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }))
              }
            />
          </span>
          <span>
            <label htmlFor="productSale">Product sale</label>
            <input
              type="number"
              id="productSale"
              placeholder="Product sale"
              value={product.sale}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  sale: e.target.value,
                }))
              }
            />
          </span>
          <span>
            <label htmlFor="productDesc">Product description</label>
            <textarea
              type="text"
              id="productDesc"
              placeholder="Product name"
              value={product.description}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
            />
          </span>
          <span>
            <label htmlFor="productStock">Product stock</label>
            <input
              type="text"
              id="productStock"
              placeholder="Product stock"
              value={product.stock}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  stock: e.target.value,
                }))
              }
            />
          </span>
          <span>
            <label htmlFor="productCategory">Product category</label>
            <input
              type="text"
              id="productCategory"
              placeholder="Product category"
              value={product.category}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }))
              }
            />
          </span>
          <span>
            <UploadImage type="products" />
          </span>
          {identifyingColor ? (
            <h4>Identifying Color...</h4>
          ) : product.color.length > 0 ? (
            <span>
              <h4>Product Color: {product.color}</h4>
            </span>
          ) : null}
        </section>
      </Collapse>
    </div>
  ) : (
    <button
      className="btn btn-gradient-primary btn-float-bottom-right"
      onClick={() => setOpen(true)}
    >
      <i className="fas fa-plus btn-large"></i>
    </button>
  );
}
