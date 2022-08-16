import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let createNewRoot = document.createElement("div");
createNewRoot.setAttribute("id", "root");

const rootId = document.getElementById("root") ?? createNewRoot;
const root = ReactDOM.createRoot(rootId);
root.render(<App />);
