import React from "react";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom"

function EditProfile(props) {
  const currentUser = AuthService.getCurrentUser().user;
  let history = useHistory();

  
  return (
    <div className="editProfile">
      <div className="container">
        <div className="row align-items-center my-5 relative-right">
          <div className="col-lg-7">
            <h1 className="font-weight-light">Edit Profile</h1>
            <p>Change your user details</p>

            <form action="/action_page.php">
                <label for="fname">First name:</label><br />
                <input type="text" id="fname" name="fname" value="John" /><br />
                <label for="lname">Last name:</label><br />
                <input type="text" id="lname" name="lname" value="Doe" /><br /><br />
                <input type="submit" value="Submit" />
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}


export default EditProfile;