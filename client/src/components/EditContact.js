import React, { useState, useRef}  from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import ContactService from "../services/contact.service";
import { useHistory } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

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

const EditContact = (e) => {
  let history = useHistory();

 // const { register, onSubmit} = useForm();

  const form = useRef();
  const checkBtn = useRef();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [notes, setNotes] = useState("");
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
  
  const onChangePhone = (e) => {
      const phone = e.target.value;
      setPhone(phone);
    };

  const onChangeAddress = (e) => {
      const address = e.target.value;
      setAddress(address);
    };

  const onChangeBirthday = (e) => {
      const birthday = e.target.value;
      setBirthday(birthday);
    };

  const onChangeNotes = (e) => {
      const notes = e.target.value;
      setNotes(notes);
  };


  const handleEditContact = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      console.log(name, email, phone, address, birthday, notes);
      ContactService.editContact(name, email, phone, address, birthday, notes).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          history.push("/contacts");
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
   <div className="max-w-xl mx-auto border border-gray-200 rounded-md bg-gray-50">
     <Link to="/contacts">
       <button>Back</button>{" "}
     </Link>
     <p>Edit Contact </p>
     <Form onSubmit={handleEditContact} ref={form} style = {{overflow:'scroll'}}>
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
               // {...register("name", { required: true })}
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
               // {...register("email", { required: true })}
             />
           </div>

           <div className="form-group">
             <label htmlFor="phone">Phone Number:</label>
             <Input
               type="text"
               className="form-control"
               name="phone"
               value={phone}
               onChange={onChangePhone}
               placeholder="+61"
               // {...register("phone", { required: false })}
             />
           </div>

           <div className="form-group">
             <label htmlFor="phone">Address:</label>
             <Input
               type="text"
               className="form-control"
               name="address"
               value={address}
               onChange={onChangeAddress}
             />
           </div>

           <div className="form-group">
             <label htmlFor="phone">Birthday:</label>
             <Input
               type="text"
               className="form-control"
               name="birthday"
               value={birthday}
               onChange={onChangeBirthday}
               placeholder="DD-MM-YYYY"
             />
           </div>

           <div className="form-group">
             <label htmlFor="phone">Notes:</label>
             <Input
               type="text"
               className="form-control"
               name="notes"
               value={notes}
               onChange={onChangeNotes}
             />
           </div>

           <div className="form-group">
             <button className="btn btn-primary btn-block">Submit</button>
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
 );
 
}

export default EditContact;