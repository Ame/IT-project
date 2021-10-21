import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

function Navigation(props) {
  let history = useHistory();
  const reload = () => window.location.reload();

  const logoutHandler = () => {
    history.push("/");
    AuthService.logout();
    reload();
  };
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {AuthService.isLoggedIn() === true ? (
          <div className="container">
            <Link className="navbar-brand" to="/dashboard">
              iJane CRM
            </Link>
            <div>
              <ul className="navbar-nav ml-auto">
                <li
                  className={`nav-item  ${
                    props.location.pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/dashboard">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li
                  className={`nav-item  ${
                    props.location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => logoutHandler()}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="container">
            <Link className="navbar-brand" to="/">
              iJane CRM
            </Link>
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
        )}
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
