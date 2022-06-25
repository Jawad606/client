import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";


export const fetchpaybill = createAsyncThunk(
  "paybill/fetchpaybill",
  async (dispatch, getState) => {
    return await axios.get(baseUrl + "/paybill",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);
export const addpaybill = createAsyncThunk(
  "paybill/addpaybill",
  async (value, dispatch, getState) => {
    console.log(value)
    return await axios.post(baseUrl + "/paybill", value,{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);

export const updatepaybill = createAsyncThunk(
  "paybill/updatepaybill",
  async ({ id, value }, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/paybill/${id}`, value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

const storeSlice = createSlice({
  name: "paybill",
  initialState:{
    paybillList: [],
  },
  extraReducers: {
    [fetchpaybill.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchpaybill.fulfilled]: (state, action) => {
      state.status = "success";
      state.paybillList = action.payload;
    },
    [fetchpaybill.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addpaybill.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addpaybill.fulfilled]: (state, action) => {
      state.status = "success";
      state.paybillList.push(action.payload);
    },
    [addpaybill.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updatepaybill.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updatepaybill.fulfilled]: (state, action) => {
      state.status = "success";
      state.paybillList = state.paybillList.filter(
        (item) => item._id !== action.payload._id
      );
      state.paybillList.push(action.payload);
    },
    [updatepaybill.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// export const { fetchpaybill } = storeSlice.actions;
export const showPaybill = (state) => state.paybill;
export default storeSlice.reducer;
