import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./users/userReducer";
import thunk from "redux-thunk";
import { noteReducer } from "./notes/noteReducer";

let rootReducer = combineReducers({
  userReducer: userReducer,
  noteReducer: noteReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
