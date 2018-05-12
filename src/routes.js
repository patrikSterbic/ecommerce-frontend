import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// Components
import NotFound from "./containers/NotFound";
import Homepage from "./containers/Homepage";

// Make components async HERE

export default (
  <Switch>
    <Route path="/" exact component={Homepage} />
    {/* 404 Not Found */}
    <Route component={NotFound} />
  </Switch>
);
