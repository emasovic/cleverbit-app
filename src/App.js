import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { COMMENTS, HOME } from "./lib/routes";

import Nav from "./components/Nav";

import PostsPage from "./views/PostsPage";
import UserComments from "./views/UserComments";

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact path={HOME} component={PostsPage} />
      <Route exact path={COMMENTS} component={UserComments} />
    </Switch>
  </Router>
);

export default App;
