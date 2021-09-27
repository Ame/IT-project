import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactService from "../../services/contact.service";
import "./Contacts.css";
import Form from "react-validation/build/form";
import EditContactModal from "../EditContactModal";

const convertToDate = (date) => {
  const toDate = new Date(date);
  return toDate.toLocaleDateString();
};

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentContactId, setCurrentContactId] = useState("");
  const [currentContactName, setCurrentContactName] = useState("");
  const [currentContactEmail, setCurrentContactEmail] = useState("");
  const [currentContactPhone, setCurrentContactPhone] = useState("");
  const [currentContactAddress, setCurrentContactAddress] = useState("");
  const [currentContactBirthday, setCurrentContactBirthday] = useState("");
  const [currentContactNotes, setCurrentContactNotes] = useState("");

  const showModal = (id, name, email, phone, address, birthday, notes) => {
    setCurrentContactId(id);
    setCurrentContactName(name);
    setCurrentContactEmail(email);

    if (phone) {
      // optional attributes
      setCurrentContactPhone(phone);
    }

    if (address) {
      setCurrentContactAddress(address);
    }

    if (birthday) {
      setCurrentContactBirthday(birthday);
    }

    if (notes) {
      setCurrentContactNotes(notes);
    }
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  // get the contact data from the server
  useEffect(() => {
    ContactService.getContacts().then((res) => setContacts(res.data));
  }, []);

  const handleDeleteContact = (e, id) => {
    e.preventDefault();
    console.log("delete");
    ContactService.deleteContact(id);

    const removeItem = contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(removeItem);
  };

  return (
    <div>
      {contacts.length === 0 ? (
        <p>No Contacts found. Add some! </p>
      ) : (
        <div>
          <div>
            <Link to="/dashboard">
              <button className="back">Back</button>{" "}
            </Link>
            <h3 className="headings">Your contacts</h3>
          </div>
          <ul className="contactList">
            {contacts.map((contact) => (
              <li className="contact" key={contact._id}>
                <div>
                  <Link to="editContact">
                    <h6>Name: {contact.name}</h6>
                    <h6>Email: {contact.email}</h6>
                    {contact.phone !== "" ? (
                      <h6>Phone Number: {contact.phone}</h6>
                    ) : null}
                    {contact.address !== "" ? (
                      <h6>Address: {contact.address}</h6>
                    ) : null}
                    {contact.birthday !== null ? (
                      <h6>Birthday: {convertToDate(contact.birthday)}</h6>
                    ) : null}
                    {contact.notes !== "" ? (
                      <h6>Notes: {contact.notes}</h6>
                    ) : null}
                    {contact.tags !== [] ? (
                      <div>
                        <h6>Tags: </h6>
                        <ul>{contact.tags.join(", ")}</ul>
                      </div>
                    ) : null}
                  </Link>

                  <button onClick={(e) => handleDeleteContact(e, contact._id)}>
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showModal(
                        contact._id,
                        contact.name,
                        contact.email,
                        contact.phone,
                        contact.address,
                        contact.birthday,
                        contact.notes
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <EditContactModal
            show={modalIsOpen}
            handleClose={setModalIsOpenToFalse}
            id={currentContactId}
            contactName={currentContactName}
            contactEmail={currentContactEmail}
            contactPhone={currentContactPhone}
            contactAddress={currentContactAddress}
            contactBirthday={currentContactBirthday}
            contactNotes={currentContactNotes}
            convertDate={convertToDate}
          ></EditContactModal>
        </div>
      )}
      <Link to="/addContact">
        <button>Add Contact</button>{" "}
      </Link>
    </div>
  );
}

export default Contacts;
