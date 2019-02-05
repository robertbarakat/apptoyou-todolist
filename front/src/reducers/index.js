import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';

const allReducers = combineReducers({
  authReducer,
  userReducer,
})

export default allReducers;