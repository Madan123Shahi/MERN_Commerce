import { createSlice } from "@reduxjs/toolkit";

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

export default languageSlice.reducer;
