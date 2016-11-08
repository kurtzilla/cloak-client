import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth.js';

export default combineReducers({
  flashMessages,
  auth
});
