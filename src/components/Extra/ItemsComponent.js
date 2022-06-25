// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showCatagory } from "../features/catagorySlice";
// import { fetchItemSingle } from "../features/itemSlice";
// import { fetchStore } from "../features/storeSlice";
// function ItemsComponent() {
//   const {catagoryList} = useSelector(showCatagory);
//   const [catagoryID, setcatagoryID] = useState("");
//   const [item, setitem] = useState("");
//   const dispatch=useDispatch();
//   const addStore=(itemId,catId)=>{
//     axios
//       .post("http://localhost:3000/store", {
//         catagory: catId,
//         item: itemId,
//         quantity: 0,
//       })
//       .then((response) => {
//         dispatch(fetchStore(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   const addAssign=(itemId,catId)=>{
//     axios
//       .post("http://localhost:3000/assignStore", {
//         catagory: catId,
//         item: itemId,
//         quantity: 0,
//       })
//       .then((response) => {
//         dispatch(fetchStore(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   const HandleSubmit = (event) => {
//     event.preventDefault();
//    console.log(
//      {
//       catagory: catagoryID,
//       item: item,
//      }
//    )
//     axios.post('http://localhost:3000/item',{
//       catId: catagoryID,
//       itemName: item,
//     })
//     .then(response => {
//       addStore(response.data._id,response.data.catId)
//       addAssign(response.data._id,response.data.catId)
//       dispatch(fetchItemSingle(response.data))
//   })
//     .catch(function (error) {
//       console.log(error);
//     });
//     setitem("")
//     setcatagoryID("")
//   };
//   const handleChangeCat = (e) => {
//     setcatagoryID(e.target.value);
//   };
//   const handleChangeItem = (e) => {
//     setitem(e.target.value);
//   };

//   return (
//     <div>
//         <h1>Add Data</h1>
//       <form onSubmit={HandleSubmit}>
//         <select value={catagoryID} onChange={handleChangeCat}>
//           <option value="0">Please select Catagory</option>
//           {catagoryList.map((data, i) => (
//             <option key={i} value={data._id}>
//               {data.catagoryName}
//             </option>
//           ))}
//         </select>
      
//         <input type="text" value={item} onChange={handleChangeItem} />
//         <input type="submit" value="Submit" />
//       </form>
//       <br />
//       <br />
//       <br />
//     </div>
//   )
// }

// export default ItemsComponent