import React from "react";
import Helmet from "react-helmet";

import messages from "./messages";
import { FormattedMessage } from "react-intl";

import notFoundLogo from "../../theme/imgs/notFound.gif";

export default function NotFound() {
  return (
    <div className="container">
      <Helmet title="Page not found" />
      <h1>Oops... 404!</h1>
      <img src={notFoundLogo} alt="Not Found" />
      <p>
        <FormattedMessage {...messages.notFound} />
      </p>
    </div>
  );
}
