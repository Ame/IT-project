// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/ for whole general structure

import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Signup, Contact, Dashboard} from "./components";
function App() {
  const [token, setToken] = useState();
 /** 
  if(!token) {
     return <Home setToken={setToken} />
  }*/

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home setToken = {setToken}/>} />
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/contact" exact component={() => <Contact />} />
          {token && <Route path="/dashboard" exact component={() => <Dashboard />} />} 
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;