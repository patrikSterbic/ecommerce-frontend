import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";
// import createBrowserHistory from "history/createBrowserHistory";
import { addLocaleData, IntlProvider } from "react-intl";

import configureStore from "./store/configureStore";
import injectIntlLocales from "./utils/intl";
import "moment/locale/en-gb";
import enLocaleData from "react-intl/locale-data/en";
import globalMessages from "./internalization/global";
import "moment/locale/cs";

import "antd/dist/antd.css";

import App from "./containers/App/";

moment.locale();
addLocaleData(enLocaleData); // Prozatím pouze cs locale

console.log("Starting up E - commerce frontend part...", {
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  navigator: {
    userAgent: window.navigator.userAgent,
    platform: window.navigator.platform,
    language: window.navigator.language
  }
});

// const history = createBrowserHistory();
const store = configureStore();
global.reduxStore = store;

injectIntlLocales();

render(
  <Provider store={store}>
    <IntlProvider locale="en" messages={globalMessages} defaultLocale="en">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);
