// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in


import React from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom"

function Dashboard(props) {
  const currentUser = AuthService.getCurrentUser().user;
  let history = useHistory();

  
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Dashboard</h1>
            <p>Start networking with iJane CRM</p>
            <h3>
              <strong>{currentUser.name}</strong> 's Profile </h3>
              <h4>Email: {currentUser.email}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;