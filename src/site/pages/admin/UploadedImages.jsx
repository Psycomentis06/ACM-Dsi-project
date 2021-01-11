// route for admin to let him manage uploaded images
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Alert, Spinner, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import firebase from "../../../firebase.config";
import "./UploadedImages.scss";
export default function UploadedImages() {
  const swal = withReactContent(Swal);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [imgPreviewModal, setImgPreviewModal] = useState(false);
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const openModal = (e, img) => {
    if (!e.target.className.includes("btn") || e.target.nodeName === "A") {
      setImgPreviewModal(true);
      setImgPreviewUrl(img);
    }
  };
  const getUploads = (type) => {
    let foldersToFetch = [];
    if (type === "users") {
      foldersToFetch = ["users"];
    } else if (type === "products") {
      foldersToFetch = ["products"];
    } else {
      foldersToFetch = ["users", "products"];
    }
    firebase
      .storage()
      .ref("/")
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          if (foldersToFetch.includes(folderRef.name)) {
            folderRef
              .listAll()
              .then((res) => {
                res.items.forEach((img) => {
                  img
                    .getMetadata()
                    .then((res) => {
                      let imageData = {
                        timeCreated: res.timeCreated,
                        user: res.customMetadata?.username || "Not mentioned",
                        userId: res.customMetadata?.userId || "",
                        category: folderRef.name,
                        size: res.size,
                        imagePath: res.fullPath,
                      };

                      img.getDownloadURL().then((res) => {
                        imageData.imageUrl = res;
                        setImages((prevState) => [...prevState, imageData]);
                      });
                    })
                    .catch((err) => {
                      setError(err.message);
                    });
                });
              })
              .catch((err) => {
                setError(err.message);
              })
              .finally(() => setLoading(false));
          }
        });
      });
  };
  useEffect(() => {
    getUploads();
  }, []);
  return (
    <div className="uploads-page">
    {/*  <Row className="my-3 w-75 mx-auto">
        <Col>
          <Row>
            <Col className="text-center">
              {" "}
              <p className="h4">Search</p>{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <Input placeholder="Search for image by user " />
            </Col>
          </Row>
        </Col>
        <Col className="text-center">
          <Row>
            <Col>
              <p className="h4">Filter</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>All users</label>
            </Col>
            <Col>
              <label>Online</label>
            </Col>
            <Col>
              <label>Offline</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                <input
                  type="radio"
                  value="all"
                  name="radio_filter"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
            </Col>
            <Col>
              <label>
                <input
                  type="radio"
                  value="online"
                  name="radio_filter"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
            </Col>
            <Col>
              <label>
                <input
                  type="radio"
                  value="offline"
                  name="radio_filter"
                  style={{ width: "20px", height: "20px" }}
                />
              </label>
            </Col>
          </Row>
        </Col>
</Row> */}
      {error.length > 0 && <Alert color="danger"> {error} </Alert>}
      <Modal
        isOpen={imgPreviewModal}
        toggle={() => setImgPreviewModal(!imgPreviewModal)}
        size="lg"
      >
        <ModalBody>
          <img src={imgPreviewUrl} alt="Preview" className="img-fluid" />
        </ModalBody>
      </Modal>
      {images.length === 0 && loading === false && (
        <Alert color="info"> No data </Alert>
      )}
      <div className="photo-grid">
        {images.map((img, index) => (
          <div
            key={index}
            className={
              " shadow-1 card  " +
              (index % 8 === 0 ? " card-tall card-wide " : "") +
              (index % 3 === 0 ? " card-tall " : "") +
              (index % 7 === 0 ? " card-wide " : "")
            }
            onClick={(e) => openModal(e, img.imageUrl)}
          >
            <div className="description">
              <ul>
                <li className="items">
                  Uploaded By:{" "}
                  <Link
                    to={img.userId}
                    style={{
                      pointerEvents: img.userId.length === 0 ? "none" : "auto",
                    }}
                  >
                    {" "}
                    {img.user}{" "}
                  </Link>
                </li>
                <li className="items">
                  Upload date:{" "}
                  {new Date(img.timeCreated).toLocaleDateString() +
                    " : " +
                    new Date(img.timeCreated).toLocaleTimeString()}{" "}
                </li>
                <li className="items">
                  {" "}
                  Image Size: {Math.round(img.size / 1024)} KB
                </li>
                <li className="items">Category: {img.category} </li>
                <li className="items">
                  {" "}
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => {
                      swal.fire({
                        title: "Delete Image",
                        text:
                          "You are going to delete this image from database. User will not find it next time or your product may displayed without image are you sure about that ?",
                        icon: "question",
                        showConfirmButton: true,
                        confirmButtonText: "Delete",
                        confirmButtonColor: "danger",
                        showCancelButton: true,
                        cancelButtonText: "Go Back",
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                          firebase
                            .storage()
                            .ref(img.imagePath)
                            .delete()
                            .then((res) => {
                              swal.fire("Success", "Image deleted", "success");
                              getUploads("all");
                            })
                            .catch((err) =>
                              swal.fire("Error", err.message, "error")
                            );
                        },
                      });
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>{" "}
                </li>
              </ul>
            </div>
            <img src={img.imageUrl} alt="uploaded avatar or product preview" />
          </div>
        ))}
        {loading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              color="primary"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
