import { combineReducers } from "redux";
import games from "./games";
import timer from "./timer";

export default combineReducers({
  timer,
  games
});
