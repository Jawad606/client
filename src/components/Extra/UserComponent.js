// import axios from "axios";
// import React, { useState } from "react"
// import { useNavigate  } from "react-router-dom";
// import MainAccessPoint from "./MainAccessPoint";
// import "./style/style.css";
// function UserComponent() {
//   const [userName, setuserName] = useState('')
//   const [password, setpassword] = useState('')
//   const navigate = useNavigate();
//   const handleUser=(event)=>{
   
//     axios
//     .post("http://localhost:3000/users/login", {
//       username: userName,
//       password: password,
//     })
//     .then((response) => {
//       if(response.data.success){
        
//         localStorage.setItem("token","Bearer " + response.data.token)
//         localStorage.setItem("auth",true)
//         navigate('/home');
//       }
//      console.log(localStorage.getItem("token"))
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//     event.preventDefault();
//   }
//   const handleUsername=(e)=>{
//     setuserName(e.target.value)
//   }
//   const handlePassword=(e)=>{
//     setpassword(e.target.value)
//   }
//   return (
//     <div>
//       <section className="ftco-section">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-md-6 col-lg-5">
//               <div className="login-wrap p-4 p-md-5">
//                 <div className="icon d-flex align-items-center justify-content-center">
//                   <span className="fa fa-user-o"></span>
//                 </div>
//                 <h3 className="text-center mb-4">Have an account?</h3>
//                 <form onSubmit={handleUser} className="login-form">
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       className="form-control rounded-left"
//                       placeholder="Username"
//                       value={userName}
//                       onChange={handleUsername}
//                       required
//                     />
//                   </div>
//                   <div className="form-group d-flex">
//                     <input
//                       type="password"
//                       className="form-control rounded-left"
//                       placeholder="Password"
//                       value={password}
//                       onChange={handlePassword}
//                       required
//                     />
//                   </div>
//                   <div className="form-group d-md-flex">
//                     <div className="w-50">
//                       <label className="checkbox-wrap checkbox-primary">
//                         Remember Me
//                         <input type="checkbox"  />
//                         <span className="checkmark"></span>
//                       </label>
//                     </div>
//                     <div className="w-50 text-md-right">
//                       <a href="#">Forgot Password</a>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <button
//                       type="submit"
//                       className="btn btn-primary rounded  p-3 px-5"
//                     >
//                       Get Started
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default UserComponent;
