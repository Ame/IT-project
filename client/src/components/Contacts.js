import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactService from "../services/contact.service";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  // get the contact data from the server
  useEffect(() => {
    ContactService.getContacts().then((res) => setContacts(res.data));
    console.log(contacts);
  }, []);

  return (
    <div>
      {contacts.length === 0 ? (
        <p>No Contacts found. Add some! </p>
      ) : (
        <div>
          <div>
            <h6>Your contacts</h6>
          </div>
          <ul className="pt-5">
            {contacts.map((contact) => (
              <li key={contact._id}>
                <div>
                  <h6>Name: {contact.name}</h6>
                  <h6>Email: {contact.email}</h6>
                  <h6>Birthday: {contact.birthday}</h6>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Delete");
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
          <Link to="/addContact">
            <button>Add Contact</button>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contacts;
