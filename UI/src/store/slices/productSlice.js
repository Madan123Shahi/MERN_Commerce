import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params = "") => {
    const { data } = await axios.get(`/api/products${params}`);
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], page: 1, pages: 1, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload?.products || []; // fallback
        state.page = action.payload?.page || 1;
        state.pages = action.payload?.pages || 1;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
