import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'; 
import jwt_decode from 'jwt-decode'; 


export const registerUser= userData => dispatch => {    // (userData,dispatch) || userData=> dispatch=>      both has a diff

        
axios
  .post('/api/users/register', userData)
  .then (res => console.log(res.data))
  .catch(err=> 
    dispatch ({

        type: 'GET_ERRORS',
        payload: err.response.data     // errors coming from backend
    })
    );  // give data to the backend from frnt-end react
 };

 export const loginUser = userData => dispatch => {
   axios
   .post ('/api/users/login', userData)
   .then(res=> {
     //save to local storage
     const { token }= res.data;
     // Set token to local storage
     localStorage.setItem('jwtToken', token);
     //set token to Auth header
     setAuthToken(token);
     //decode token to get user data
     const decoded= jwt_decode(token);
   // set current user
   dispatch (setCurrentUser(decoded));
   
    })
   .catch(err => 
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    })
    );
 };

 // set logged in user
 export const setCurrentUser= (decoded) => {
   return {
     type: 'SET_CURRENT_USER',
     payload: decoded
   }
 };

 // log out user
 export const logoutUser= () => dispatch => {
   // remove token from localStorage
 localStorage.removeItem('jwtToken');
 //remove auth header for future request
setAuthToken(false);
// set current user to {} which will set isAuthenticated to false 
 dispatch(setCurrentUser({}));

}
   
