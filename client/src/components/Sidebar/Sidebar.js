import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import "./Sidebar.css";

function Sidebar(props) {

  let history = useHistory();
  
    const logoutHandler = () =>{
      history.push("/");
      AuthService.logout();
    }

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }

  const closeMenu = () => {
    setNavbarOpen(false)
  }
  
  return (
    <nav class="navBar">
    <button onClick={handleToggle}>
  {navbarOpen ? (
    <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
  ) : (
    <FiMenu style={{ color: "#343A40", width: "40px", height: "40px" }} />
  )}</button>

    <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
      <li className={`side-item  ${
                  props.location.pathname === "/dashboard" ? "active" : ""
                }`}>
                <Link className="side-link" to="/dashboard" onClick={() => closeMenu()}>
                  <h5>Dashboard</h5>

                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`side-item  ${
                  props.location.pathname === "/contacts" ? "active" : ""
                }`}>
                <Link className="side-link" to="/contacts" onClick={() => closeMenu()}>
                <h5>Contacts</h5>
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`side-item  ${
                  props.location.pathname === "/editProfile" ? "active" : ""

                }`}>
                <Link className="side-link" to="/editProfile" onClick={() => closeMenu()}>
                <h5>Edit Profile</h5>
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              
              <li id="logout-box">
                <Link id="logout" className="side-link" onClick={() => logoutHandler()}>
                Logout
                </Link>
              </li>
            </ul>
   
  </nav>
  );
}

export default withRouter(Sidebar);
