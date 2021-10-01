import React from "react";
import { createRef, useEffect, useState } from "react";
import Search from '../Contacts/Search.js';
import AuthService from "../../services/auth.service";
import AdminService from "../../services/admin.service";
import { useHistory } from "react-router-dom"


//Returns items from contacts that contain the query
const filterUsers = (users, query) => {
    if (!query.toLowerCase()) {
        return users;
    }
  
    return users.filter((user) => {
        const userName = user.name.toLowerCase();
        return userName.includes(query.toLowerCase());
    });
  };


function Admin(props) {
  const currentUser = AuthService.getCurrentUser().user;
  let history = useHistory();
  const [users, setUsers] = useState([]);

 

   //parameters for search
   const { search } = window.location;
   const query = new URLSearchParams(search).get('s');
   const [searchQuery, setSearchQuery] = useState(query || '');
   const filteredUsers = filterUsers(users, searchQuery);
 
    // get the existing user data from the server
    useEffect(() => {
    AdminService.getUsers().then((res) => setUsers(res.data.users));
    console.log(users);
  }, []);

  
  return (
    <div className="adminProfile">
      <div className="container">
        <div className="row align-items-center my-5 relative-right">
          <div className="col-lg-7">
            <h1 className="font-weight-light">Admin </h1>
            {AdminService.isAdmin === false ? (
                          <h6>
                            User not an Admin!
                          </h6>
                        ) : 
                        
                        <div id="container">
                        {users.length === 0 ? (
                         <p className="userList" id="notFound">
                           No users found. Add some!{" "}
                         </p>
                        ) : (
                         <>
                           <div id="container">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {users.length === 0 ? (
              <p className="userList" id="notFound">
                No Users found. Add some!{" "}
              </p>
             ) : (
              <>
                <ul className="userList" id="results">
                  {filteredUsers.map((user) => (
                    <li className="contact" key={user._id}>
                      <div className="col-lg-5" id="contact">
                        <h6>
                          <strong>Name:</strong> {user.name}
                        </h6>
                        <h6>
                          <strong>Email:</strong> {user.email}
                        </h6>
                        <h6>
                          <strong>Password:</strong> {user.password}
                        </h6>
                        <h6>
                          <strong>Role:</strong> {user.role}
                        </h6>
                        

                        <button
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          </>
          )}
          </div>
          }


            





          </div>
        </div>
      </div>
    </div>
  );
}


export default Admin;