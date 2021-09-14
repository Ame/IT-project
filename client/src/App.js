// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure

import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Login, Signup, Contact, Dashboard} from "./components";
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Login />} />
          <Route path="/signup" exact component={() => <Signup />} />
          <PrivateRoute path="/dashboard" exact component={() => <Dashboard />} />
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;