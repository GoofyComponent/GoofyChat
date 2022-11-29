import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Message from "./Message/Message";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import RetreiveConv from "./components/dev/RetreiveConv";
import Send from "./components/dev/Send";
import { Login } from "./components/auth/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/send",
    element: <Send />,
  },
  {
    path: "/",
    element: <RetreiveConv />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
