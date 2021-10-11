// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure

import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Login, Signup, Dashboard, About, PrivateRoute, Contacts, AddContact, Sidebar, EditProfile, EditContact, Admin} from "./components";
import AuthService from "./services/auth.service";
import "./App.css";


function App() {
  return (
    <div class="App">
      <Router>
        <Navigation />

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
          <PrivateRoute path="/editProfile" exact component={() => <EditProfile />}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
