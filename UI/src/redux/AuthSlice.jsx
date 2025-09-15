import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phone: "",
  isVerified: false,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    reset: (state) => {
      (state.error = null), (state.message = null);
    },
  },
});

export const {
  setPhone,
  setVerified,
  setLoading,
  setMessage,
  setError,
  reset,
} = authSlice.actions;

export default authSlice.reducer;
