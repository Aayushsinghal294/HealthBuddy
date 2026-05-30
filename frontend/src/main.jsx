import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import ToastProvider from './context/ToastContext'
import ToastContainer from './components/ToastContainer'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-yellow-50 min-h-screen">
      <BrowserRouter>
        <AppContextProvider>
          <ToastProvider>
            <App />
            <ToastContainer />
          </ToastProvider>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  </StrictMode>
);
