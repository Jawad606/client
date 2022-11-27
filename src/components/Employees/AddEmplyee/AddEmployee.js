import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../../features/emplyeeSlice';

function AddEmployee() {
  const User = JSON.parse(localStorage.getItem("Data"));
  const [name, setName] = useState("");
  const [designation, setdesignation] = useState("");
  const [empId, setempId] = useState("");
  const [department, setdepartment] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = { 
      employeeName: name,
      Designation: designation,
      Department:department,
      empId:empId,
     };
    dispatch(addEmployee(value))
      .then((response) => {
        alert.success("Data insert successfully!");
      })
      .catch(function (error) {
        alert.error("Error " + error);
      });

  };
  return (
    <div>
         <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <form className="data-from " onSubmit={HandleSubmit}>
              <div className="row">
                <div className="col-lg-11">
                  <span className="data-from-title">Add Employee</span>
                </div>
              </div>
              {/* Name */}
              <div className="row">
              <div className="col-lg-6">
                <div className="col-lg-6 py-1 px-2">
                  <h5>Employee ID</h5>
                </div>
                <div className="col-lg-10 ">
                  <div className="wrap-input1">
                    <input
                      className="input1"
                      type="text"
                      value={empId}
                      onChange={(e)=>setempId(e.target.value)}
                      placeholder="Employee ID"
                    />
                    <span className="shadow-input1"></span>
                  </div>
                </div>
                </div>
                <div className="col-lg-6">
                <div className="col-lg-2 py-1 px-2">
                  <h5>Name</h5>
                </div>
                <div className="col-lg-10 ">
                  <div className="wrap-input1">
                    <input
                      className="input1"
                      type="text"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      placeholder="Name"
                    />
                    <span className="shadow-input1"></span>
                  </div>
                </div>
                </div>
                  <div className="col-lg-6">
                <div className="col-lg-2 py-1 px-2">
                  <h5>Designation</h5>
                </div>
                <div className="col-lg-10 ">
                  <div className="wrap-input1">
                    <input
                      className="input1"
                      type="text"
                      value={designation}
                      onChange={(e)=>setdesignation(e.target.value)}
                      placeholder="Designation"
                    />
                    <span className="shadow-input1"></span>
                  </div>
                </div>
                </div>
               <div className="col-lg-6">
               <div className="row">
                  <div className="col-lg-4 py-1 px-2 text-end">
                    <h5>Department</h5>
                  </div>
                  <div className="col-lg-10">
                    <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        className="input1"
                        value={department}
                        onChange={(e)=>setdepartment(e.target.value)}
                      >
                        <option value="">Select Department</option>
                        <option value="Ms Department">Ms Department</option>
                        <option value="Cs Department">Cs Department</option>
                        <option value="ME Department">ME Department</option>
                        <option value="EE Department">EE Department</option>
                        <option value="CE Department">CE Department</option>
                      </select>
                    </label>
                  </div>
                  <span className="shadow-input1"></span>
                </div>
                  </div>
                </div>
               </div>
              </div>
              <div className="container-data-from-btn">
                <button type="submit" className="data-from-btn"  disabled={!User.admin}>
                  <span>
                    Save
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
  )
}

export default AddEmployee