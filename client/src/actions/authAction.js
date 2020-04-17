import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
import axios from "axios";
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// Register User using actions
export const registerUser = (userData,history) =>dispatch=>{
     axios
       .post("/api/users/register", userData)
       .then(res => {
        //  console.log(res.data);
        history.push('/login')
       })
       .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
       );
}

// login get  user token
export const loginUser =(userData) => dispatch=>{
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //savin to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token)
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

// set logged in user
export const setCurrentUser = decoded =>{
  return{
    type:SET_CURRENT_USER,
    payload:decoded
  }
}

// log user out
export const logoutUser =()=> dispatch =>{
  // remove token from localStorage
  localStorage.removeItem('jwtToken')
  // remove auth header for future request
  setAuthToken(false)
  // setting current user to empty object which will set isAuthenicated to false
  dispatch(setCurrentUser({}))
}