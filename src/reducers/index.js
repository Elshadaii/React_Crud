import { combineReducers } from "redux";
import jobs from "./jobs";
import auth from './auth'
import message from './message'

export default combineReducers({
    auth,
    jobs,
    message
});