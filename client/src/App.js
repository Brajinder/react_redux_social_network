import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser,logoutUser} from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
import { clearCurrentProfile } from './actions/profileActions';
import  createdefault from './components/createProfile/createProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Post from './components/posts/Posts'; 
import Profile from './components/profile/Profile';


if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded= jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime=Date.now() /1000;

   if (decoded.exp <currentTime) {
     store.dispatch(logoutUser());

     //Todo: clear current profile
    store.dispatch(clearCurrentProfile());
     // redirect to login
   window.location.href ='/login'
    }


}

class App extends Component {
  render() {
    return (
      <Provider store ={store}>
      <Router>
      <div className="App">
      <Navbar/>
      
        <Route exact path="/" component={Landing}/>
        <div className="container">
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/create-profile" component={createdefault}/>
        <Route exact path="/edit-profile" component={EditProfile}/>
        <Route exact path="/add-experience" component={AddExperience}/>
        <Route exact path="/add-education" component={AddEducation}/> 
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:handle" component={Profile}/>
        <Route exact path="/post" component={Post}/>
     

       
        </div>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}
export default App;
