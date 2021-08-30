// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in


import React from "react";
import AuthService from "../services/auth.service";

function Dashboard(props) {
  const currentUser = AuthService.getCurrentUser();

  
  return (
    <div className="dashboard">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Dashboard</h1>
            <p>Start networking with iJane CRM</p>
            <h3>
              <strong>{currentUser.name}</strong> Profile
              <h3>Email: {currentUser.email}</h3>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;