import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "en",
  name: "English",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      //   state.name = action.payload;
      return action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});
