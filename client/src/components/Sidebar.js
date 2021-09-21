import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom"

function Sidebar(props) {
    const currentUser = AuthService.getCurrentUser().user;
    let history = useHistory();
  
    const logoutHandler = () =>{
      history.push("/");
      AuthService.logout();
    }
  return (
    <div className="sidebar">
      <nav className="bg-light vh-100">
        <div className="container">
          <div>
            <ul className="ml">
              <li className={`side-item  ${
                  props.location.pathname === "/dashboard" ? "active" : ""
                }`}>
                <Link className="link" to="/dashboard">
                  Dashboard
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`nav-item  ${
                  props.location.pathname === "/contacts" ? "active" : ""
                }`}>
                <Link className="link" to="/contacts">
                  Contacts
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`nav-item  ${
                  props.location.pathname === "/editProfile" ? "active" : ""
                }`}>
                <Link className="link" to="/editProfile">
                  Edit Profile
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className = "container">
         <button onClick={logoutHandler}>Logout</button>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Sidebar);