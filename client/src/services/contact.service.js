import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "/api/contacts/";

const user = AuthService.getCurrentUser();

var token = "";
if (user) {
  token = user.token.token;
}

const config = {
  headers: { Authorization: token },
};

// accepts name, email, phone, address, birthday, notes, and creates a post request to make a new contact
const addContact = (name, email, phone, address, birthday, notes) => {
  return axios.post(
    API_URL + "addContact",
    {
      name,
      email,
      phone,
      address,
      birthday,
      notes,
    },
    config
  );
};

// accepts id, name, email, phone, address, birthday, notes, and creates a put request to edit a contact specified by the id
const editContact = (_id, name, email, phone, address, birthday, notes) => {
  return axios.put(
    API_URL + "updateContact",
    {
      _id,
      name,
      email,
      phone,
      address,
      birthday,
      notes,
    },
    config
  );
};

// adding tags to a contact
const addTags = (email, tags) => {
  return axios.put(
    API_URL + "addTag",
    {
      email,
      tags,
    },
    config
  );
};

// deleting tags from a contact
const deleteTag = (email, tag) => {
  return axios.put(
    API_URL + "deleteTag",
    {
      email,
      tag,
    },
    config
  );
};

// deleting a contact based on id
const deleteContact = (id) => {
  console.log(id);
  return axios.delete(API_URL + `removeContact/${id}`, config);
};

// get all contacts
const getContacts = () => {
  return axios.get(API_URL + "getContacts", config);
};

// get specific contact
const getContact = () => {
  return axios.get(API_URL + "getContact", config);
};

const exportedObjects = {
  addContact,
  editContact,
  deleteContact,
  getContacts,
  getContact,
  addTags,
  deleteTag,
};

export default exportedObjects;
