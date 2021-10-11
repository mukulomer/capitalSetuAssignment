import React from "react";
import "./style/styles.css";
import Row from "./components/Row";
import request from "./components/request";
import AccountMenu from "./components/AccountMenu";
import Popular from "./components/Popular.js";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Switch, Route, Redirect } from "react-router-dom";
import Favorites from "./components/Fav";
import Latest from "./components/Latest";

export default function App() {
  return (
    <div>
      <AccountMenu props />
      <h1 className="header">Movie Adda </h1>
      <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route
        path="/discover/popular"
        render={(props) => <Popular display={true} {...props} />}
      />
     <Route exact path="/">
      <Redirect to="/discover/popular" />
     </Route>
      <Route default path="/discover/latest" component={Latest} />
      <Route default path="/discover/favourites" component={Favorites} />
    </Switch>
    </div>
  );
}