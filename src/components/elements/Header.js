import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="fixed-action-btn horizontal click-to-toggle">
        <a className="btn-floating btn-large">
          <i className="material-icons">menu</i>
        </a>
        <ul>
          <li>
            <Link className="btn-floating" to="/">
              <i className="material-icons">home</i>
            </Link>
          </li>
          <li>
            <Link
              className="btn-floating"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Roll Call"
              to="/role-call"
            >
              <i className="material-icons">group</i>
            </Link>
          </li>
          <li>
            <Link
              className="btn-floating"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Result"
              to="/result"
            >
              <i className="material-icons">assessment</i>
            </Link>
          </li>
          <li className="btn-floating eye" onClick={this.props.onClick}>
            <i className="material-icons eyeIcon">remove_red_eye</i>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
