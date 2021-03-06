import "./EditContact.css";
import Form from "react-validation/build/form";
import React, { useState, useRef, useEffect } from "react";
import Input from "react-validation/build/input";
import { isEmail, isMobilePhone } from "validator";
import CheckButton from "react-validation/build/button";
import ContactService from "../../services/contact.service";
import { useHistory } from "react-router-dom";
import Tags from "../Tags/Tags";

// A modal is a child window that will pop up on the contacts page in order to edit a contact

// function called when field is requried to ensure that a value has been entered
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// function called to ensure that a value entered is a valid phone number
const validPhoneNumber = (value) => {
  if (!isMobilePhone(value, ["en-AU"])) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid phone number.
      </div>
    );
  }
};

// function called to ensure that a value entered is a valid email address
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const EditContact = ({
  show,
  handleClose,
  id,
  contactName,
  contactEmail,
  contactPhone,
  contactAddress,
  contactBirthday,
  contactNotes,
  contactTags,
  convertDate,
}) => {
  const form = useRef();
  const checkBtn = useRef();
  let history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [birthday, setBirthday] = useState();
  const [notes, setNotes] = useState();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // initialise all values for contact with existing ones in the database
    setName(contactName);
    setEmail(contactEmail);
    setPhone(contactPhone);
    setAddress(contactAddress);
    setBirthday(
      contactBirthday ? convertDate(contactBirthday).toString() : null
    );
    setNotes(contactNotes);
    setTags(contactTags);
  }, [
    contactName,
    contactEmail,
    contactPhone,
    contactAddress,
    contactBirthday,
    contactNotes,
    contactTags,
  ]);

  // function fetches any tags added by the child component and updates this component accordingly
  const fetchTags = (tag) => {
    setTags([...tags, tag]);
  };

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

  // Add tags to a specified contact
  const addTags = (email, tagList) => {
    ContactService.addTags(email, tagList).then((response) => {
      setMessage(response.data.message);
      setSuccessful(true);
    });
  };

  // function adds a new contact to the backend for the currently logged in user
  const handleEditContact = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      console.log(id, name, email, phone, address, birthday, notes, tags);
      ContactService.editContact(
        id,
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
          // add any added tags to this contact
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

    handleClose();
  };

  const handleDeleteTag = (tagToDelete) => {
    ContactService.deleteTag(email, tagToDelete); // deletes the specified tag from the backend for this particular contact
    setTags([...tags.filter((tag) => tag !== tagToDelete)]); // update the tags array to reflect deletion
  };
  if (!show) {
    return null;
  }
  return (
    <div className="popup-box">
      <section className="box">
        <button className="close-icon" onClick={handleClose}>
          x
        </button>
        <h2>Edit Contact: {contactEmail}</h2>
        <Form onSubmit={handleEditContact} ref={form}>
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
                  validation={[required, validEmail]}
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
                  validation={[required, validPhoneNumber]}
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
                  placeholder="DD-MM-YYYY"
                  onChange={onChangeBirthday}
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
                <label htmlFor="tags">Tags:</label>
                <Tags
                  sendTags={fetchTags}
                  existingTags={tags}
                  isEdit={true}
                  tagToBeDeleted={handleDeleteTag}
                ></Tags>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block submit">
                  Edit Contact
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
};

export default EditContact;
