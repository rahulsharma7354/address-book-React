// @ts-nocheck
import "../App.css";
import React, { Component } from "react";
import icon from './media/blog-icon.png'

class NavBar extends Component<{ handleDialog: Function }> {
  constructor(props:undefined) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    this.props.handleDialog();
  }

  render() {
    return (
      <ul className="bar">
        <li className="home">
          <a href="index.html">HOME</a>
        </li>
        <li className="add-item">
          <a onClick={this.handleAdd} href="">
            +ADD
          </a>
        </li>

        <li className="icon">
          <img className="icon" src={icon} alt="Blog Icon" />
        </li>
      </ul>
    );
  }
}

export default NavBar;
