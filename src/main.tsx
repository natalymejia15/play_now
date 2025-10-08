import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { CounterProvider } from "./context/CounterContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>   
      <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CounterProvider>
    </UserProvider>
  </React.StrictMode>
);