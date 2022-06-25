import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";

export const fetchCatagory = createAsyncThunk(
  "catagory/fetchCatagory",
  async (dispatch, getState) => {
    return await axios
      .get(baseUrl + "/catagory", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const addCatagoryMulti = createAsyncThunk(
  "catagory/addCatagoryMulti",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/catagory", value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const addCatagory = createAsyncThunk(
  "catagory/addCatagory",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/catagory", value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const deleteCatagory = createAsyncThunk(
  "catagory/deleteCatagory",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/catagory/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const updateCatagory = createAsyncThunk(
  "catagory/updateCatagory",
  async ({ id, value }, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/catagory/${id}`, value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

const catagorySlice = createSlice({
  name: "catagory",
  initialState: {
    catagoryList: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchCatagory.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchCatagory.fulfilled]: (state, action) => {
      state.status = "success";
      state.catagoryList = action.payload;
    },
    [fetchCatagory.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addCatagory.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addCatagory.fulfilled]: (state, action) => {
      state.status = "success";
      state.catagoryList.push(action.payload);
    },
    [addCatagory.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addCatagoryMulti.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addCatagoryMulti.fulfilled]: (state, action) => {
      state.status = "success";
      for (var i = 0; i < Object.keys(action.payload).length; i++) {
        state.catagoryList.push(action.payload[i]);
      }
    },
    [addCatagoryMulti.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateCatagory.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateCatagory.fulfilled]: (state, action) => {
      state.status = "success"
      state.catagoryList = state.catagoryList.filter(
        (item) => item._id !== action.payload._id
      );
      state.catagoryList.push(action.payload);
    },
    [updateCatagory.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deleteCatagory.pending]: (state, action) => {
      state.status = "LoadingDelete";
    },
    [deleteCatagory.fulfilled]: (state, action) => {
      state.status = "success";
      state.catagoryList = state.catagoryList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteCatagory.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const showCatagory = (state) => state.catagory;
export default catagorySlice.reducer;
