import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";

function Signup() {
  const form = useRef();
  const checkBtn = useRef();
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleValidation = () => {
    const errors = {};
    let formIsValid = true;

    if (!name){
      formIsValid = false;
      errors["name"] = "This field is required!";
    }

    if (!email){
      formIsValid = false;
      errors["email"] = "This field is required!";
    }

    if (!isEmail(email)){
      formIsValid = false;
      errors["email"] = "Invalid email";
    }

    if (password.length <= 6){
      formIsValid = false;
      errors["password"] = "Password must be greater than 6 character";
    }

    if (!password){
      formIsValid = false;
      errors["password"] = "This field is required!";
    }

    if (!confirmPassword){
      formIsValid = false;
      errors["confirmPassword"] = "This field is required!";
    }

    if (password !== confirmPassword){
      formIsValid = false;
      errors["confirmPassword"] = "Passwords don't match";
    }

    setErrors(errors);
    return formIsValid;
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (handleValidation()){
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(name, email, password).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            history.push("/");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Signup</h1>
            <p>Start networking with iJane CRM</p>
            <div>
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                      />
                      <span
                        style={{ color: "red" }}
                      >
                        {errors["name"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                      />
                      <span style={{ color: "red" }}>{errors["email"]}</span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                      />
                      <span style={{ color: "red" }}>{errors["password"]}</span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                      />
                      <span style={{ color: "red" }}>
                        {errors["confirmPassword"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
            <p>
              Already have an account? <Link to="/">Log in</Link> here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
