window.global = window;

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import RootContextProvider from "./Context/RootContextProvider.jsx";
import "react-quill-new/dist/quill.snow.css";

createRoot(document.getElementById("root")).render(
  <RootContextProvider>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </RootContextProvider>
);
