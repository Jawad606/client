import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser, showUser } from "../../../features/userSlice";
import Switch from "react-switch";
import { useAlert } from "react-alert";
function AddUser() {
  const User = JSON.parse(localStorage.getItem("Data"));
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [designation, setdesignation] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [username, setusername] = useState('');
  const [admin, setadmin] = useState(false);
  const alert=useAlert();
  const dispatch=useDispatch();
const handleSubmit=(event)=>{
    const data={
        firstname:firstname,
        lastname:lastname,
        designation:designation,
        email:email,
        password:password,
        username:username,
        admin:admin
    }
    dispatch(adduser(data)).then(()=>{
    alert.success('User add successfully!')})
    .catch((error)=>{alert.error('Error '+ error)})
    event.preventDefault();
    setfirstname("")
    setlastname("")
    setdesignation("")
    setemail("")
    setpassword("")
    setusername("")
    setadmin(false)
  
}
  return (
    <div>
      <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <form className="data-from" onSubmit={handleSubmit} >
              <span className="data-from-title">Add User</span>
              {/* Purchaser */}
              <div className="row  py-4 d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">First Name</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1">
                        <input
                          className="input1"
                          onChange={ (e)=> setfirstname(e.target.value) }
                          value={firstname}
                          type="text"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Last Name</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input
                          className="input1"
                          value={lastname}
                          onChange={ (e)=> setlastname(e.target.value) }
                          type="text"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Designation</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input
                          className="input1"
                          value={designation}
                          onChange={ (e)=> setdesignation(e.target.value) }
                          type="text"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5"> Email</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input className="input1"  onChange={ (e)=> setemail(e.target.value) } value={email} type="text" />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div className="row py-4">
                
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Username</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input className="input1"  onChange={ (e)=> setusername(e.target.value) } value={username} type="text" />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Password</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input className="input1"  onChange={ (e)=> setpassword(e.target.value) } value={password} type="text" />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row py-4">
              <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Admin</h5>
                    </div>
                    <div className="col-md-8">
                      <Switch
                        onColor="#2f659b"
                         onChange={()=>setadmin(!admin)}
                        checked={admin}
                        uncheckedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 12,
                              color: "#fff",
                              fontWeight: 700,
                              paddingRight: 2,
                            }}
                          >
                            OFF
                          </div>
                        }
                        checkedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#fff",
                              paddingRight: 2,
                            }}
                          >
                            NO
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="container-data-from-btn">
                <button type="submit" className="data-from-btn"  disabled={!User.admin}>
                  <span>
                    Submit
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
