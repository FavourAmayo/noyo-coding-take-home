import Navbar from "./components/Navbar";
import DifferPage from "./components/DifferPage";
import HomePage from "./components/HomePage";
import { Route, Switch } from "react-router-dom";
import React from "react";

function App() {

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/differ" component={DifferPage} exact/>
      </Switch>
    </div>
  );
}

export default App;
