import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/auth/counterSlice";
import authReducer from "../features/auth/authSlice";
import imageUploadReducer from "../features/imageUpload/imageUploadSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  uploadImage: imageUploadReducer,
});

export default rootReducer;
