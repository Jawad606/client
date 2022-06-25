import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (dispatch, getState) => {
    return await axios
      .get(baseUrl + "/payment", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/payment", value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);


export const deletePayment = createAsyncThunk(
  "payment/deletePayment",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/payment/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async ({ id, value }, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/payment/${id}`, value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentList: [],
  },
  extraReducers: {
    [fetchPayment.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchPayment.fulfilled]: (state, action) => {
      state.status = "success";
      state.paymentList = action.payload;
    },
    [fetchPayment.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addPayment.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [addPayment.fulfilled]: (state, action) => {
      state.status = "success";
      state.paymentList.push(action.payload);
    },
    [addPayment.rejected]: (state, action) => {
      state.status = "failed";
    },
      [updatePayment.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updatePayment.fulfilled]: (state, action) => {
      state.status = "success"
      state.paymentList = state.paymentList.filter(
        (item) => item._id !== action.payload._id
      );
      state.paymentList.push(action.payload);
    },
    [updatePayment.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deletePayment.pending]: (state, action) => {
      state.status = "LoadingDelete";
    },
    [deletePayment.fulfilled]: (state, action) => {
      state.status = "success";
      state.paymentList = state.paymentList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deletePayment.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const showPayment = (state) => state.payment;
export default paymentSlice.reducer;
