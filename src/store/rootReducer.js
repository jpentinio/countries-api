import { combineReducers } from "redux";
import reducers from "../redux/reducers";

const rootReducer = combineReducers({
  countriesAPI: reducers,
});

export default rootReducer;
