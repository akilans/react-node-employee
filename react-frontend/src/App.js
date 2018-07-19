import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import login from "./components/login";
import dashboard from "./components/dashboard";
import addEmployee from "./components/addEmployee";
import editEmployee from "./components/editEmployee";
import logout from "./components/logout";


class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Route exact path="/" component={login} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/addEmployee" component={addEmployee} />
          <Route exact path="/editEmployee/:id" component={editEmployee} />
          <Route exact path="/logout" component={logout} />
        </div>
      </Router>
    );
  }
}

export default App;
