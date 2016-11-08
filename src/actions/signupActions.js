import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './authActions';

export function userSignupRequest(userData){
  return dispatch => {
    return axios.post('/api/users', userData)
    .then(
      res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      }
    )
  }
}

export function isUserExists(identifier){
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}
