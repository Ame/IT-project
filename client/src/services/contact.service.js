import axios from "axios";
import AuthService from "../services/auth.service"

const API_URL = "http://localhost:3000/api/contacts/";

const user = AuthService.getCurrentUser();

var token = ""
if (user) {
  token = user.token.token;
} 

const config = {
  headers: { Authorization: token},
};

const addContact = (name, email, phone, address, birthday, notes) => {
  return axios.post(API_URL + "addContact", {
    name,
    email,
    phone,
    address,
    birthday,
    notes,
  }, config);
};

const editContact = (_id, name, email, phone, address, birthday, notes) => {
  return axios.put(API_URL + "updateContact", {
    _id,
    name,
    email,
    phone,
    address,
    birthday,
    notes,
  }, config);
};

const addTags = (email, tags) => {
  return axios.put(API_URL + "addTag", {
    email,
    tags
  }, config);
}

const deleteTag = (email, tag) => {
  return axios.put(API_URL + "deleteTag", {
    email,
    tag
  }, config);
}

const deleteContact = (id) => {
    console.log(id);
    return axios.delete(API_URL + `removeContact/${id}`, config);
}

const getContacts = () => {
    return axios.get(API_URL + "getContacts", config)
}

const getContact = () => {
  return axios.get(API_URL + "getContact", config)
}

const exportedObjects = {
  addContact,
  editContact,
  deleteContact,
  getContacts,
  getContact,
  addTags,
  deleteTag
};

export default exportedObjects;




