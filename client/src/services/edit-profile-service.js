import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "http://localhost:3000/api/users/";

const user = AuthService.getCurrentUser();
var token = "";

if (user) {
  token = user.token.token;
}

const config = {
  headers: { Authorization: token },
};

const editProfile = (name) => {
  return axios.put(
    API_URL + "editProfile",
    {
      name
    },
    config
  );
};

const exportedObjects = {
    editProfile
};

export default exportedObjects;