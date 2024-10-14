import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="77395616441-o9d9ik434rbt0thsjbp2dnrrjh7ldrlv.apps.googleusercontent.com">
      <Router>
        <App />
      </Router>
  </GoogleOAuthProvider>
    </React.StrictMode>
);
