import React, { Component } from "react";

// Components
import ShoppingItem from "./ShoppingItem";

const testData = [
  {
    id: 1
  },
  {
    id: 2
  },

  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  }
];

class ShoppingItemsList extends Component {
  render() {
    return (
      <div className="ShoppingItemsList">
        {testData.map(shoppingItem => <ShoppingItem key={shoppingItem.id} />)}
      </div>
    );
  }
}

export default ShoppingItemsList;
