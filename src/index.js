import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/* 
Initialize a React root and render the <App /> component into the root 
with the strict mode enabled.
*/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
