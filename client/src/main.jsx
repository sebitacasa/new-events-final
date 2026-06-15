import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./redux/store/store.jsx";
import history from "./utils/history.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "react-use-cart";
import './i18n/i18n.js';


const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Auth0Provider
  domain={import.meta.env.VITE_AUTH0_DOMAIN}
  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
  audience={import.meta.env.VITE_AUTH0_AUDIENCE}
  redirectUri={window.location.origin}
  onRedirectCallback={onRedirectCallback}
  useRefreshTokens={true}
  cacheLocation="localstorage"
>
  <React.StrictMode>
    <CartProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </CartProvider>
  </React.StrictMode>
      </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
