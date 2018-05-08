import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer">
          <div className="footer-copyright">
            <div className="container">
              <ul>
                <li>
                  <i className="material-icons">local_phone</i>
                  <p>1300 100 424</p>
                </li>
                <li>
                  <i className="material-icons">local_printshop</i>
                  <p>1300 100 329</p>
                </li>
                <li>
                  <i className="material-icons">mail</i>
                  <p>office@hbiaustralia.com.au</p>
                </li>
                <li>
                  <i className="material-icons">desktop_windows</i>
                  <p>www.hbiaustralia.com.au</p>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
