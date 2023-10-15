window.global ||= window;
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Form from "./Form";
import Recetas from "./Recetas";
import Acerca from "./Acerca";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Form />
      </>
    ),
  },
  {
    path: "/recetas",
    element: (
      <>
        <Navbar />
        <Recetas />
      </>
    ),
  },
  {
    path: "/contacto",
    element: (
      <>
        <Navbar />
        <Acerca />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
