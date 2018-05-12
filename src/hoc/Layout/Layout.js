import React, { Component } from 'react';
import { connect } from 'react-redux';

// styles
import classes from './Layout.css';

// components
import Aux from '../_Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({  showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => { 
      return {
        showSideDrawer: !this.state.showSideDrawer
      } 
    });
  }

  render() { 
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler} 
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);