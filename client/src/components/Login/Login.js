// https://dev.to/diraskreact/create-simple-login-form-in-react-227b for log in

import React, { useState, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";

export const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

function Login() {
  let history = useHistory();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          // open the dashboard page once the Auth service has verified login
          history.push("/dashboard");
          window.location.reload();
        },

        // if there is an error, display it
        (error) => {
          if (console.log(error.response.status) == 400) {
            setMessage("invalid email");
            console.log(error.response);
            return (
              <div className="alert alert-danger" role="alert">
                This is not a valid email.
              </div>
            );
          } else {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="home" className="fullsize">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="eye" id="eye2"></div>
        </div>
        <div className="col-lg-5">
          <div className="login-wrapper">
            <h1 className="font-weight-light">Please Log In</h1>
            <p>
              Welcome to iJane CRM! Enjoy the benefits of staying organised.
            </p>
            <Form onSubmit={handleLogin} ref={form}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  title="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  title="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block submit"
                  title="submit"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div
                    className="alert alert-danger"
                    role="alert"
                    title="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link> here!
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
