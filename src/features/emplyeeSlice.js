import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from '../Base/baseUrl';

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (dispatch, getState) => {
    return await axios
      .get(baseUrl + "/employee", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/employee", value, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => res.data);
  }
);
const emplyeeSlice = createSlice({
  name: 'employee',
  initialState:{
    employeeList:[]
  },
  extraReducers: {
    [fetchEmployee.pending]: (state, action) => {
      state.status = "Loadingfetch";
    },
    [fetchEmployee.fulfilled]: (state, action) => {
      state.status = "success";
      state.employeeList = action.payload;
    },
    [fetchEmployee.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addEmployee.pending]: (state, action) => {
      state.status = "LoadingAdd";
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.status = "success";
      state.employeeList.push(action.payload);
    },
    [addEmployee.rejected]: (state, action) => {
      state.status = "failed";
    },
  }
});

export const showEmployee=state=>state.employee

export default emplyeeSlice.reducer