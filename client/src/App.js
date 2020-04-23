import React from 'react';
import './App.css';
import Navbar from '../src/components/Layout/Navbar'
import Footer from "../src/components/Layout/Footer";
import Landing from "../src/components/Layout/Landing";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from '../src/components/Auth/Register'
import Login from "../src/components/Auth/Login";
import {Provider} from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser,logoutUser} from './actions/authAction'
import Dashboard from './components/Dashboard/Dashboard'
import { clearCurrentProfile } from './actions/profileAction';

import EditProfile from './components/editProfile/editProfile'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/createProfile/CreateProfile'
import AddExperience from './components/addDetails/addExperience'
import AddEducation from "./components/addDetails/addEducation";
import Profiles from './components/Profiles/profiles'

// checking for storage
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken)
  // calling the setcurrentuser action and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // check for expire Token so i can log the user out when the token expires
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    // logout user
    store.dispatch(logoutUser())
    // clear current profile
    store.dispatch(clearCurrentProfile())
    // redirect to login
    window.location.href ='/login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profiles} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
