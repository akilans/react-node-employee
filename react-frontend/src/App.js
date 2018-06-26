import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import login from "./components/login"
import dashboard from "./components/dashboard"

class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Route exact path="/" component={login} />
          <Route exact path="/dashboard" component={dashboard} />
        </div>
      </Router>

    );
  }
}

export default App;
