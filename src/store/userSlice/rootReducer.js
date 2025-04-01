// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import contactsReducer from './contactsSlice';
import groupSlice from './groupSlice';
const rootReducer = combineReducers({
  user: userReducer,
  contact:contactsReducer,
  group:groupSlice,
});

export default rootReducer;
