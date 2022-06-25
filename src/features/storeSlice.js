import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";


export const fetchStore = createAsyncThunk(
  "store/fetchStore",
  async (dispatch, getState) => {
    return await axios.get(baseUrl + "/store",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);
export const addStore = createAsyncThunk(
  "store/addStore",
  async (value, dispatch, getState) => {
    console.log(value)
    return await axios.post(baseUrl + "/store", value,{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);

export const updateStore = createAsyncThunk(
  "store/updateStore",
  async ({ id, value }, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/store/${id}`, value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState:{
    storeList: [],
  },
  extraReducers: {
    [fetchStore.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchStore.fulfilled]: (state, action) => {
      state.status = "success";
     
      state.storeList = action.payload;
    },
    [fetchStore.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addStore.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addStore.fulfilled]: (state, action) => {
      state.status = "success";
      state.storeList.push(action.payload);
    },
    [addStore.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateStore.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateStore.fulfilled]: (state, action) => {
      state.status = "success";
      state.storeList = state.storeList.filter(
        (item) => item._id !== action.payload._id
      );
      state.storeList.push(action.payload);
    },
    [updateStore.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// export const { fetchStore } = storeSlice.actions;
export const showStore = (state) => state.store;
export default storeSlice.reducer;
