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

const getUser = () => {
  return axios.get(API_URL + "getUser", config)
}


const editUser = (_id, name, email, password, role) => {
  return axios.put(API_URL + "editUser", {
    _id,
    email,
    role,
    name,
    password    
  }, config);
};

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
