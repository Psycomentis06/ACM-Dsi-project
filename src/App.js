import React from "react";
import "./App.scss";
import MainInterface from "./site/routes/Main_page";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <MainInterface />
      </Router>
    </>
  );
}

export default App;
