// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showCatagory } from "../features/catagorySlice";
// import { showItem } from "../features/itemSlice";
// import { fetchStore, showStore } from "../features/storeSlice";
// import { fectchAssign } from "../features/assignSlice";
// import {  fetchAssignStore, showAssignStore } from "../features/AssignStoreSlice";

// function AddAssignerComponent() {
//   const {catagoryList} = useSelector(showCatagory);
//   const {itemList} = useSelector(showItem);
//   const checkIdStore = useSelector(showStore);
//   const checkIdAssign = useSelector(showAssignStore);
//   const [catagoryID, setcatagoryID] = useState("");
//   const [itemId, setitemId] = useState("");
//   const [quantity, setquanitity] = useState(0);
//   const [Assigner, setAssigner] = useState("");
//   const [checkAlter, setcheckAlter] = useState(false);
//   const [department, setdepartment] = useState("");
//   const [itemFor, setitemFor] = useState("");
//   const dispatch = useDispatch();

//   const UpdateAssignStore = (id, quantityOld) => {
//     axios
//       .put(`http://localhost:3000/assignStore/${id}`, {
//         quantity: parseInt(quantityOld) + parseInt(quantity),
//       })
//       .then((response) => {
//         console.log(response.data);
//         dispatch(fetchAssignStore(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
//   const UpdateStore = (id, quantityOld) => {
//     axios
//       .put(`http://localhost:3000/store/${id}`, {
//         quantity: parseInt(quantityOld) - parseInt(quantity),
//       })
//       .then((response) => {
//         console.log(response.data);
//         dispatch(fetchStore(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
//   const checkStoreID = () => {
//     checkIdStore
//       .filter(
//         (item) => item.catagory._id === catagoryID && item.item._id === itemId
//       )
//       .map((item) => UpdateStore(item._id, item.quantity));
//   };
//   const checkAssignStoreId = () => {
//     checkIdAssign
//       .filter(
//         (item) => item.catagory._id === catagoryID && item.item._id === itemId
//       )
//       .map((item) => UpdateAssignStore(item._id, item.quantity));
//   };
//   const RenderAlter = () => {
//     return (
//       <div>
//         <div className="alert alert-success" role="alert">
//           Data is Add
//         </div>
//       </div>
//     );
//   };
//   const HandleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:3000/assign", {
//         catagory: catagoryID,
//         item: itemId,
//         quantity: parseInt(quantity),
//         assigner: Assigner,
//         Department: department,
//         ItemFor: itemFor,
//       })
//       .then((response) => {
//         setcheckAlter(true);
//         dispatch(fectchAssign(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     setTimeout(() => {
//       setcheckAlter(false);
//     }, 3000);
//     checkStoreID();
//     checkAssignStoreId();
//     setquanitity("");
//     setAssigner("");
//     setitemId("");
//     setcatagoryID("");
//     setdepartment("");
//     setitemFor("");
//   };

//   const handleChangeQun = (e) => {
//     setquanitity(e.target.value);
//   };
//   const handleChangePur = (e) => {
//     setAssigner(e.target.value);
//   };
//   const handleChangeCat = (e) => {
//     setcatagoryID(e.target.value);
//   };
//   const handleChangeItem = (e) => {
//     setitemId(e.target.value);
//   };
//   const handleChangeDepart = (e) => {
//     setdepartment(e.target.value);
//   };
//   const handleChangeItemFor = (e) => {
//     setitemFor(e.target.value);
//   };

//   return (
//     <div className="center">
//       {checkAlter && <RenderAlter />}
//       <h1>Add Data</h1>
//       <form onSubmit={HandleSubmit}>
//         <select value={catagoryID} onChange={handleChangeCat}>
//           <option value="0">Please select Catagory</option>
//           {catagoryList.map((data, i) => (
//             <option key={i} value={data._id}>
//               {data.catagoryName}
//             </option>
//           ))}
//         </select>
//         <select value={itemId} onChange={handleChangeItem}>
//           <option value="0">Please select item</option>
//           {itemList
//             .filter((sHowItem) => sHowItem.catId === catagoryID)
//             .map((data, i) => {
//               return (
//                 <option key={i} value={data._id}>
//                   {data.itemName}
//                 </option>
//               );
//             })}
//         </select>
//         <select value={department} onChange={handleChangeDepart}>
//           <option value="">Please Select Department</option>
//           <option value="Ms Department">Ms Department</option>
//           <option value="Cs Department">Cs Department</option>
//           <option value="ME Department">ME Department</option>
//           <option value="EE Department">EE Department</option>
//           <option value="CE Department">CE Department</option>
//         </select>
//         <select value={itemFor} onChange={handleChangeItemFor}>
//           <option value="">Please Select Item</option>
//           <option value="Class">Class</option>
//           <option value="Lab">Lab</option>
//           <option value="Faculty">Faculty</option>
//         </select>
//         <input
//           type="number"
//           pattern="[0-9]*"
//           value={quantity}
//           onChange={handleChangeQun}
//         />
//         <input type="text" value={Assigner} onChange={handleChangePur} />
//         <input type="submit" value="Submit" />
//       </form>
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }

// export default AddAssignerComponent;
