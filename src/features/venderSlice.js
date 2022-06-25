import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from '../Base/baseUrl';


// ,{headers:{Authorization:localStorage.getItem('token')}}
export const fetchVender = createAsyncThunk(
  "vender/fetchVender",
  async (dispatch, getState) => {
    return await axios.get(baseUrl+"/vender",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);

export const addVender = createAsyncThunk(
  "vender/addVender",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/vender", value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const deleteVender = createAsyncThunk(
  "vender/deleteVender",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/vender/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const updateVender = createAsyncThunk(
  "vender/updateVender",
  async ({id,value}, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/vender/${id}`,value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

const venderSlice = createSlice({
  name: 'vender',
  initialState:{
      venderList:[]
  },
  extraReducers: {
    [fetchVender.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchVender.fulfilled]: (state, action) => {
      state.status = "success";
    
      state.venderList = action.payload;
    },
    [fetchVender.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addVender.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addVender.fulfilled]: (state, action) => {
      state.status = "success";
      state.venderList.push(action.payload);
    },
    [addVender.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateVender.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateVender.fulfilled]: (state, action) => {
      state.status = "success";
      state.venderList = state.venderList.filter(
        (item) => item._id !== action.payload._id
      );
      state.venderList.push(action.payload);
    },
    [updateVender.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deleteVender.pending]: (state, action) => {
      state.status = "LoadingDelete";
    },
    [deleteVender.fulfilled]: (state, action) => {
      state.status = "success";
      state.venderList = state.venderList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteVender.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
  reducers: {
      fetchVender(state,action){
          state.venderList=action.payload
      },
      fetchVenderSingle(state,action){
        state.venderList.push(action.payload)
    }
  }
});

// export const {fetchVender,fetchVenderSingle} = venderSlice.actions
export const showVender=state=>state.vender
export default venderSlice.reducer