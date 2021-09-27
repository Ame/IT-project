import './modal.css'
import Form from "react-validation/build/form";
import React, { useState, useRef, useEffect } from "react";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import ContactService from "../services/contact.service";
import { useHistory } from "react-router-dom";

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

const EditContactModal = ( { show, handleClose, id, contactName, contactEmail, contactPhone, contactAddress, contactBirthday, contactNotes, convertDate }) => {
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

    useEffect(() => {
      setName(contactName);
      setEmail(contactEmail);
      setPhone(contactPhone);
      setAddress(contactAddress);
      setBirthday(contactBirthday);
      setNotes(contactNotes);
    }, [contactName, contactEmail, contactPhone, contactAddress, contactBirthday, contactNotes]);

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
        console.log(id, name, email, phone, address, birthday, notes);
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


    if (!show){
        return null;
    }

    return (
      <div className="modal display-block">
        <section className="modal-main">
          <h2>Edit Contact: {contactEmail}</h2>
          <button type="button" onClick={handleClose}>
            x
          </button>
          <Form
            onSubmit={handleEditContact}
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
                    validation={validEmail}
                    onChange={onChangeEmail}
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
                    placeholder={contactAddress}
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
                    placeholder={contactBirthday ? convertDate(contactBirthday): "DD-MM-YYYY"}
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
                    placeholder={contactNotes}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">
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
}

export default EditContactModal;