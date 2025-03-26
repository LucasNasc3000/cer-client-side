/* eslint-disable import/no-extraneous-dependencies */
import { Analytics } from "@vercel/analytics/dist/react";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import Routes from "./routes";
import history from "./services/history";
import store, { persistor } from "./store";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Provider store={store}>
      <Analytics />
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
