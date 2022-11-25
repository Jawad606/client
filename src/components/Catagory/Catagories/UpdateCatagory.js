import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateCatagory } from '../../../features/catagorySlice';
import '../../Products/AddProduct/main.css'
import { useAlert } from "react-alert";
function UpdateCatagory(props) {
    const Alert=useAlert();
    const [catagoryName, setcatagoryName] = useState(props.data.catagoryName)
    const User = JSON.parse(localStorage.getItem("Data"));
    const dispatch=useDispatch();
    const HandleSubmit = (event) => {
        event.preventDefault();
        const value={catagoryName:catagoryName}
        const data={id:props.data.id,value:value}
        dispatch(updateCatagory(data)).then(()=>{Alert.success("Updated")} ).catch((error)=>{console.log(error)})
      };
  return (
    <div className="container w-100 Page-Margin">
    <div className="row d-flex justify-content-center">
      <div className="col-lg-8">
        <form className="data-from " onSubmit={HandleSubmit}>
          <span className="data-from-title">Update Catagory</span> 
          {/* Purchaser */}
          <div className="row">
            <div className="col-lg-6">
              <div className="wrap-input1">
                <input
                  className="input1"
                  type="text"
                  value={catagoryName}
                  onChange={(e)=>setcatagoryName(e.target.value)}
                  placeholder="Catagory Name"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
          </div>
          <div className="container-data-from-btn" disabled={!User.admin}>
            <button type="submit" className="data-from-btn">
              <span>
                Submit
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UpdateCatagory 