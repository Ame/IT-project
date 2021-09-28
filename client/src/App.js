// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure

import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Home, Signup, Dashboard, About, PrivateRoute, Contacts, AddContact, Sidebar, EditProfile, EditContact} from "./components";

function App() {

  return (
    <div className="App">
      <Router>
        <Navigation />
        
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/about" exact component={() => <About/>} />
          <PrivateRoute path="/dashboard">
              <div className="row">
               <div className="col-lg-3">
                  <Sidebar />
                </div>
                <div className = "col-lg-7">
                  <Dashboard />
                </div>
              </div>
          </PrivateRoute>
          <PrivateRoute path="/contacts">
            <div className="row">
               <div className="col-lg-3">
                  <Sidebar />
                </div>
                <div className = "col-lg-7">
                  <Contacts />
                </div>
              </div>
          </PrivateRoute>
          <PrivateRoute path="/addContact" exact component={() => <AddContact/>} />
          <PrivateRoute path="/editContact" exact component={() => <EditContact/>} />
          <Route path="/editProfile">
              <div className="row">
               <div className="col-lg-3">
                  <Sidebar />
                </div>
                <div className = "col-lg-7">
                  <EditProfile />
                </div>
              </div>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;