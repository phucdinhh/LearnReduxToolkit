import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const initialState = {
  data: [],
  status: StatusCode.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      });
  },
});

// export const { fetchProducts } = productSlice.actions;

export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products1");
  const result = await data.json();
  return result;
});

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const result = await fetch("https://fakestoreapi.com/products").then(
//       (res) => res.json()
//     );
//     // const result = data.json();
//     dispatch(fetchProducts(result));
//   };
// }
