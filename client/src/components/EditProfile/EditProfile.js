import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import EditProfileService from "../../services/edit-profile-service";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

function EditProfile() {
  const currentUser = AuthService.getCurrentUser().user;

  const form = useRef();
  const checkBtn = useRef();
  const reload = () => window.location.reload();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // initialise all values for contact with existing ones in the database
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
  }, [currentUser.name, currentUser.email, currentUser.password]);

  const handleEditProfile = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      EditProfileService.editProfile(name, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          console.log(response);
          const user = JSON.parse(localStorage.getItem("user"));
          user.user.name = name;
          user.user.email = email;
          localStorage.setItem("user", JSON.stringify(user));
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
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  return (
    <div>
      <section>
        <h2>Edit your profile {currentUser.name}</h2>
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
                  validation={validEmail}
                  onChange={onChangeEmail}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Edit Profile
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
      </section>
    </div>
  );
}

export default EditProfile;
