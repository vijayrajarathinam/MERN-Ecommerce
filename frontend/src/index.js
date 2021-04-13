import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "./App";
import store from "./redux";
import reportWebVitals from "./reportWebVitals";

const alertOptions = {
  timeout: 5000, //5 sec(s)
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
