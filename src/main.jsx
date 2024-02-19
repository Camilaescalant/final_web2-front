import React from "react";  

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import "./index.css";

import RegisterPage from "./pages/Register/index.jsx";
import ProfilePages from "./pages/Profile/index.jsx";
import LoginPage from "./pages/Login/index.jsx";
import HomePage from "./pages/Home/index.jsx";
import AbmPages from "./pages/Abm/index.jsx";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfilePages />,
  },
  {
    path: "/abm",
    element: <AbmPages />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
