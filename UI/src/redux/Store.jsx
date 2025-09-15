import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/AuthSlice";
import languageReducer from "../redux/LanguageSlice";

export const store = configureStore({
  reducer: { auth: authReducer, language: languageReducer },
});
