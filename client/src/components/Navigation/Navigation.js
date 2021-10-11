import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";

function Navigation(props) {
  
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          {AuthService.isLoggedIn() === true ? (
              <Link className="navbar-brand" to="/dashboard">
                iJane CRM
              </Link>
             ) : (
              <Link className="navbar-brand" to="/">
                iJane CRM
              </Link>  
            )}
          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Login
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
