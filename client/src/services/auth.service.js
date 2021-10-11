import axios from "axios";

const API_URL = "http://localhost:3000/api/users/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
  });
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentContact = () => {
  return JSON.parse(localStorage.getItem("contact"));
};

const isLoggedIn = () => {
  if (localStorage.getItem("user") !== null) {
    return true;
  }
  return false;
};

const exportedObjects = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentContact,
  isLoggedIn,
};

export default exportedObjects;
