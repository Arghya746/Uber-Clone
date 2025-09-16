import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserProvider.jsx";
import CaptainProvider from "./context/CaptainProvider.jsx";
import SocketProvider from "./context/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <UserProvider>
        <CaptainProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CaptainProvider>
      </UserProvider>
    </SocketProvider>
  </StrictMode>
);
