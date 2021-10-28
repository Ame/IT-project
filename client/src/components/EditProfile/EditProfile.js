import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../services/auth.service";
import Sidebar from "../Sidebar/Sidebar";
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import EditProfileService from "../../services/edit-profile-service";

function EditProfile( { getFontSize, currentFont } ) {
  const currentUser = AuthService.getCurrentUser().user;

  const form = useRef();
  const checkBtn = useRef();
  const reload = () => window.location.reload();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [font, setFont] = useState("");


  useEffect(() => {
    // initialise all values for contact with existing ones in the database
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
    setConfirmPassword(currentUser.password);
    setFont(currentUser.font);
  }, [currentUser.name, currentUser.email, currentUser.password, currentUser.font]);

  const required = (value, field, formIsValid, errors) => {
    if (!value) {
      formIsValid = false;
      errors[field] = "This field is required!";
    }
  };

  const handleValidation = () => {
    const errors = {};
    let formIsValid = true;

    if (!isEmail(email)) {
      formIsValid = false;
      errors["email"] = "Invalid email";
    }

    if (password.length <= 6) {
      formIsValid = false;
      errors["password"] = "Password must be greater than 6 characters";
    }

    required(confirmPassword, "confirmPassword", formIsValid, errors);

    if (password !== confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Passwords don't match";
    }

    setErrors(errors);
    return formIsValid;
  };


  const handleEditProfile = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (handleValidation()) {
      if (checkBtn.current.context._errors.length === 0) {
        EditProfileService.editProfile(name, email, password,font).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            console.log(response);
            const user = JSON.parse(localStorage.getItem("user"));
            // update local storage with updated name, email & password values
            user.user.name = name;
            user.user.email = email;
            user.user.password = password;
            user.user.font = font;
            localStorage.setItem("user", JSON.stringify(user));
            //getFontSize(font);
            reload();
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
  // form to edit your own profile
  return (
    <div className="editProfile" className="fullsize">
      <div className="container">
        <div className="row align-items-center my-5 relative-right">
          <div className="col-lg-7">
            <Sidebar />
            <h1 className="font-weight-light">
              Edit Profile, {currentUser.name}
            </h1>
            {successful ? <p>Account updated successfully!</p> : null}
            <Form onSubmit={handleEditProfile} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={onChangeName}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Email:</label>
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
                    <button className="btn btn-primary btn-block submit">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
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
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
