// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in


import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
// import "style.css";

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
};

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


function Home({setToken}) {
  const [email, setEmailName] = useState();
  const [password, setPassword] = useState();

const handleSubmit = async e => {
  e.preventDefault();
  const token = await loginUser({
    email,
    password
  });
  setToken(token);
}

  return (
    <div className="home">
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
          <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form onSubmit = {handleSubmit}>
            <label>
              <p>Email</p>
                <input type="text" onChange={e => setEmailName(e.target.value)}/>
              </label>
              <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
            <p>Don't have an account? <Link to="/signup">Sign up</Link> here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Home;