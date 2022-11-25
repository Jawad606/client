import React, { useState } from "react";
import "../../Products/AddProduct/main.css";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { changepassword } from "../../../features/userSlice";

function ChangePassword(props) {
    const [newPassword, setnewPassword] = useState('');
    const [oldPassword, setoldPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert()
    const HandleSubmit = (event) => {
      event.preventDefault();
    
      const value={
        oldpassword: oldPassword,
        newpassword: newPassword,
      }
      // CheckStoreIDSub();
      const data={id:props.id,value:value}
      dispatch(changepassword(data)).then(()=>{
        alert.success('Password Change successfully!')
      }).catch((error)=>{alert.error('Error '+ error)})


    };

    const handleChangeold = (e) => {
        setoldPassword(e.target.value);
    };
    const handleChangenew = (e) => {
        setnewPassword(e.target.value);
    };
    return (
      <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <form className="data-from "  onSubmit={HandleSubmit}>
              <span className="data-from-title">Password Change</span>
              {/* Purchaser */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="wrap-input1">
                    <input className="input1" type="text" value={oldPassword}   onChange={handleChangeold} placeholder="Old Password" />
                    <span className="shadow-input1"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="wrap-input1">
                    <input className="input1" type="text" value={newPassword}   onChange={handleChangenew} placeholder="New Password" />
                    <span className="shadow-input1"></span>
                  </div>
                </div>
              </div>
              <div className="container-data-from-btn">
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
    );
}

export default ChangePassword