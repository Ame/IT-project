import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactService from "../../services/contact.service";
import "./Contacts.css";
import Search from './Search.js';
import Form from "react-validation/build/form";
import EditContact from "../EditContact/EditContact";
import Sidebar from "../Sidebar/Sidebar";

const convertToDate = (date) => {
  const toDate = new Date(date);
  return toDate.toLocaleDateString();
};

//Returns items from contacts that contain the query
const filterContacts = (contacts, query) => {
  if (!query.toLowerCase()) {
      return contacts;
  }

  return contacts.filter((contact) => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(query.toLowerCase());
  });
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
  const [currentContactTags, setCurrentContactTags] = useState([]);

  const showModal = (id, name, email, phone, address, birthday, notes, tags) => {
    setCurrentContactId(id);
    setCurrentContactName(name);
    setCurrentContactEmail(email);

    if (phone) { // all optional attributes, my be present or not
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

    if (tags){
      setCurrentContactTags(tags);
    }
    setModalIsOpen(true);
  };

  const reload=()=>window.location.reload();

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    reload();
  };

  // get the existing contact data from the server
  useEffect(() => {
    ContactService.getContacts().then((res) => setContacts(res.data));
  }, []);

  //parameters for search
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredContacts = filterContacts(contacts, searchQuery);

  // deletes a specified contact from the backend and updates the contacts state in this component accordingly
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
    <div className="row">
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-7">
        <div>
          <h3 className="headings">Your contacts</h3>
          <div id="container">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {contacts.length === 0 ? (
              <p className="contactList" id="notFound">
                No Contacts found. Add some!{" "}
              </p>
            ) : (
              <>
                <ul className="contactList" id="results">
                  {filteredContacts.map((contact) => (
                    <li className="contact" key={contact._id}>
                      <div className="col-lg-5" id="contact">
                        <h6>
                          <strong>Name:</strong> {contact.name}
                        </h6>
                        <h6>
                          <strong>Email:</strong> {contact.email}
                        </h6>
                        {contact.phone !== "" ? (
                          <h6>
                            <strong>Phone Number:</strong> {contact.phone}
                          </h6>
                        ) : null}
                        {contact.address !== "" ? (
                          <h6>
                            <strong>Address:</strong> {contact.address}
                          </h6>
                        ) : null}
                        {contact.birthday !== null ? (
                          <h6>
                            <strong>Birthday:</strong>{" "}
                            {convertToDate(contact.birthday)}
                          </h6>
                        ) : null}
                        {contact.notes !== "" ? (
                          <h6>
                            <strong>Notes:</strong> {contact.notes}
                          </h6>
                        ) : null}
                        {contact.tags.length > 0 ? (
                          <div>
                            <h6>Tags: </h6>
                            <ul>{contact.tags.join(", ")}</ul>
                          </div>
                        ) : null}

                        <button
                          onClick={(e) => handleDeleteContact(e, contact._id)}
                        >
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
                              contact.notes,
                              contact.tags
                            )
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <EditContact
                  show={modalIsOpen}
                  handleClose={setModalIsOpenToFalse}
                  onExit={reload}
                  id={currentContactId}
                  contactName={currentContactName}
                  contactEmail={currentContactEmail}
                  contactPhone={currentContactPhone}
                  contactAddress={currentContactAddress}
                  contactBirthday={currentContactBirthday}
                  contactNotes={currentContactNotes}
                  contactTags={currentContactTags}
                  convertDate={convertToDate}
                ></EditContact>
              </>
            )}
            <Link to="/addContact">
              <button>Add Contact</button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
