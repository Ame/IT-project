// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in


import React from "react";
// import "style.css";
/** 
const appStyle = {
  height: '250px',
  display: 'flex'
};

const formStyle = {
  margin: 'auto',
  padding: '10px',
  border: '1px solid #c9c9c9',
  borderRadius: '5px',
  background: '#f5f5f5',
  width: '220px',
  display: 'block'
};

const labelStyle = {
  margin: '10px 0 5px 0',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '15px',
};

const inputStyle = {
  margin: '5px 0 10px 0',
  padding: '5px', 
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  boxSizing: 'border-box',
  width: '100%'
};

const submitStyle = {
  margin: '10px 0 0 0',
  padding: '7px 10px',
  border: '1px solid #efffff',
  borderRadius: '3px',
  background: '#3085d6',
  width: '100%', 
  fontSize: '15px',
  color: 'white',
  display: 'block'
};*/


function Dashboard(props) {
  return (
    <div className="dashboard">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Dashboard</h1>
            <p>Start networking with iJane CRM</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;