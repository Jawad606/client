// import axios from "axios";
// import React from "react";
// import { useSelector } from "react-redux";
// import { showUni, University } from "../features/universitySlice";
// import { Table } from 'reactstrap';
// const RenderShow = () => {
//   University();
//   const showData = useSelector(showUni);
//   if (showData.length === 0) {
//     return <tr><td><h1>No found</h1></td></tr> ;
//   } else {
//     const renderList = showData.map(({_id,catagory,item,quantity,purchaser,createdAt}, i) => {
//       return (
//         <tr key={i}>
//           <td>{_id}</td>
//           <td>{catagory.catagoryName}</td>
//           <td>{item.itemName}</td>
//           <td>{quantity}</td>
//           <td>{purchaser}</td>
//           <td>
//             {new Intl.DateTimeFormat("en-US", {
//              dateStyle: "short",
//               timeStyle: "short",
//             }).format(new Date(Date.parse(createdAt)))}
//           </td>
//         </tr>
//       );
//     });
//     return <>{renderList}</>;
//   }
// };
// function UniversityComponents() {
//   return (
//     <>
//       <Table >
//         <thead>
//           <tr>
//            <th>ID</th>
//         <th>Catagory</th>
//         <th>Item</th>
//         <th>Quantity</th>
//         <th>Purchaser</th>
//         <th>Date of Purchase</th> 
//           </tr>
          
//         </thead>
        
//       <tbody>
//       <RenderShow />
//       </tbody>
      
//       </Table >
//     </>
//   );
// }

// export default UniversityComponents;


