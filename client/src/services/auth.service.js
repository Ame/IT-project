import axios from "axios";

const API_URL = "http://localhost:3000/api/users/";

// registering new user with name, email, and password
const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
  });
};

// accepts email and password and authenticates it against the database
const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "login", {
      email,
      password,
    });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// remove the user from storage
const logout = () => {
  localStorage.removeItem("user");
};

// get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// get current contact
const getCurrentContact = () => {
  return JSON.parse(localStorage.getItem("contact"));
};

// check if logged in
const isLoggedIn = () => {
  if (localStorage.getItem("user") !== null){
    return true;
  }
  return false;
}

const exportedObjects = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentContact,
  isLoggedIn,
};

export default exportedObjects;
