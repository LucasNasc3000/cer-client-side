/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import history from "./services/history";
import store, { persistor } from "./store";
// import Header from "./components/header";
import Routes from "./routes";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Provider store={store}>
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
