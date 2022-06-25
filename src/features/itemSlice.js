import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";

// ,{headers:{Authorization:localStorage.getItem('token')}}

export const fetchItem = createAsyncThunk(
  "item/fetchItem",
  async (dispatch, getState) => {
    return await axios.get(baseUrl+"/item",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);

export const addItem = createAsyncThunk(
  "item/addItem",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/item", value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/item/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({id,value}, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/item/${id}`,value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    itemList: [],
    isLoading: false,
  },


  extraReducers: {
    [fetchItem.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.status = "success"
      state.itemList = action.payload;
    },
    [fetchItem.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addItem.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.itemList.push(action.payload);
    },
    [addItem.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateItem.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.itemList = state.itemList.filter(
        (item) => item._id !== action.payload._id
      );
 
      state.itemList.push(action.payload);
    },
    [updateItem.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deleteItem.pending]: (state, action) => {
      state.status = "LoadingDelete";
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.itemList = state.itemList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteItem.rejected]: (state, action) => {
      state.status = "failed";
    },
  },

});

export const showItem = state => state.item;
export default itemSlice.reducer;
