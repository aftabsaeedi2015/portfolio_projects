import { createStore, combineReducers } from "redux";
import { userReducer } from "./reducers";

const reducers = combineReducers({
  user: userReducer,
});

const store = createStore(reducers);

export default store;
