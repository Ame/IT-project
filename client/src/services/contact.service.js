import axios from "axios";
import AuthService from "../services/auth.service"

const API_URL = "/api/contacts/";

const token = AuthService.getCurrentUser();

const config = {
  headers: { Authorization: `Bearer ${token}` },
};


const addContact = (name, email, phoneNum, address, birthday, notes) => {
  return axios.post(API_URL + "addContact", {
    name,
    email,
    phoneNum,
    address,
    birthday,
    notes,
  }, config);
};

const editContact = (name, email, phoneNum, address, birthday, notes) => {

  return axios.put(API_URL + "editContact", {
    name,
    email,
    phoneNum,
    address,
    birthday,
    notes,
  }, config);
};

const deleteContact = () => {
    return axios.delete(API_URL + 'delete', config)
}

const getContacts = () => {
    return axios.get(API_URL + "getContacts", config)
}

const exportedObjects = {
  addContact,
  editContact,
  deleteContact,
  getContacts,
};

export default exportedObjects;



