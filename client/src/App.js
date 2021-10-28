// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure

import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Login, Signup, Dashboard, About, PrivateRoute, Contacts, AddContact, EditProfile, EditContact, Admin, EditUser} from "./components";
import AuthService from "./services/auth.service";
import "./App.css";


function App() {
  // This is the file for App Component. App Component is the main component in React which acts as a container for all other components.
  return (
    <div className="App body">
      <Router>
        <Navigation />
        <div className="content">
        
        <Switch>
          {AuthService.isLoggedIn() === true ? (
              <Route path="/" exact component={() => <Dashboard />} />
             ) : (
              <Route path="/" exact component={() => <Login />} />
            )}
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/about" exact component={() => <About/>} />
          <PrivateRoute path="/dashboard" exact component={() => <Dashboard/>}/>
          <PrivateRoute path="/contacts" exact component={() => <Contacts/>}/>
          <PrivateRoute path="/addContact" exact component={() => <AddContact/>} />
          <PrivateRoute path="/editContact" exact component={() => <EditContact/>} />
          <PrivateRoute path="/editProfile" exact component={() => <EditProfile/>}/>
          <PrivateRoute path="/admin" exact component={() => <Admin />}/>
          <PrivateRoute path="/editUser" exact component={() => <EditUser />}/>
        </Switch>
        </div>
        <Footer className="footer" />
      </Router>
    </div>
  );
}

export default App;