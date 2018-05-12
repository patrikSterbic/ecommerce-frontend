/*eslint-disable */
// see: http://formatjs.io/guides/runtime-environments/#server

import Moment from "moment";

const areIntlLocalesSupported = require("intl-locales-supported");
const supportedLocales = ["en"];

export default function injectIntlLocales() {
  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(supportedLocales)) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and replace the constructors with need with the polyfill's.
      require("intl");
      Intl.NumberFormat = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require("intl");
  }
  Moment.locale();
}
/*eslint-disable */
