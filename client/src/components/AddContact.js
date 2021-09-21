import React, { useState, useRef}  from 'react'
//import {editContact, deleteContact, getContacts} from "../services/contact.service"
import { useForm } from "react-hook-form";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import ContactService from "../services/contact.service";
//import { addContact } from '../services/contact.service';


// import React, { useState, useRef} from "react";
import {Link} from "react-router-dom";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
import AuthService from "../services/auth.service";

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

const AddContact = (e) => {

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


  const handleAddContact = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    
    if (checkBtn.current.context._errors.length === 0) {
      console.log(name, email, phone, address, birthday, notes);
      ContactService.register(name, email, phone, address, birthday, notes).then(
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
   <div className="max-w-xl mx-auto border border-gray-200 rounded-md bg-gray-50">
     <form
       onSubmit={handleAddContact}
     >
       <div className="flex items-center justify-between p-2">
         <div className="flex flex-col">
           <div className="flex items-center py-1.5 flex-1">
             <label htmlFor="name">Name:</label>
             <Input 
              type="text"
              className = "form-control"
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
            // {...register("name", { required: true })} 
            />
           </div>
           <div>
             <label htmlFor="description">Email:</label>
             <Input 
              type="text"
              className = "form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            // {...register("email", { required: true })} 
            />
           </div>
           <div>
             <label htmlFor="phone">Phone Number:</label>
             <Input 
              type="text"
              className = "form-control"
              name="phone"
              value={phone}
              onChange={onChangePhone}
              placeholder="+61"
            // {...register("phone", { required: false })} 
            />
           </div>
           <div>
             <label htmlFor="address">Address:</label>
             <Input 
              type="text"
              className = "form-control"
              name="address"
              value={address}
              onChange={onChangeAddress}
            // {...register("address", { required: false })} 
            />
           </div>
           <div>
             <label htmlFor="birthday">Birthday:</label>
             <Input 
              type="text"
              className = "form-control"
              name="birthday"
              value={birthday}
              onChange={onChangeBirthday}
            // {...register("birthday", { required: false })} 
            />
           </div>
           <div>
             <label htmlFor="notes">Notes:</label>
             <Input 
              type="text"
              className = "form-control"
              name="notes"
              value={notes}
              onChange={onChangeNotes}
            // {...register("notes", { required: false })} 
            />
           </div>
         </div>
         <button>Submit</button>
       </div>
     </form>
   </div>
 );
 
}

export default AddContact;