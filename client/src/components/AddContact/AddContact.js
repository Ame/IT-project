import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import ContactService from "../../services/contact.service";
import { useHistory } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import Tags from "../Tags/Tags";
import "./AddContact.css";

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
  let history = useHistory();

  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
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
      console.log(name, email, phone, address, birthday, notes, tags);
      ContactService.addContact(
        name,
        email,
        phone,
        address,
        birthday,
        notes
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          // add any specified tags to the new contact
          addTags(email, tags);
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

  // updates the tags state with any added from the child component
  const fetchTags = (tag) => {
    setTags([...tags, tag]);
  };

  // add new tags for a contact to the database
  const addTags = (email, tagList) => {
    ContactService.addTags(email, tagList).then((response) => {
      setMessage(response.data.message);
      setSuccessful(true);
    });
  };

  return (
    <div className="max-w-xl mx-auto border border-gray-200 rounded-md bg-gray-50" class="add">
      <Link to="/contacts">
        <button id="back"><i class="arrow left"></i>  Back</button>
      </Link>
      <Form onSubmit={handleAddContact} ref={form}>
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
                validations={[required]}
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
                validations={[required, validEmail]}
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={onChangeAddress}
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday">Birthday:</label>
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
              <label htmlFor="notes">Notes:</label>
              <Input
                type="text"
                className="form-control"
                name="notes"
                value={notes}
                onChange={onChangeNotes}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags:</label>
              <Tags
                sendTags={fetchTags}
                existingTags={tags}
                isEdit={false}
              ></Tags>
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block submit">Submit</button>
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
};

export default AddContact;
