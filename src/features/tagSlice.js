import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";

export const fetchtags = createAsyncThunk(
  "tag/fetchtags",
  async (dispatch, getState) => {
    return await axios
      .get(baseUrl + "/tag", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const addtags = createAsyncThunk(
  "tag/addtags",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/tag", value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);
export const deletetags = createAsyncThunk(
  "tag/deletetags",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/tag/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const updatetags = createAsyncThunk(
  "tag/updatetags",
  async (newArr, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/tag`, newArr, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tagList: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchtags.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchtags.fulfilled]: (state, action) => {
      state.status = "success";
      state.tagList = action.payload;
    },
    [fetchtags.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addtags.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addtags.fulfilled]: (state, action) => {
      state.status = "success";
      state.tagList = action.payload;
    },
    [addtags.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updatetags.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updatetags.fulfilled]: (state, action) => {
      state.status = "success"
         state.tagList = action.payload;
      // state.tagList = state.tagList.filter(
      //   (item) => item._id !== action.payload._id
      // );
      // state.tagList.push(action.payload);
    },
    [updatetags.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deletetags.pending]: (state, action) => {
      state.status = "LoadingDelete";
    },
    [deletetags.fulfilled]: (state, action) => {
      state.status = "success";
      state.tagList = state.tagList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deletetags.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const showTags = (state) => state.tag;
export default tagSlice.reducer;
