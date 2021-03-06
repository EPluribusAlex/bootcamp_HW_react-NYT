import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from "./components";

class App extends Component {
  render() {
    return (
      <Router>
    		<div className="wrapper">
        	<Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
