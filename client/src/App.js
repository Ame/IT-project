// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure
// <PrivateRoute path={["/dashboard", "/contacts"]} exact component={() => <Sidebar />} />
import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Home, Signup, Dashboard, About, PrivateRoute, Contacts, AddContact, Sidebar, EditProfile } from "./components";

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
                <div className = "col-lg-5">
                  <Dashboard />
                </div>
              </div>
          </PrivateRoute>
          <Route path="/contacts">
            <div className="row">
               <div className="col-lg-3">
                  <Sidebar />
                </div>
                <div className = "col-lg-5">
                  <Contacts />
                </div>
              </div>
          </Route>
          <Route path="/addContact" exact component={() => <AddContact/>} />
          <Route path="/editProfile">
              <div className="row">
               <div className="col-lg-3">
                  <Sidebar />
                </div>
                <div className = "col-lg-5">
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