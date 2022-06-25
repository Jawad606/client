import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from '../Base/baseUrl';

const initialState = {
    assignList:[]
}
export const fetchAssing = createAsyncThunk(
  "assign/fetchAssing",
  async (dispatch, getState) => {
    return await axios.get(baseUrl+"/assign",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);

export const addAssign = createAsyncThunk(
  "assign/addAssign",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/assign", value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const deleteAssign = createAsyncThunk(
  "assign/deleteAssign",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/assign/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const updateAssign = createAsyncThunk(
  "assign/updateAssign",
  async ({id,value}, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/assign/${id}`,value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

const assignSlice = createSlice({
  name: "assign",
  initialState,
  reducers: {
      fectchAssign(state,action){
        state.assignList=action.payload
      }
  },
  extraReducers: {
    [fetchAssing.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchAssing.fulfilled]: (state, action) => {
      state.status = "success";
  
      state.assignList = action.payload;
    },
    [fetchAssing.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addAssign.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addAssign.fulfilled]: (state, action) => {
      state.status = "success";
    
      state.assignList.push(action.payload);
    },
    [addAssign.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateAssign.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateAssign.fulfilled]: (state, action) => {
      state.status = "success";
      state.assignList = state.assignList.filter(
        (item) => item._id !== action.payload._id
      );
      state.assignList.push(action.payload);
    },
    [updateAssign.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deleteAssign.pending]: (state, action) => {
      state.status = "LoadingDelete";
    },
    [deleteAssign.fulfilled]: (state, action) => {
      state.status = "success";
      state.assignList = state.assignList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteAssign.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const {fectchAssign} = assignSlice.actions
export const showAssign=state=>state.assign

export default assignSlice.reducer