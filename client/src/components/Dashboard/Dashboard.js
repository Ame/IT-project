// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in

import React from "react";
import AuthService from "../../services/auth.service";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import Clock from "./Clock";

function Dashboard() {
  const currentUser = AuthService.getCurrentUser().user;

  return (
    <div className="row">
      <div className="hamburger">
        <Sidebar />
      </div>
      <div className="dashboard">
        <div className="dash-content">
          <div className="clock">
            <Clock />
          </div>

          <h3>
            <strong>{currentUser.name}</strong> 's Profile{" "}
          </h3>
          <h4 data-testid="heading">Email: {currentUser.email}</h4>
          <p>Start networking with iJane CRM</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
