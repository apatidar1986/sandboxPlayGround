import React from "react";
import ReactDOM from "react-dom";

import App from "./HooksHandson/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App subReddit="java" />
  </React.StrictMode>,
  rootElement
);
