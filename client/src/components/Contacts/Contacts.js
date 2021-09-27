import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactService from "../../services/contact.service";
import "./Contacts.css";
import Search from './Search.js';


const convertToDate = (date) => {
  const toDate = new Date(date);
  return toDate.toLocaleDateString();
};

//Returns items from contacts that contain the query
const filterContacts = (contacts, query) => {
  if (!query) {
      return contacts;
  }

  return contacts.filter((contact) => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(query);
  });
};


function Contacts() {

  const [contacts, setContacts] = useState([]);

  // get the contact data from the server
  useEffect(() => {
    ContactService.getContacts().then((res) => setContacts(res.data));
    console.log(contacts);
  }, []);

  //parameters for search
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredContacts = filterContacts(contacts, searchQuery);


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

          <div id="container">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    
            <ul className="contactList" id="results">
            {filteredContacts.map((contact) => (
              <li className="contact" key={contact._id}>
                <div className="col-lg-3" id="contact">
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
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("delete");
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                  <button type="button" onClick={() => console.log("Edit")}>
                    Edit
                  </button>
                </div>
              </li>
            ))}
            </ul>
          
          </div>
          
          <Link to="/addContact">
        <button>Add Contact</button>{" "}
      </Link> 
        </div>
      )}

    </div>
  );
}

export default Contacts;
