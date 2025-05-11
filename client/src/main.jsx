import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./redux/store/store.jsx";
import history from "./utils/history.js";
import { getConfig } from "./config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "react-use-cart";


const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  onRedirectCallback,
  cacheLocation: "localstorage",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Auth0Provider
  domain="dev-jdkm0r3xevm3bopt.us.auth0.com"
  clientId="bRANPraHT65XU04lmuIIpIv8YGeq8GdE"
  audience="https://underevents/api"
  redirectUri={window.location.origin}
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
