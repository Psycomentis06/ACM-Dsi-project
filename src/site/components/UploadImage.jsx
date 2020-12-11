import React from "react";
import "./UploadImage.scss";
export default function UploadImage() {
  return (
    <div className="upload-file">
      <input type="file" id="fileUpload" />
      <div className="label-content">
        <label
          style={{ textAlign: "center" }}
          htmlFor="fileUpload"
          className="upload-label"
        >
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
          <h3>Upload image</h3>
        </label>
      </div>
    </div>
  );
}
