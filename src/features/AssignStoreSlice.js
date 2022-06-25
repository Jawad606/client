import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from '../Base/baseUrl';

const initialState = {
    AssignListStore:[]
}

export const fetchAssigns = createAsyncThunk(
    "assignStore/fetchAssigns",
    async (dispatch, getState) => {
      return await axios.get(baseUrl+"/assignStore",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
    }
  );
  export const addAssigns = createAsyncThunk(
    "assignStore/addAssings",
    async (value, dispatch, getState) => {
      return await axios
        .post(baseUrl + "/assignStore", value,{headers:{Authorization:localStorage.getItem('token')}})
        .then((res) => res.data);
    }
  );
  
  export const updateAssigns = createAsyncThunk(
    "assignStore/updateAssigns",
    async ({id,value}, dispatch, getState) => {
      return await axios
        .put(`${baseUrl}/assignStore/${id}`,value,{headers:{Authorization:localStorage.getItem('token')}})
        .then((res) => res.data);
    }
  );
  
  

const AssignSlice = createSlice({
  name: "assignStore",
  initialState,
  reducers: {
      fetchAssignStore(state,action){
          state.AssignListStore=action.payload
      }
  },
  extraReducers: {
    [fetchAssigns.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchAssigns.fulfilled]: (state, action) => {
      state.status = "success";
      state.AssignListStore = action.payload;
    },
    [fetchAssigns.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addAssigns.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addAssigns.fulfilled]: (state, action) => {
      state.status = "success";
      state.AssignListStore.push(action.payload);
    },
    [addAssigns.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateAssigns.pending]: (state, action) => {
      state.status = "LoadingUpdate";
    },
    [updateAssigns.fulfilled]: (state, action) => {
      state.status = "success";
      state.AssignListStore = state.AssignListStore.filter(
        (item) => item._id !== action.payload._id
      );
      state.AssignListStore.push(action.payload);
    },
    [updateAssigns.rejected]: (state, action) => {
      state.status = "failed";
    },
  },

});

// export const {fetchAssignStore} = AssignSlice.actions
export const showAssignStore=state=>state.assignStore
export default AssignSlice.reducer