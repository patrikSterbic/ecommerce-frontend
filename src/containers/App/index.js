import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Routes
import Routes from "../../routes";

// Selectors
import { createStructuredSelector } from "reselect";

// Components
import { LocaleProvider } from "../../components/UI/";
import Layout from "../../components/Layout/Layout";

class App extends React.Component {
  render() {
    return (
      <LocaleProvider>
        <div className="App">
          <Layout>{Routes}</Layout>
        </div>
      </LocaleProvider>
    );
  }
}

App.propTypes = {
  user: PropTypes.any
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = createStructuredSelector({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
