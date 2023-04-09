import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import messageReducer from "./reducers/message";
import contestReducer from "./reducers/contest";

const middleware = [thunk];

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    contest: contestReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [composeWithDevTools(applyMiddleware(...middleware))],
});

export default store;