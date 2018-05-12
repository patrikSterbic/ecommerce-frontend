import React, { Component } from "react";
import { Row, Col } from "antd";

import Navigation from "../Navigation/Navigation";
import CategoryList from "../CategoryList/CategoryList";

class Layout extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <CategoryList />
        <Row>
          <Col span={24}>{this.props.children}</Col>
        </Row>
      </div>
    );
  }
}

export default Layout;
