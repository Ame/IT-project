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
    <nav className="navBar">
    <button onClick={handleToggle}>
  {navbarOpen ? (
    <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
  ) : (
    <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
  )}</button>

    <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
      <li className={`side-item  ${
                  props.location.pathname === "/dashboard" ? "active" : ""
                }`}>
                <Link className="side-link" to="/dashboard" onClick={() => closeMenu()}>
                  Dashboard
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`side-item  ${
                  props.location.pathname === "/contacts" ? "active" : ""
                }`}>
                <Link className="side-link" to="/contacts" onClick={() => closeMenu()}>
                  Contacts
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`side-item  ${
                  props.location.pathname === "/editProfile" ? "active" : ""
                }`}>
                <Link className="side-link" to="/editProfile" onClick={() => closeMenu()}>
                  Edit Profile
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
    </ul>
  </nav>
    /*
    <div className="sidebar vh-100">
      <nav className="bg-light vh-100">
        <div className="container">
          <div>
            <ul className="ml">
              
        
            </ul>
          </div>
        </div>
        <div className = "container">
         <button onClick={logoutHandler}>Logout</button>
        </div>
      </nav>
    </div>*/
  );
}

export default withRouter(Sidebar);