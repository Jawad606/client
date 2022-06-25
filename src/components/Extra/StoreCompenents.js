// import React from "react";
// import { useSelector } from "react-redux";
// import { showStore } from "../features/storeSlice";
// import { GetDataStore } from "./GetUni";
// import { Table } from 'reactstrap';
// function StoreCompenents() {
//   const storeShow = useSelector(showStore);
//   const RenderStore = storeShow.map((data, i) => {
//     const { catagory, item, _id, quantity } = data;
//     const { catagoryName } = catagory;
//     const { itemName } = item;
//     return (
//       <tr key={i}>
//         <td>{_id}</td>
//         <td>{catagoryName}</td>
//         <td>{itemName}</td>
//         <td>{quantity}</td>
//       </tr>
//     );
//   });
//   return (
//     <div>
//       <h1>Store Room Data</h1>
//       <Table>
//         <thead>
//           <tr>
//           <th>id</th>
//           <th>Catagory Name</th>
//           <th>Item Name</th>
//           <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody>{RenderStore}</tbody>
//       </Table>
//     </div>
//   );
// }

// export default StoreCompenents;
