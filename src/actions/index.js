import axios from 'axios';

const ROOT_URL = 'http://localhost:3000'

export const FETCH_USERS = 'fetch_users';
export const FETCH_USER = 'fetch_user';
export const CREATE_USER = 'create_user';
export const UPDATE_USER = 'update_user';
export const USER_LOGIN = 'user_login';

export function fetchUsers() {
  const request = axios.get(ROOT_URL+'/users');
  //console.log('request', request);
  return {
    type: FETCH_USERS,
    payload: request
  };
}

export function createUser(values, callback) {

  const request = axios.post(ROOT_URL+'/users', values).then(()=>callback());

  return {
    type: CREATE_USER,
    payload: request
  };
}

export function fetchUser(username) {
  //console.log(username);
  const request = axios.get(`${ROOT_URL+'/users'}/${username}`);
  return {
    type: FETCH_USER,
    payload: request
  };
}

export function updateUser(values, callback) {
  const request = axios.put(ROOT_URL+'/users', values).then(()=>callback());

  return {
    type: UPDATE_USER,
    payload: {
      data: request.data
    }
  }
}
//
// axios.post('/user', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
export function userLogin(values, callback) {
  const request = axios.post(ROOT_URL+'/login', values).then(()=>callback('/users'));
  //console.log(request);
  //console.log('request', request);
  //localStorage.setItem('Token', request.data.token);
  return {
    type: USER_LOGIN,
    payload: request
  };
}
