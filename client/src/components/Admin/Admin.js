import React from "react";
import { createRef, useEffect, useState } from "react";
import Search from '../Contacts/Search.js';
import AuthService from "../../services/auth.service";
import AdminService from "../../services/admin.service";
import EditUser from "../Admin/EditUser";
import { useHistory } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar";


//Returns items from Users that contain the query
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserPassword, setCurrentUserPassword] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");

  const showModal = (id, name, email, password, role) => {
    setCurrentUserId(id);
    setCurrentUserName(name);
    setCurrentUserEmail(email);
    setCurrentUserPassword(password);
    setCurrentUserRole(role);

    setModalIsOpen(true);
  };

  const reload=()=>window.location.reload();

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    reload();
  };

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

   // deletes a specified User from the backend and updates the Users state in this component accordingly
   const handleDeleteUser = (e, id) => {
    e.preventDefault();
    console.log("delete");
    AdminService.deleteUser(id);

    const removeItem = users.filter((user) => {
      return user._id !== id;
    });
    setUsers(removeItem);
  };

  
  return (
    <div className="adminProfile">
      <div className="container" style={{justifyContent:"center", paddingTop: '1em'}}>
          <Sidebar />
            <h1 className="font-weight-light">Admin </h1>
            {AdminService.isAdmin(currentUser) === false ? (
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
                    <li className="user row" key={user._id}>
                      <div className="col" id="user">
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
                      </div> 
                      <div className="col">
                      <button className="delete"
    onClick={e =>
        window.confirm("Are you sure you wish to delete this user?") &&
        handleDeleteUser(e, user._id)
    }
>
    Delete
</button>
                        <button
                          type="button"
                          onClick={() =>
                            showModal(
                              user._id,
                              user.name,
                              user.email,
                              user.password,
                              user.role
                            )
                          }
                        >
                          Edit
                        </button>
                        </div>
                      
                    </li>
                  ))}
                </ul>
                <EditUser
                  show={modalIsOpen}
                  handleClose={setModalIsOpenToFalse}
                  onExit={reload}
                  id={currentUserId}
                  userName={currentUserName}
                  userEmail={currentUserEmail}
                  userPassword={currentUserPassword}
                  userRole={currentUserRole}
                ></EditUser>
              </>
            )}
          </div>
          </>
          )}
          </div>
          }
          </div>
        </div>
      
  );
}


export default Admin;