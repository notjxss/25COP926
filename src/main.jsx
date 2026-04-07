import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./style.css";

import { AuthProvider } from "./auth/authcontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>        
      <App />
    </AuthProvider>
  </React.StrictMode>
);