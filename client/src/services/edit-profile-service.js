import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "/api/users/";

const user = AuthService.getCurrentUser();
var token = "";

if (user) {
  token = user.token.token;
}

const config = {
  headers: { Authorization: token },
};

// accepts name, email, password, and updates current user's information based on stuff entered
const editProfile = (name, email, password, font) => {
  return axios.put(
    API_URL + "editProfile",
    {
      name,
      email,
      password,
      font,
    },
    config
  );
};

const exportedObjects = {
  editProfile,
};

export default exportedObjects;
