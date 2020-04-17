import React from 'react';
import './App.css';
import Navbar from '../src/components/Layout/Navbar'
import Footer from "../src/components/Layout/Footer";
import Landing from "../src/components/Layout/Landing";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Register from '../src/components/Auth/Register'
import Login from "../src/components/Auth/Login";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
