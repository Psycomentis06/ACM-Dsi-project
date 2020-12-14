import React, { useState } from "react";
import { Collapse, Input, Tooltip, Alert } from "reactstrap";
import { useCustomEventListener } from "react-custom-events";
import { Redirect } from "react-router-dom";
import "./AddProduct.scss";
import UploadImage from "./UploadImage";
import ColorThief from "colorthief/dist/color-thief.umd";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function AddProduct() {
  const swal = withReactContent(Swal);
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    sale: 0,
    color: "",
    imageUrl: "",
    description: "",
    stock: 0,
    category: "",
  });
  const [open, setOpen] = useState(false);
  const [minimise, setMinimise] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState({
    valid: false,
    message: "",
    path: "",
  });
  const [identifyingColor, setIdentifyingColor] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  useCustomEventListener("image-uploaded", (data) => {
    setProduct((prevState) => ({
      ...prevState,
      imageUrl: data.imageUrl,
    }));
  });
  const [error, setError] = useState("");
  // Add product function
  const addProduct = () => {
    if (
      product.category.trim().length > 0 &&
      product.color.trim().length > 0 &&
      product.description.trim().length > 0 &&
      product.imageUrl.trim().length > 0 &&
      product.price > 0 &&
      product.stock > 0 &&
      product.title.trim().length > 0
    ) {
      // valid data
      Axios.post(
        process.env.REACT_APP_API_URL + "/product/add",
        {
          title: product.title,
          discount: product.sale,
          price: product.price,
          description: product.description,
          category: product.category,
          stock: product.stock,
          imageurl: product.imageUrl,
          backgroundcolor: product.color,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          if (response.data.valid === true) {
            swal.fire({
              title: "Product added successfuly",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 401:
                if (err.response.data.error) {
                  // error while adding product
                  setError(err.response.data.error[0]);
                } else {
                  // Auth error
                  if (err.response.data.message === "Auth error") {
                    // redirect to login page
                    setRedirect({
                      valid: true,
                      message: "You must login first to add products",
                      path: "/login",
                    });
                  } else if (err.response.data.message === "Wrong privileges") {
                    // redirect to login page
                    setRedirect({
                      valid: true,
                      message: "Only superadmin has permission to add products",
                      path: "/login",
                    });
                  }
                }
                break;

              default:
                setError("Unknown error");
                break;
            }
          } else if (err.request) {
            setError("Internet connection error");
          } else {
            setError("Add product function error or bug");
          }
        });
    } else {
      setError("Invalid data");
    }
  };
  if (redirect.valid === true) {
    return (
      <Redirect
        to={{
          pathname: redirect.path,
          state: { message: redirect.message, path: "/admin/product" },
        }}
      />
    );
  }
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
              <Input
                type="text"
                id="productName"
                placeholder="Product name"
                value={product.title}
                onChange={(e) => {
                  e.persist();
                  setProduct((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="productPrice">Product price</label>
              <Input
                type="number"
                id="productPrice"
                placeholder="Product price"
                value={product.price}
                onChange={(e) => {
                  e.persist();
                  setProduct((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="productSale">Product sale</label>
              <Input
                type="number"
                id="productSale"
                placeholder="Product sale"
                value={product.sale}
                onChange={(e) => {
                  e.persist();
                  setProduct((prevState) => ({
                    ...prevState,
                    sale: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="productDesc">Product description</label>
              <textarea
                wrap="on"
                style={{ resize: "none", width: "100%" }}
                type="text"
                id="productDesc"
                placeholder="Product description"
                value={product.description}
                onChange={(e) => {
                  e.persist();
                  setProduct((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="productStock">Product stock</label>
              <Input
                type="text"
                id="productStock"
                placeholder="Product stock"
                value={product.stock}
                onChange={(e) => {
                  e.persist();
                  setProduct((prevState) => ({
                    ...prevState,
                    stock: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="productCategory">Product category</label>
              <Input
                type="text"
                id="productCategory"
                placeholder="Product category"
                value={product.category}
                onChange={(e) => {
                  e.persist();
                  setProduct((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              {product.imageUrl.length > 0 ? (
                <img
                  crossOrigin={"anonymous"}
                  alt="Product"
                  width="100%"
                  height="300px"
                  style={{ objectFit: "cover" }}
                  src={product.imageUrl}
                  onLoad={(e) => {
                    e.persist();
                    setIdentifyingColor(true);
                    try {
                      setTimeout(() => {
                        let colorThief = new ColorThief().getColor(e.target);

                        setProduct((prevState) => ({
                          ...prevState,
                          color: `rbg(${colorThief[0]}, ${colorThief[1]}, ${colorThief[2]})`,
                        }));
                      }, 500);
                    } catch (err) {
                      setProduct((prevState) => ({
                        ...prevState,
                        color: "#7f8c8d",
                      }));
                    } finally {
                      setIdentifyingColor(false);
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

            {loading ? (
              <button className="btn btn-primary btn-fluid my-3" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Adding product...</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-fluid my-3"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    addProduct();
                    setLoading(false);
                  }, 1000);
                }}
              >
                Add Product
              </button>
            )}
          </section>
        </Collapse>
      </div>
      {error?.length > 0 && (
        <div>
          <Alert color="danger">{error}</Alert>
        </div>
      )}
      <button
        className="btn bg-gradient-primary btn-fab float-right-bottom"
        onClick={() => setOpen(true)}
        id="addProduct"
      >
        <i className="fas fa-plus fa-3x"></i>
      </button>
      <Tooltip
        isOpen={tooltip}
        toggle={() => setTooltip(!tooltip)}
        target="addProduct"
      >
        Add new product
      </Tooltip>
    </>
  );
}
