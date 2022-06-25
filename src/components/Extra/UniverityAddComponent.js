// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showCatagory } from "../features/catagorySlice";
// import { showItem } from "../features/itemSlice";
// import { fetchStore, showStore } from "../features/storeSlice";
// import { University, UniversityAdd } from "../features/universitySlice";
// import { Alert } from "reactstrap";

// function UniverityAddComponent() {
//   const {catagoryList} = useSelector(showCatagory);
//   const {itemList} = useSelector(showItem);
//   const checkIdStore = useSelector(showStore);
//   const [catagoryID, setcatagoryID] = useState("");
//   const [itemId, setitemId] = useState("");
//   const [quantity, setquanitity] = useState(0);
//   const [Purchaser, setPurchaser] = useState("");
//   const [checkAlter, setcheckAlter] = useState(false);
//   const dispatch = useDispatch();

//   const UpdateStore = (id, quantityOld) => {
//     axios
//       .put(`http://localhost:3000/store/${id}`, {
//         quantity: parseInt(quantityOld) + parseInt(quantity),
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
//       .post("http://localhost:3000/university", {
//         catagory: catagoryID,
//         item: itemId,
//         quantity: parseInt(quantity),
//         purchaser: Purchaser,
//       })
//       .then((response) => {
//         setcheckAlter(true);
//         dispatch(University(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     checkStoreID();
//     setquanitity("");
//     setPurchaser("");
//     setitemId("");
//     setcatagoryID("");
//     setTimeout(() => {
//       setcheckAlter(false);
//     }, 5000);
//   };

//   const handleChangeQun = (e) => {
//     setquanitity(e.target.value);
//   };
//   const handleChangePur = (e) => {
//     setPurchaser(e.target.value);
//   };
//   const handleChangeCat = (e) => {
//     setcatagoryID(e.target.value);
//   };
//   const handleChangeItem = (e) => {
//     setitemId(e.target.value);
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
//         <input
//           type="number"
//           pattern="[0-9]*"
//           value={quantity}
//           onChange={handleChangeQun}
//         />
//         <input type="text" value={Purchaser} onChange={handleChangePur} />
//         <input type="submit" value="Submit" />
//       </form>
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }

// export default UniverityAddComponent;
