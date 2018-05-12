import React, { Component } from "react";

// Components
import ShoppingItemsList from "../ShoppingItemsList";

class Homepage extends Component {
  render() {
    return (
      <div className="Homepage">
        <ShoppingItemsList />
      </div>
    );
  }
}

export default Homepage;
