import React from 'react';
import './App.css';
import Navbar from '../src/components/Layout/Navbar'
import Footer from "../src/components/Layout/Footer";
import Landing from "../src/components/Layout/Landing";



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Landing/>
      <Footer/>
    </div>
  );
}

export default App;
