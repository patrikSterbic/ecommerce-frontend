import React from "react";
import { NavLink } from "react-router-dom";

// components
import Logo from "../Logo/Logo";
import { Icon, Input } from "../UI/";

const { Search } = Input;

const navigation = props => (
  <header className="Navigation">
    <ul>
      <div className="left">
        <li>
          <Logo />
        </li>
        <li>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
          />
        </li>
      </div>
      <div className="right">
        <li>
          <Icon type="user" />
          <NavLink to="profile">Profile</NavLink>
        </li>
      </div>
    </ul>
  </header>
);

export default navigation;
