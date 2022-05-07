import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/places" />} />
          <Route path="/places" exact component={Home} />
          <Route path="/places/search" exact component={Home} />
          <Route path="/places/:id" exact component={PlaceDetails} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/places" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
