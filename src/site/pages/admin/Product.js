import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Container, Tooltip, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useCustomEventListener } from "react-custom-events";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";
import errorHandler from "../../functions/errorHandler";
import "./Product.scss";
import UploadImage from "../../components/UploadImage";
export default function Product() {
  let { productId } = useParams();
  const swal = withReactContent(Swal);
  // form hooks
  const { /*control,*/ handleSubmit /*, errors*/ } = useForm();
  const onSubmit = (data) => console.log(data);
  // data state
  const [product, setProduct] = useState({
    title: "",
    category: "",
    description: "",
    sale: 0,
    image:
      "https://www.stihlusa.com/WebContent/Images/Product/3478/ms194ce.png?preset=Product.ProductDetails",
    color: "#000",
    price: 0,
    stock: 0,
  });
  // Tooltip states
  const [titleTooltip, setTitleTooltip] = useState(false);
  const [categoryTooltip, setCategoryTooltip] = useState(false);
  const [descTooltip, setDescTooltip] = useState(false);
  const [saleTooltip, setSaleTooltip] = useState(false);
  const [colorTooltip, setColorTooltip] = useState(false);
  const [priceTooltip, setPriceTooltip] = useState(false);
  const [stockTooltip, setStockTooltip] = useState(false);
  // Edit inputs
  const [imageEdit, setImageEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [saleEdit, setSaleEdit] = useState(false);
  const [colorEdit, setColorEdit] = useState(false);
  const [priceEdit, setPriceEdit] = useState(false);
  const [stockEdit, setStockEdit] = useState(false);
  // Inputs states
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [saleInput, setSaleInput] = useState(0);
  const [colorInput, setColorInput] = useState("#000");
  const [priceInput, setPriceInput] = useState(0);
  const [stockInput, setStockInput] = useState(0);
  const [imageUrlInput, setImageUrlInput] = useState("");
  useCustomEventListener("image-uploaded", (data) => {
    setProduct((prevState) => ({
      ...prevState,
      image: data.imageUrl,
    }));
    setImageEdit(false);
    setImageUrlInput(data.imageUrl);
    editProduct();
  });

  const getProduct = () => {
    Axios.get(process.env.REACT_APP_API_URL + "/product/" + productId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.valid === true) {
          setProduct({
            category: response.data.data.category,
            color: response.data.data.backgroundcolor,
            description: response.data.data.description,
            image: response.data.data.imageurl,
            price: response.data.data.price,
            sale: response.data.data.discount,
            title: response.data.data.title,
            stock: response.data.data.stock,
          });
          setTitleInput(response.data.data.title);
          setCategoryInput(response.data.data.category);
          setDescInput(response.data.data.description);
          setSaleInput(response.data.data.discount);
          setColorInput(response.data.data.backgroundcolor);
          setPriceInput(response.data.data.price);
          setStockInput(response.data.data.stock);
          setImageUrlInput(response.data.data.imageurl);
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled response",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        const error = errorHandler(err);
        if (error.type === "error") {
          swal.fire("Could not get", error.message, "error");
        } else if (error.type === "redirect") {
          return (
            <Redirect
              to={{
                pathname: error.path,
                state: {
                  message: error.message,
                  path: "/admin/products/" + productId,
                },
              }}
            />
          );
        }
      });
  };

  const editProduct = () => {
    Axios.put(
      process.env.REACT_APP_API_URL + "/product/" + productId,
      {
        title: titleInput,
        price: priceInput,
        description: descInput,
        imageurl: imageUrlInput,
        backgroundcolor: colorInput,
        stock: stockInput,
        category: categoryInput,
        discount: saleInput,
        backgroundcolor: colorInput,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.data.valid === true) {
          getProduct();
        } else {
          swal.fire({
            title: "Error",
            text: "Unhandled response",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        const error = errorHandler(err);
        if (error.type === "error") {
          swal.fire("Could not get", error.message, "error");
        } else {
          return (
            <Redirect
              to={{
                pathname: error.path,
                state: {
                  message: error.message,
                  path: "/admin/products/" + productId,
                },
              }}
            />
          );
        }
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container className="mt-3" style={{ position: "relative" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="product-view bg-materialgray shadow-4">
          <div className="left">
            {
              /** Image */
              imageEdit ? (
                <>
                  <UploadImage type="products" />
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setImageEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div style={{ position: "relative" }} className="edit-content">
                  <img
                    className="shadow-2"
                    style={{ backgroundColor: colorInput }}
                    src={
                      product.image ||
                      "https://images.unsplash.com/photo-1556912743-54b370e8385b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    }
                    alt="Product preview"
                  />
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="imageEdit"
                    onClick={() => setImageEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </div>
              )
            }
          </div>
          <div className="right">
            {
              /** Category */
              categoryEdit ? (
                <div>
                  <input
                    type="text"
                    placeholder="Product category"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    style={{ padding: "0 10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setCategoryInput(product.category);
                      setCategoryEdit(false);
                      setCategoryTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        category: categoryInput,
                      }));
                      setCategoryEdit(false);
                      setCategoryTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{ position: "relative" }}
                  className="edit-content border-secondary"
                >
                  <p className="h6" style={{ opacity: 0.6 }}>
                    {product.category || "Category"}
                  </p>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="categoryEdit"
                    onClick={() => setCategoryEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="categoryEdit"
                    isOpen={categoryTooltip}
                    toggle={() => setCategoryTooltip(!categoryTooltip)}
                  >
                    Edit Product category
                  </Tooltip>
                </div>
              )
            }
            {
              /** Title */
              titleEdit ? (
                <div>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Product title"
                    style={{ padding: "0 10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setTitleInput(product.title);
                      setTitleEdit(false);
                      setTitleTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        title: titleInput,
                      }));
                      setTitleEdit(false);
                      setTitleTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{ position: "relative" }}
                  className="edit-content border-primary"
                >
                  <h2 className="text-wrap text-primary">
                    {product.title || "Product name"}
                  </h2>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="titleEdit"
                    onClick={() => setTitleEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="titleEdit"
                    isOpen={titleTooltip}
                    toggle={() => setTitleTooltip(!titleTooltip)}
                  >
                    Edit Product name
                  </Tooltip>
                </div>
              )
            }
            {
              /** Description */
              descEdit ? (
                <div>
                  <textarea
                    onChange={(e) => setDescInput(e.target.value)}
                    placeholder="Product description"
                    value={descInput}
                  ></textarea>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setDescInput(product.description);
                      setDescEdit(false);
                      setDescTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        description: descInput,
                      }));
                      setDescEdit(false);
                      setDescTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{ position: "relative" }}
                  className="edit-content border-secondary-1"
                >
                  <p
                    className="h5 text-justify text-secondary-1"
                    style={{ opacity: 0.7 }}
                  >
                    {product.description ||
                      `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque, modi, cumque illo optio tenetur alias aliquam porro
                dolorum explicabo vel aspernatur omnis ex reiciendis nemo
                maiores asperiores perferendis? Eaque, velit.`}
                  </p>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="descEdit"
                    onClick={() => setDescEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="descEdit"
                    isOpen={descTooltip}
                    toggle={() => setDescTooltip(!descTooltip)}
                  >
                    Edit Product description
                  </Tooltip>
                </div>
              )
            }
            {
              /** Product sale */
              saleEdit ? (
                <div>
                  <input
                    type="number"
                    value={saleInput}
                    onChange={(e) => setSaleInput(e.target.value)}
                    placeholder="Product sale"
                    style={{ padding: "0 10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setSaleInput(product.sale);
                      setSaleEdit(false);
                      setSaleTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        sale: saleInput,
                      }));
                      setSaleEdit(false);
                      setSaleTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{ position: "relative" }}
                  className="edit-content border-secondary"
                >
                  <h4 className="text-secondary" style={{ opacity: 0.9 }}>
                    {"Sale: " + product.sale + "%" || "Sale: 10%"}
                  </h4>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="saleEdit"
                    onClick={() => setSaleEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="saleEdit"
                    isOpen={saleTooltip}
                    toggle={() => setSaleTooltip(!saleTooltip)}
                  >
                    Edit Product sale
                  </Tooltip>
                </div>
              )
            }
            {
              /** Product stock */
              stockEdit ? (
                <div>
                  <input
                    type="number"
                    value={stockInput}
                    onChange={(e) => setStockInput(e.target.value)}
                    placeholder="Product stock"
                    style={{ padding: "0 10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setStockInput(product.stock);
                      setStockEdit(false);
                      setStockTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        stock: stockInput,
                      }));
                      setStockEdit(false);
                      setStockTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{ position: "relative" }}
                  className="edit-content border-secondary"
                >
                  <h4 className="text-secondary" style={{ opacity: 0.9 }}>
                    {"Stock: " + product.stock || "Stock: 0"}
                  </h4>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="stockEdit"
                    onClick={() => setStockEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="stockEdit"
                    isOpen={stockTooltip}
                    toggle={() => setStockTooltip(!stockTooltip)}
                  >
                    Edit Product stock
                  </Tooltip>
                </div>
              )
            }
            {
              /** Color */
              colorEdit ? (
                <div>
                  <input
                    type="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder="Product color"
                    style={{ padding: "0 10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setColorInput(product.color);
                      setColorEdit(false);
                      setColorTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        color: colorInput,
                      }));
                      setColorEdit(false);
                      setColorTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    position: "relative",
                    borderColor: product.color || "#54f1fa",
                  }}
                  className="edit-content"
                >
                  <h5 style={{ color: product.color || "#54f1fa" }}>
                    {"Product color: " + product.color ||
                      "Product color: #54f1fa"}
                  </h5>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="colorEdit"
                    onClick={() => setColorEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="colorEdit"
                    isOpen={colorTooltip}
                    toggle={() => setColorTooltip(!colorTooltip)}
                  >
                    Edit Product color
                  </Tooltip>
                </div>
              )
            }
            {
              /** Price */
              priceEdit ? (
                <div>
                  <input
                    type="number"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    placeholder="Product price"
                    style={{ padding: "0 10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setPriceInput(product.price);
                      setPriceEdit(false);
                      setPriceTooltip(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-3"
                    onClick={() => {
                      setProduct((prevState) => ({
                        ...prevState,
                        price: priceInput,
                      }));
                      setPriceEdit(false);
                      setPriceTooltip(false);
                      editProduct();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div
                  style={{ position: "relative" }}
                  className="edit-content border-secondary"
                >
                  <h3 className="text-center text-secondary">
                    {" "}
                    {"Price: " + product.price + " TND" || "Price: 25 TND"}{" "}
                  </h3>
                  <button
                    type="button"
                    className="edit-btn btn btn-primary rounded-circle w-40px h-40px shadow-3"
                    id="priceEdit"
                    onClick={() => setPriceEdit(true)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <Tooltip
                    target="priceEdit"
                    isOpen={priceTooltip}
                    toggle={() => setPriceTooltip(!priceTooltip)}
                  >
                    Edit Product price
                  </Tooltip>
                </div>
              )
            }
          </div>
        </div>
      </Form>
      {
        // SVGs
      }
      <div className="svgs">
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="350" fill="#e400f4" />
        </svg>
        <svg height="100" width="100">
          <circle cx="450" cy="550" r="250" fill="#e400f4" />
        </svg>
        <svg height="100" width="100">
          <circle cx="850" cy="450" r="400" fill="#6a00f4" />
        </svg>
      </div>
    </Container>
  );
}
