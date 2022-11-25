// import axios from "axios";
// import React from "react";
// import { useSelector } from "react-redux";
// import { Table } from 'reactstrap';
// import { showAssign } from "../features/assignSlice";
// const RenderShow = () => {
//   const showData = useSelector(showAssign);
//   if (showData.length === 0) {
//     return <tr><td><h1>No found</h1></td></tr> ;
//   } else {
//     const renderList = showData.map(({_id,Department,Itemfor,catagory,item,quantity,assigner,createdAt}, i) => {
//       return (
//         <tr key={i}>
//           <td>{_id}</td>
//           <td>{Department}</td>
//           <td>{Itemfor}</td>
//           <td>{catagory.catagoryName}</td>
//           <td>{item.itemName}</td>
//           <td>{quantity}</td>
//           <td>{assigner}</td>
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
// function AssignComponent() {
//   return (
//     <>
//       <Table >
//         <thead>
//           <tr>
//            <th>ID</th>
//            <th>Department</th>
//            <th>Item For</th>
//         <th>Catagory</th>
//         <th>Item</th>
//         <th>Quantity</th>
//         <th>Assigner</th>
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

// export default AssignComponent;


