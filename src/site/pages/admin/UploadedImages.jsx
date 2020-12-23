// route for admin to let him manage uploaded images
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Alert, Spinner } from "reactstrap";
import firebase from "../../../firebase.config";
import "./UploadedImages.scss";
export default function UploadedImages() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [imgPreviewModal, setImgPreviewModal] = useState(false);
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const openModal = (e, img) => {
    if (!e.target.className.includes("btn")) {
      setImgPreviewModal(true);
      setImgPreviewUrl(img);
    }
  };
  const getUploads = (type) => {
    firebase
      .storage()
      .ref("/")
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          folderRef
            .listAll()
            .then((res) => {
              res.items.forEach((img) => {
                img
                  .getMetadata()
                  .then((res) => {})
                  .catch((err) => {
                    setError(err.message);
                  });
              });
            })
            .catch((err) => {
              setError(err.message);
            });
        });
      });
    /*.then((res) => {
          
        res.items.forEach((itemRef) => {
          itemRef
            .getDownloadURL()
            .then((res) => setImages((prevState) => [...prevState, res]))
            .catch((err) => setError(err.message));
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));*/
  };
  useEffect(() => {
    getUploads("");
  }, []);
  return (
    <div className="uploads-page">
      {error.length > 0 && <Alert color="danger"> {error} </Alert>}
      <Modal
        isOpen={imgPreviewModal}
        toggle={() => setImgPreviewModal(!imgPreviewModal)}
        size="lg"
        centred={true}
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
            className={
              " shadow-1 card  " +
              (index % 8 === 0 ? " card-tall card-wide " : "") +
              (index % 3 === 0 ? " card-tall " : "") +
              (index % 7 === 0 ? " card-wide " : "")
            }
            onClick={(e) => openModal(e, img)}
          >
            <div className="description">
              <ul>
                <li className="items">Uploaded By: </li>
                <li className="items">Upload date: </li>
                <li className="items">Category: </li>
                <li className="items">
                  {" "}
                  <button className="btn btn-danger w-50">
                    <i className="fas fa-trash"></i>
                  </button>{" "}
                </li>
              </ul>
            </div>
            <img src={img} alt="uploaded avatar or product preview" />
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
