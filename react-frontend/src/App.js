import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import login from "./components/login";
import dashboard from "./components/dashboard";
import addEmployee from "./components/addEmployee";
import logout from "./components/logout";

class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Route exact path="/" component={login} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/addEmployee" component={addEmployee} />
          <Route exact path="/logout" component={logout} />
        </div>
      </Router>

    );
  }
}

export default App;
