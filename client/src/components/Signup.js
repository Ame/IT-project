import React, { useState, useRef} from "react";
import {Link} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";


// const Field = React.forwardRef(({label, type}, ref) => {
//   return (
//     <div>
//       <label style={labelStyle} >{label}</label>
//       <input ref={ref} type={type} style={inputStyle} />
//     </div>
//   );
// });

// const Form = ({onSubmit}) => {
//   const nameRef = React.useRef();
//   const emailRef = React.useRef();
//   const passwordRef = React.useRef();
//   const handleSubmit = e => {
//       e.preventDefault();
//       const data = {
//           name: nameRef.current.value,
//           email: emailRef.current.value,
//           password: passwordRef.current.value
//       };
//       onSubmit(data);
//   };
//   return (
//     <form style={formStyle} onSubmit={handleSubmit} >
//       <Field ref={nameRef} label="Name:" type="text" />
//       <Field ref={emailRef} label="Email:" type="text" />
//       <Field ref={passwordRef} label="Password:" type="password" />
//       <div>
//         <button style={submitStyle} type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };

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


const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

function Signup(props) {

  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      console.log(name, email, password);
      AuthService.register(name, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
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
            {/*<Form onSubmit={handleRegister} ref={form}/>*/}
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
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
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
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
            </div>
            <p>Already have an account? <Link to="/">Log in</Link> here!</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;