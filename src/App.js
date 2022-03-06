import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Splash from './screens/Splash';
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import AppContent from "./screens/AppContent";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <Splash />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/signup" exact>
            <Signup />
          </Route>

          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/app-content" exact>
            <AppContent />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;
