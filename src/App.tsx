import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Route, Switch } from "react-router";
import Todo from "./features/todo/Todo";

function App() {
  return (
    <Switch>
      <Route path="/" component={Todo} />
    </Switch>
  );
}

export default App;
