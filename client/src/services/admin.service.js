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

const isAdmin = () => {
  console.log(user.role);
  if (user.role === "admin"){
    return true;
  }
  return false;
}


// get all users
const getUsers = () => {
    return axios.get(API_URL + "viewUsers", config)
}

const exportedObjects = {
  getUsers,
  isAdmin
};

export default exportedObjects;
