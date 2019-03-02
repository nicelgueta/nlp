import { combineReducers } from "redux";

//import reducers here
import dashboard from './reducers/dashboard_reducer';
import grouper from './reducers/grouping_reducer';
export default combineReducers({
  dashboard,
  grouper
})
