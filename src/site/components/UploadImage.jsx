import React, { useState } from "react";
import "./UploadImage.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import firebase from "../../firebase.config";
import { emitCustomEvent } from "react-custom-events";
import ProgressBar from "./ProgressBar";
export default function UploadImage({ type, ...rest }) {
  const swal = withReactContent(Swal);
  const [progress, setProgress] = useState(0);
  const uploadImage = (file) => {
    let fileExtention = file.name.split(".");
    const types = ["users", "products"];
    if ((type || "").includes(types)) {
      swal.fire("Forbidden", "Accepted types are 'user' or 'product'", "error");
      return false;
    } else {
      const fileName =
        Math.floor(Math.random() * 10000000000) +
        "." +
        fileExtention[fileExtention.length - 1];
      let imageRef = firebase.storage().ref(type).child(fileName).put(file);
      imageRef.on(
        "state_changed",
        (snapshot) => {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              swal.fire(
                "Error",
                "You don't have permission to upload images",
                "error"
              );
              break;

            case "storage/canceled":
              swal.fire({ text: "Upload canceled", icon: "info" });
              break;

            case "storage/unknown":
              swal.fire({ text: "Unkown error", icon: "error" });
              break;
          }
        },
        () => {
          imageRef.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => {
              swal.fire("Completed", "", "success");
              setTimeout(() => {
                setProgress(0);
                emitCustomEvent("image-uploaded", {
                  imageUrl: downloadUrl,
                  state: 200,
                  completed: true,
                });
              }, 500);
            })
            .catch((err) => {
              swal.fire(
                "Error",
                "Failed to get image url please try again",
                "error"
              );
            });
        }
      );
    }
  };
  return (
    <div className="upload-file" {...rest}>
      <input
        type="file"
        id="fileUpload"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            let fileExtention = file.name.split(".");
            if (fileExtention[fileExtention.length - 1] !== "png") {
              swal.fire({
                title: "Warning",
                text:
                  "It's recommanded to use png images (with transparent background)",
                icon: "warning",
              });
              return;
            } else {
              swal.fire({
                title: "Image Preview",
                imageUrl: window.URL.createObjectURL(file),
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Upload image",
                preConfirm: () => uploadImage(file),
              });
              return;
            }
          }
        }}
      />
      <div className="label-content">
        {progress > 0 ? (
          <>
            <ProgressBar completed={progress} bgcolor="blue" />
          </>
        ) : (
          <label
            style={{ textAlign: "center" }}
            htmlFor="fileUpload"
            className="upload-label"
          >
            <i className="fas fa-cloud-upload-alt fa-3x"></i>
            <h3>Upload image</h3>
          </label>
        )}
      </div>
    </div>
  );
}
