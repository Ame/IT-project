// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure

import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Home, Signup, Dashboard, About, PrivateRoute, Contacts, AddContact} from "./components";

function App() {

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/signup" exact component={() => <Signup />} />
          <PrivateRoute path="/dashboard" exact component={() => <Dashboard />} />
          <Route path="/about" exact component={() => <About/>} />
          <PrivateRoute path="/contacts" exact component={() => <Contacts/>} />
          <PrivateRoute path="/addContact" exact component={() => <AddContact/>} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;