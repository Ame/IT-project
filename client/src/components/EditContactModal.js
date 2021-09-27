import './modal.css'
import Form from "react-validation/build/form";
import React, { useState, useRef } from "react";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";

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

    const [name, setName] = useState(contactName);
    const [email, setEmail] = useState(contactEmail);
    const [phone, setPhone] = useState(contactPhone);
    const [address, setAddress] = useState(contactAddress);
    const [birthday, setBirthday] = useState(contactBirthday);
    const [notes, setNotes] = useState(contactNotes);
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

    const handleEditContact = () => {
    }


    if (!show){
        return null;
    }

    return (
      <div className="modal display-block">
        <section className="modal-main">
          <h2>Edit Contact: {id}</h2>
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
                    placeholder={contactName}
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
                    placeholder={contactEmail}
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
                    placeholder={contactPhone}
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