import React from "react";
import "./User.scss";
import { useParams } from "react-router-dom";
export default function User() {
  const { userId } = useParams();
  return (
    <div className="user-preview">
      <div className="half-bg"></div>
      <div className="content">
        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1500856056008-859079534e9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
            alt="userImage"
          />
        </div>
        <div className="right">
          <div className="body">
            <h3 className="title">FirstName</h3>
            <h3 className="title">LastName</h3>
            <p className="subtitle h5">Country</p>
            <div className="bio">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              doloremque amet quasi perspiciatis minus delectus iste, odio
              accusantium consequatur nemo harum dignissimos perferendis,
              numquam quis totam, illo repudiandae vitae nihil.
            </div>
            <div className="infos">
              <ul>
                <li>Contry</li>
                <li>Phone</li>
                <li>Email</li>
                <li>Address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
