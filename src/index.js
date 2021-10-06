import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Redirect } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
