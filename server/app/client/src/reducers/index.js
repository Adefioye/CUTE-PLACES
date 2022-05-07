import { combineReducers } from "redux";

import placeReducer from "./placeReducer";
import authReducer from "./authReducer";

export default combineReducers({
  places: placeReducer,
  auth: authReducer,
});
