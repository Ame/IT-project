import axios from "axios";

const API_URL = "http://localhost:3000/api/contact/";

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
    return axios.delete(API_URL + 'delete/{}')
}

const getContacts = () => {
    return axios.get(API_URL + "contacts")
}



