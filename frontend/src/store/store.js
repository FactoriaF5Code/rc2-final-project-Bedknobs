import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/reducer";
import { postReducer } from "./Post/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
