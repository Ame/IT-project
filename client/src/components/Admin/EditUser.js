import './Admin.css'
import Form from "react-validation/build/form";
import React, { useState, useRef, useEffect } from "react";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import AdminService from "../../services/admin.service";
import { useHistory } from "react-router-dom";
import Tags from "../Tags/Tags"

// A modal is a child window that will pop up on the admin page in order to edit a user

const required = (value) => {
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


const EditUser = ( { show, handleClose, id, userName, userEmail, userPassword, userRole}) => {
    const form = useRef();
    const checkBtn = useRef();
    let history = useHistory();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { // initialise all values for user with existing ones in the database
      setName(userName);
      setEmail(userEmail);
      setPassword(userPassword);
      setRole(userRole);
    }, [userName, userEmail, userPassword, userRole]);

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

    const onChangeRole = (e) => {
      const role = e.target.value;
      setRole(role);
    };

    // function adds a new User to the backend for the currently logged in user
    const handleEditUser = (e) => {
      e.preventDefault();

      setMessage("");
      setSuccessful(false);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length === 0) {
        console.log(id, name, email, password, role);
        AdminService.editUser(
          id,
          name,
          email,
          password,
          role
        ).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            history.push("/users");
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

      handleClose();
    };


    if (!show){
        return null;
    }

    return (
      <div className="popup-box">
        <section className="box">
          <h2>Edit User: {userEmail}</h2>
          <button className="close-icon" type="button" onClick={handleClose}>
            x
          </button>
          <Form
            onSubmit={handleEditUser}
            ref={form}
            style={{ overflow: "scroll" }}
          >
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
                    validation={[validEmail]}
                    onChange={onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Password:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Role:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={onChangeRole}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block submit">
                    Edit User
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

export default EditUser;