import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "reactstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { useCustomEventListener } from "react-custom-events";
import ProductCard from "../../components/Product";
import AddProduct from "../../components/AddProduct";
import NoData from "../../components/NoData";
import LoadingPage from "../../components/LoadingPage";
import excerpt from "../../functions/excerpt";
export default function Product() {
  const [redirect, setRedirect] = useState({
    valid: false,
    message: "",
    path: "",
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const getProducts = () => {
    setTimeout(() => {
      Axios.get(process.env.REACT_APP_API_URL + "/product/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.status === 200 && response.data.valid) {
            setProducts(response.data.data);
          } else {
            setError("Retriving data problem try again");
          }
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 401:
                if (err.response.data.message === "Auth error") {
                  setRedirect({
                    valid: true,
                    path: "/login",
                    message: "You must login to continue",
                  });
                  break;
                } else if (err.response.data.message === "Wrong privileges") {
                  setRedirect({
                    valid: true,
                    path: "/login",
                    message: "Missing privileges try other account",
                  });
                } else if (err.response.data.error) {
                  setError(err.response.data.error);
                }
                break;
              default:
                if (err.response.data.error) {
                  setError(err.response.data.error);
                } else if (err.response.data.message) {
                  setError(err.response.data.message);
                }
                break;
            }
          } else if (err.request) {
            setError("Error made in request");
          } else {
            setError("Connection Error");
          }
        })
        .finally(() => setLoadingPage(false));
    }, 500);
  };
  useEffect(() => {
    getProducts();
  }, []);
  // listen to add product event
  useCustomEventListener("add-product", () => {
    setLoading(true);
    setTimeout(() => {
      getProducts();
      setLoading(false);
    }, 500);
  });
  if (redirect.valid) {
    return (
      <Redirect
        to={{
          pathname: redirect.path,
          state: { message: redirect.message, path: "/admin/products" },
        }}
      />
    );
  }
  if (loadingPage) {
    return <LoadingPage />;
  }
  return (
    <Container className="mt-3">
      {error?.length > 0 && <Alert color="danger">{error}</Alert>}
      {products.length === 0 && <NoData status="No products found" />}
      {JSON.parse(localStorage.getItem("userData"))?.roles ===
      "ROLE_SUPERADMIN" ? (
        <AddProduct />
      ) : null}
      {loading && (
        <Spinner
          color="success"
          style={{ width: "150px", height: "150px", textAlign: "center" }}
        />
      )}
      <Row>
        {products.map((product) => (
          <Col md key={product.id}>
            <ProductCard
              productBgColor={product.backgroundcolor}
              path={"/admin/products/" + product.id}
              liked={false}
              category={product.category}
              description={
                product.description?.length > 0
                  ? excerpt(product.description, 40)
                  : ""
              }
              img={product.imageurl}
              title={product.title}
              price={product.price}
              sale={product.discount}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
