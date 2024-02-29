import React from "react";

import data from "@assets/reminders.json";
import ReactDOM from "react-dom/client";

import App from "./components/App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App reminderData={data.reminderLists} />
  </React.StrictMode>,
);
