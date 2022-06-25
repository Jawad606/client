import { configureStore } from '@reduxjs/toolkit';
import universityReducer from '../features/universitySlice';
import catagoryReducer from '../features/catagorySlice';
import itemReducer from '../features/itemSlice';
import storeReducer from '../features/storeSlice';
import AssignReducer from '../features/AssignStoreSlice';
import assignReducer from '../features/assignSlice';
import userReducer from '../features/userSlice';
import venderReducer from '../features/venderSlice';
import paymentReducer from '../features/paymentSlice';
import paybillReducer from '../features/paybillSlice';
import employeeReducer from '../features/emplyeeSlice';
import specificReducer from '../features/specificSlice';
import tagReducer from '../features/tagSlice';
export const store = configureStore({
  reducer: {
    university: universityReducer,
    catagory:catagoryReducer,
    item:itemReducer,
    store:storeReducer,
    assignStore:AssignReducer,
    assign:assignReducer,
    user:userReducer,
    vender:venderReducer,
    payment:paymentReducer,
    paybill:paybillReducer,
    specific:specificReducer,
    employee:employeeReducer,
    tag:tagReducer,
  },
});
