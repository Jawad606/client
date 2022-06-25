import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

import axios from "axios";
import { baseUrl } from "../Base/baseUrl";

export const fetchSpecific = createAsyncThunk(
  "specific/fetchSpecific",
  async (dispatch, getState) => {
    return await axios
      .get(baseUrl + "/specification", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const addSpecific = createAsyncThunk(
  "specific/addSpecific",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/specification", value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const updateSpecific = createAsyncThunk(
  "specific/updateSpecific",
  async ({ id, value }, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/specification/${id}`, value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

const specificSlice = createSlice({
  name: 'specific',
  initialState:{
      specificList:[]
  },
  extraReducers: {
    [fetchSpecific.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchSpecific.fulfilled]: (state, action) => {
      state.status = "success";
      state.specificList = action.payload;
    },
    [fetchSpecific.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addSpecific.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [addSpecific.fulfilled]: (state, action) => {
      state.status = "success";
      state.specificList.push(action.payload);
    },
    [addSpecific.rejected]: (state, action) => {
      state.status = "failed";
    },
     [updateSpecific.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateSpecific.fulfilled]: (state, action) => {
      state.status = "success";
      state.specificList = state.specificList.filter(
        (item) => item._id !== action.payload._id
      );
      state.specificList.push(action.payload);
    },
    [updateSpecific.rejected]: (state, action) => {
      state.status = "failed";
    },
  },

});


export const showSpecific=state=>state.specific
export default specificSlice.reducer