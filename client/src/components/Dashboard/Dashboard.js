// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in

import React from "react";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import Clock from "./Clock";

function Dashboard(props) {
  const currentUser = AuthService.getCurrentUser().user;
  let history = useHistory();


  return (
    <div className="row">
      <div className="hamburger">
        <Sidebar />
      </div>
        <div class="dashboard">
          <div class="dash-content">
          <div class="clock">
                  <Clock/>
                </div>
                
                <h3>
                  <strong>{currentUser.name}</strong> 's Profile{" "}
                </h3>
                <h4>Email: {currentUser.email}</h4>
                <p>Start networking with iJane CRM</p>
              </div>
            </div>
          </div>
     
  );
}

export default Dashboard;
