import "./assets/fonts/font.css";
import "./assets/css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Home } from "./pages/Home";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

import Send from "./components/dev/Send";
import App from "./pages/App";
import store from "./helpers/redux/store";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app/group/:id",
    element: <App />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/send",
    element: <Send />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </>
);
