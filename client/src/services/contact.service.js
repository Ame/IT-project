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
  const currentUser = AuthService.getCurrentUser().user;
  return axios.post(API_URL + "addContact", {
    currentUser,
    name,
    email,
    phone,
    address,
    birthday,
    notes,
  }, config);
};

const editContact = (id, name, email, phone, address, birthday, notes) => {
  return axios.put(API_URL + "updateContact", {
    id,
    name,
    email,
    phone,
    address,
    birthday,
    notes,
  }, config);
};

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
  getContact
};

export default exportedObjects;




