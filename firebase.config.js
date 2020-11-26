/**
 * Firebase config
 */

import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDbEMK8AUgQ44ev7nnpr0LkJ_jH2q4lbs",
  authDomain: "dsi3-project.firebaseapp.com",
  databaseURL: "https://dsi3-project.firebaseio.com",
  projectId: "dsi3-project",
  storageBucket: "dsi3-project.appspot.com",
  messagingSenderId: "68544194109",
  appId: "1:68544194109:web:47995672d51e742caaec54",
  measurementId: "G-VLN35401R5",
};

firebase.initializeApp(config);

export default firebase;
