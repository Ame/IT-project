import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactService from "../../services/contact.service";
import "./Contacts.css";
import Search from "../Search/Search.js";
import EditContact from "../EditContact/EditContact";
import Sidebar from "../Sidebar/Sidebar";
import "../Contacts/Contacts.css";

const convertToDate = (date) => {
  const toDate = new Date(date);
  return toDate.toLocaleDateString();
};

//Returns items from contacts that contain the query
const filterContacts = (contacts, query) => {
  if (!query.toLowerCase()) {
    return contacts;
  }
  // case when search tag
  const filteredContacts = contacts.filter((contact) => {
    const name = contact.name.toLowerCase();
    const tags = contact.tags.map((x) => {
      return x.toLowerCase();
    });
    console.log(JSON.stringify(tags));
    return (
      name.includes(query.toLowerCase()) || tags.includes(query.toLowerCase())
    );
  });
  return filteredContacts;
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

  const showModal = (
    id,
    name,
    email,
    phone,
    address,
    birthday,
    notes,
    tags
  ) => {
    setCurrentContactId(id);
    setCurrentContactName(name);
    setCurrentContactEmail(email);

    if (phone) {
      // all optional attributes, may be present or not
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

    if (tags) {
      setCurrentContactTags(tags);
    }
    setModalIsOpen(true);
  };

  const reload = () => window.location.reload();

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    reload();
  };

  // get the existing contact data from the server
  useEffect(() => {
    ContactService.getContacts().then((res) => setContacts(res.data));
  }, []);

  // parameters for search
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredContacts = filterContacts(contacts, searchQuery);

  // deletes a specified contact from the backend and updates the contacts state in this component accordingly
  const handleDeleteContact = (e, id) => {
    e.preventDefault();
    ContactService.deleteContact(id);
    const removeItem = contacts.filter((contact) => {
      return contact._id !== id;
    });
    setContacts(removeItem);
  };

  // gets all tags from existing contacts, removing duplicates
  const getAllTags = (contacts) => {
    const tags = contacts.map((contact) => contact.tags.join(", ")).join(", ");
    return tags.split(", ").filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
  };

  return (
    <div className="contacts">
      <div className="col-lg-3">
        <Sidebar />
      </div>
      <div className="main fullsize">
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
                <div id="tags">
                  <strong>Available Tags:&nbsp; </strong>
                  {getAllTags(contacts).map((tag) => (
                    <p id="tags-display">{tag}</p>
                  ))}
                </div>
                <ul className="contactList" id="results">
                  {filteredContacts.map((contact) => (
                    <li className="contact row" key={contact._id}>
                      <div className="col-lg-5" id="contact">
                        <h6>
                          <strong>Name:</strong> {contact.name}
                        </h6>
                        <h6>
                          <strong title="email">Email:</strong> {contact.email}
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
                            <h6>
                              <strong>Tags: </strong>
                              <i>{contact.tags.join(", ")}</i>
                            </h6>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-lg-5">
                        <button
                          className="delete"
                          onClick={(e) =>
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            ) && handleDeleteContact(e, contact._id)
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="edit"
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
          </div>
          <Link to="/addContact">
            <button>Add Contact</button>{" "}
          </Link>
          <div className="padding"></div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
