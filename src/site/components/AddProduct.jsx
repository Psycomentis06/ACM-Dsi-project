import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { useCustomEventListener } from "react-custom-events";
import "./AddProduct.scss";
import UploadImage from "./UploadImage";
import ColorThief from "colorthief/dist/color-thief.umd";
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
  });
  return (
    <>
      <div
        className={
          "add-product shadow-3 bg-materialgray " + (open ? "open" : "")
        }
      >
        <header>
          <div className="content">
            {minimise ? (
              <button className="btn" onClick={() => setMinimise(false)}>
                <i className="fas fa-window-maximize"></i>
              </button>
            ) : (
              <button className="btn" onClick={() => setMinimise(true)}>
                <i className="fas fa-window-minimize"></i>
              </button>
            )}
            <button className="btn" onClick={() => setOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </header>
        <Collapse isOpen={!minimise}>
          <section>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              {product.imageUrl.length > 0 ? (
                <img
                  crossOrigin={"anonymous"}
                  alt="Product image"
                  width="100%"
                  height="300px"
                  style={{ objectFit: "cover" }}
                  src={product.imageUrl}
                  onLoad={(e) => {
                    try {
                      let colorThief = new ColorThief().getColor(
                        e.currentTarget
                      );

                      setProduct((prevState) => ({
                        ...prevState,
                        color: `rbg(${colorThief[0]}, ${colorThief[1]}, ${colorThief[2]})`,
                      }));
                    } catch (err) {
                      setProduct((prevState) => ({
                        ...prevState,
                        color: "#7f8c8d",
                      }));
                    }
                  }}
                />
              ) : (
                <UploadImage type="products" />
              )}
            </div>
            {identifyingColor ? (
              <h4>Identifying Color...</h4>
            ) : product.color.length > 0 ? (
              <div>
                <h4 style={{ color: product.color }}>
                  Product Color: {product.color}
                </h4>
              </div>
            ) : null}
          </section>
        </Collapse>
      </div>
      <button
        className="btn bg-gradient-primary btn-fab float-right-bottom"
        onClick={() => setOpen(true)}
      >
        <i className="fas fa-plus fa-3x"></i>
      </button>
    </>
  );
}