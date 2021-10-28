import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "http://localhost:3000/api/admin/";

const user = AuthService.getCurrentUser();
var token = ""
if (user) {
  token = user.token.token;
} 

const config = {
  headers: { Authorization: token},
};

// checks if user is admin
const isAdmin = (user) => {
  if (user.role === "admin"){
    return true;
  }
  return false;
}

// get all users
const getUsers = () => {
    return axios.get(API_URL + "viewUsers", config)
}

// get singular user
const getUser = () => {
  return axios.get(API_URL + "getUser", config)
}

// pass id, name, email, password, and role to allow the editting of the user (not the id)
const editUser = (_id, name, email, password, role) => {
  return axios.put(API_URL + "editUser", {
    _id,
    email,
    role,
    name,
    password    
  }, config);
};

// delete the user by email
const deleteUser = (email) => {
  return axios.delete(API_URL + `deleteUser/${email}`, config);
}

const exportedObjects = {
  getUsers,
  getUser,
  isAdmin,
  editUser,
  deleteUser
};

export default exportedObjects;
