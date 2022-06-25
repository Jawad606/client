// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import {  fetchCatagorySingle } from "../features/catagorySlice";
// import ItemsComponent from "./ItemsComponent";
// function CatagoryComponent() {
//   const [Catagory, setCatagory] = useState("");
//   const dispatch=useDispatch();
//   const HandleSubmit = (event) => {
//     event.preventDefault();
  
  
//     axios.post('http://localhost:3000/catagory',{
//       catagoryName: Catagory,
//     })
//     .then(response => {
//       console.log(response.data)
//       dispatch(fetchCatagorySingle(response.data))
//   })
//     .catch(function (error) {
//       console.log(error);
//     });
//     setCatagory("")
//   };
//   const handleChangePur = (e) => {
//     setCatagory(e.target.value);
//   };

//   return (
//     <>
//       <div className="center">
//     <h1>Add Data</h1>
//     <form onSubmit={HandleSubmit}>
//       <input type="text" value={Catagory} onChange={handleChangePur} />
//       <input type="submit" value="Submit" />
//     </form>
//     <br />
//     <br />
//     <br />
//     </div>
//     <ItemsComponent/>
//     </>
//   )
// }

// export default CatagoryComponent