import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Base/baseUrl";
const initialState = {
  universityList: [],
};

export const fetchUni = createAsyncThunk(
  "university/fetchUni",
  async (dispatch, getState) => {
    return await axios.get(baseUrl + "/university",{headers:{Authorization:localStorage.getItem('token')}}).then((res) => res.data);
  }
);

export const addUni = createAsyncThunk(
  "university/addUni",
  async (value, dispatch, getState) => {
    return await axios
      .post(baseUrl + "/university", value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const deleteUni = createAsyncThunk(
  "university/deleteUni",
  async (id, dispatch, getState) => {
    return await axios
      .delete(`${baseUrl}/university/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);

export const updateUni = createAsyncThunk(
  "university/updateUni",
  async ({id,value}, dispatch, getState) => {
    return await axios
      .put(`${baseUrl}/university/${id}`,value,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => res.data);
  }
);



const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    University(state, action) {
      state.universityList = action.payload;
    },
    UniversityAdd(state, action) {
      state.universityList.push(action.payload);
    },
  },
  extraReducers: {
    [fetchUni.pending]: (state, action) => {
      state.status = "Loading";
    },
    [fetchUni.fulfilled]: (state, action) => {
      state.status = "success";
      state.universityList = action.payload;
    },
    [fetchUni.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addUni.pending]: (state, action) => {
      state.status = "Loading";
    },
    [addUni.fulfilled]: (state, action) => {
      state.status = "success";
     
      state.universityList.push(action.payload);
    },
    [addUni.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateUni.pending]: (state, action) => {
      state.status = "Loading";
    },
    [updateUni.fulfilled]: (state, action) => {
      state.status = "success";
      state.universityList = state.universityList.filter(
        (item) => item._id !== action.payload._id
      );
      state.universityList.push(action.payload);
    },
    [updateUni.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deleteUni.pending]: (state, action) => {
      state.status = "Loading";
    },
    [deleteUni.fulfilled]: (state, action) => {
      state.status = "success";
      state.universityList = state.universityList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteUni.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { University, UniversityAdd } = universitySlice.actions;
export const showUni = (state) => state.university;
export default universitySlice.reducer;
