import { createSlice,createAsyncThunk,  } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from '../Base/baseUrl';



export const login =createAsyncThunk(
  'user/login',
  (value,dispatch,getState)=>{
    return  axios.post(baseUrl+"/users/login",value).then((res)=>res.data)
  }
)

export const logout =createAsyncThunk(
  'user/logout',
  async(dispatch,getState)=>{
    return await axios.get(baseUrl + "/users/logout").then((res)=>res.data)
  }
)

export const changepassword =createAsyncThunk(
  'user/changepassword',
  async({id,value},dispatch,getState)=>{
    return await axios.post(`${baseUrl}/users/changepassword/${id}`,value).then((res)=>res.data)
  }
)

export const adduser =createAsyncThunk(
  'user/adduser',
  async(value,dispatch,getState)=>{
   
    return await axios.post(`${baseUrl}/users/signup`,value).then((res)=>res.data)
  }
)

const initialState = {
  userList:[],
  isLoading:false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
extraReducers:{
  [login.pending]:(state,action)=>{
    state.status='LoadingLogin'
  },
  [login.fulfilled]:(state,action)=>{
    state.status='Loginsuccess'
    state.userList=action.payload
    localStorage.setItem('User',action.payload.user.firstname)
    localStorage.setItem('Data', JSON.stringify(action.payload.user))
    localStorage.setItem("token","Bearer " + action.payload.token);
    localStorage.setItem("auth",true);
  },
  [login.rejected]:(state,action)=>{
    state.status='failed'
  },

  [logout.pending]:(state,action)=>{
    state.status='LoadingLogout'
  },
  [logout.fulfilled]:(state,action)=>{
    state.status='success'
    localStorage.clear();
    state.userList=action.payload
  },
  [logout.rejected]:(state,action)=>{
    state.status='failed'
  },

  [changepassword.pending]:(state,action)=>{
    state.status='LoadingChangePassword'
  },
  [changepassword.fulfilled]:(state,action)=>{
    state.status='success'
    state.userList=action.payload
  },
  [changepassword.rejected]:(state,action)=>{
    state.status='failed'
  },

  [adduser.pending]:(state,action)=>{
    state.status='LoadingAddUser'
  },
  [adduser.fulfilled]:(state,action)=>{
    state.status='success'
  },
  [adduser.rejected]:(state,action)=>{
    state.status='failed'
  },
},
});

export const {fetchUser,startLoadingUser,setLogout} = userSlice.actions
export const showUser=state=>state.user
export default userSlice.reducer