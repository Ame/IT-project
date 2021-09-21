import React from "react";
import { Link, withRouter } from "react-router-dom";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <nav className="bg-light vh-100">
        <div className="container">
          <div>
            <ul className="ml">
              <li
                className={`side-item  ${
                  props.location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                <Link className="link" to="/dashboard">
                  Dashboard
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`side-item  ${
                  props.location.pathname === "/contacts" ? "active" : ""
                }`}
              >
                <Link className="side-link" to="/contacts">
                  Contacts
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Sidebar);