import { combineReducers } from "redux";
import voteReducer from "./voteReducer";

export default combineReducers({
  vote: voteReducer
});
