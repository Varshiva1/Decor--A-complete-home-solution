import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import { makeServer } from "./server";
import { StateProvider } from "./context/stateContext";
import {AuthProvider} from "./context/authContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <StateProvider>
    <Router>
    <App />
    </Router>
    </StateProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);