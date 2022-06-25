// import React, { useState } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
// } from "reactstrap";
// import { NavLink, Outlet } from "react-router-dom";
// import axios from "axios";
// import { baseUrl } from "../Base/baseUrl";
// function HeaderComponent() {
//   const [isOpen, setisOpen] = useState(false);
//   const toggle = () => {
//     setisOpen(!isOpen);
//   };
//   const logout = async () => {
//     axios
//       .get(baseUrl + "/users/logout")
//       .then((response) => {
//         console.log(response);
//         localStorage.clear();
//       })
//       .catch(function (error) {
//         console.log("error");
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <Navbar color="light" light expand="md">
//         <NavbarBrand href="/">The inventry</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="ms-auto " navbar>
//             <NavItem>
//               <NavLink className="px-2 nav-link" to="/home">
//                 Home
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink className="px-2 nav-link" to="/Add_University">
//                 Add University
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink className="px-2 nav-link" to="/Add_Assign">
//                 Add Assign
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink className="px-2 nav-link" to="/catagory">
//                 Catagory
//               </NavLink>
//             </NavItem>

//             <NavItem>
//               <NavLink className="px-2 nav-link" to="/store">
//                 Store
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink className="px-2 nav-link" to="/assign">
//                 Assign
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink className="px-2 nav-link" onClick={logout} to="/login">
//                 Logout
//               </NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//       {/* <button onClick={logout}>Logout</button> */}

//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default HeaderComponent;
