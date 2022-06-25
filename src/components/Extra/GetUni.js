
import { useDispatch } from 'react-redux';
import { University } from '../features/universitySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { fetchCatagory,startLoading } from '../features/catagorySlice';
import { fetchItem , startLoadingItem} from '../features/itemSlice';
import { fetchStore } from '../features/storeSlice';
import { fectchAssign } from '../features/assignSlice';
import { fetchAssignStore } from '../features/AssignStoreSlice';
import { baseUrl } from '../Base/baseUrl';
import { fetchVender } from '../features/venderSlice';


// export function GetData(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//       const response= await axios
//       .get(baseUrl+"/university")
//       .catch((err)=>{console.log("Error",err)});
//      dispatch(University(response.data))
    
//     }
    
//     useEffect(() => {
//         fetchProducts();
//     });
// }
// export function GetDataCatagory(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//         dispatch(startLoading())
//       const response= await axios
//       .get(baseUrl+"/catagory",{headers:{Authorization:localStorage.getItem('token')}})
//       .catch((err)=>{console.log("Error",err)});
//      dispatch(fetchCatagory(response.data))
    
//     }
    
//     useEffect(() => {
//         fetchProducts();
//     });
// }

// export function GetDataItem(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//         dispatch(startLoadingItem())
//       const response= await axios
//       .get(baseUrl+"/item")
//       .catch((err)=>{console.log("Error",err)});
//      dispatch(fetchItem(response.data))
    
//     }
    
//     useEffect(() => {
//         fetchProducts();
//     });
// }



// export function GetDataStore(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//       const response= await axios
//       .get(baseUrl+"/store")
//       .catch((err)=>{console.log("Error",err)});
//          dispatch(fetchStore(response.data))
    
//     }
    
//     useEffect(() => {
//         fetchProducts();
//     });
// }


// export function GetDataAssign(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//       const response= await axios
//       .get(baseUrl+"/assign")
//       .catch((err)=>{console.log("Error",err)});
//          dispatch(fectchAssign(response.data))
    
//     }
    
//     useEffect(() => {
//         fetchProducts();
//     });
// }
// export function GetDataAssignStore(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//       const response= await axios
//       .get(baseUrl+"/assignStore")
//       .catch((err)=>{console.log("Error",err)});
//          dispatch(fetchAssignStore(response.data))
//     }
//     useEffect(() => {
//         fetchProducts();
//     });
// }
// export function GetDataVender(){
//     const dispatch=useDispatch();
//     const fetchProducts=async () =>{
//       const response= await axios
//       .get(baseUrl+"/vender")
//       .catch((err)=>{console.log("Error",err)});
//          dispatch(fetchVender(response.data))
//     }
//     useEffect(() => {
//         fetchProducts();
//     });

    
// }
