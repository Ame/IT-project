// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in

import React from "react";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

function Dashboard(props) {
  const currentUser = AuthService.getCurrentUser().user;
  let history = useHistory();
  

  return (
    <div className="row">
      <div className="col-lg-3">
        <Sidebar />
      </div>
      <div className="col-lg-7">
        <div className="dashboard">
          <div className="container">
            <div className="row align-items-center my-5">
              <div className="col-lg-5">
                <h1 className="font-weight-light">Dashboard</h1>
                <p>Start networking with iJane CRM</p>
                <h3>
                  <strong>{currentUser.name}</strong> 's Profile{" "}
                </h3>
                <h4>Email: {currentUser.email}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
