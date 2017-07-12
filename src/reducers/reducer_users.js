import _ from 'lodash';
import { FETCH_USERS, FETCH_USER, UPDATE_USER, USER_LOGIN } from '../actions';

export default function(state = {}, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload.data, 'username');

    case FETCH_USER:
      return {...state, [action.payload.data.username]: action.payload.data};
    case UPDATE_USER:
      //console.log(action);
      //return {...state, [action.payload.data.username]: action.payload.data};
      return {...state}
    case USER_LOGIN:
      //console.log('action',action);
      // return action.payload.data.token;
      // var newState = {...state, token: action.payload.data.token};
      // console.log('state', newState);
      console.log('action', action);
      localStorage.setItem('Token', action.payload.data.token);
      return {...state, token: action.payload.data.token}
    default:
      return state;
  }
}
