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

//Devloppement components
//import Send from "./components/dev/Send";
import App from "./pages/App";
import store from "./helpers/redux/store";
import { QuatreCentQuatre } from "./pages/QuatreCentQuatre";
import { All } from "./pages/All";
import { ChatContainer } from "./components/chat/ChatContainer";
import { GroupCreate } from "./components/group/create/GroupCreateContainer";
import { ContactChatWaiting } from "./components/base/AppWaiting";

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
    path: "/app",
    element: <App />,
    children: [
      { index: true, element: <ContactChatWaiting /> },
      {
        path: "/app/group/new",
        element: <GroupCreate />,
      },
      {
        path: "/app/group/:id",
        element: <ChatContainer />,
      },
    ],
  },
  /* {
    path: "/send",
    element: <Send />,
  }, */
  {
    path: "/404",
    element: <QuatreCentQuatre />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <All />,
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
