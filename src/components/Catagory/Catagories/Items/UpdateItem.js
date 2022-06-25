import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import '../../../Products/AddProduct/main.css'
import { useAlert } from "react-alert";
import { updateItem } from '../../../../features/itemSlice';
function UpdateItem(props) {
    const Alert=useAlert();
    const User = JSON.parse(localStorage.getItem("Data"));
    
    const [itemName, setItemName] = useState(props.data.itemName)
    
    const dispatch=useDispatch();
    const HandleSubmit = (event) => {
        event.preventDefault();
        const value={itemName:itemName}
        const data={id:props.data.id,value:value}
        dispatch(updateItem(data)).then(()=>{Alert.success("Updated")} ).catch((error)=>{console.log(error)})
      };
  return (
    <div className="container w-100 Page-Margin">
    <div className="row d-flex justify-content-center">
      <div className="col-md-8">
        <form className="data-from " onSubmit={HandleSubmit}>
          <span className="data-from-title">Update Catagory</span> 
          {/* Purchaser */}
          <div className="row">
            <div className="col-md-12">
              <div className="wrap-input1">
                <input
                  className="input1"
                  type="text"
                  value={itemName}
                  onChange={(e)=>setItemName(e.target.value)}
                  placeholder="Catagory Name"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
          </div>
          <div className="container-data-from-btn">
            <button type="submit" className="data-from-btn" disabled={!User.admin}>
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

export default UpdateItem 