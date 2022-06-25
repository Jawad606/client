import React, { useState } from 'react'
import "../../Products/AddProduct/main.css";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import axios from "axios";
import { useAlert } from "react-alert";
import { addVender, fetchVenderSingle, updateVender } from '../../../features/venderSlice';
function UpdateVender(props) {
    const {catagoryList} = useSelector(showCatagory);
    const {itemList} = useSelector(showItem);
    const [catagoryID, setcatagoryID] = useState(props.data.catagory);
    const [itemId, setitemId] = useState(props.data.item);
    const [venderName, setvenderName] = useState(props.data.venderName)
    const [venderEmail, setvenderEmail] = useState(props.data.venderEmail)
    const [venderPhone, setvenderPhone] = useState(props.data.venderNumber)
    const [venderCnic, setvenderCnic] = useState(props.data.venderCnic)
    const [venderAddress, setvenderAddress] = useState(props.data.venderAddress)
    const [venderImg, setvenderImg] = useState('')
    const [venderCity, setvenderCity] = useState(props.data.venderCity)

    const dispatch = useDispatch();
    const alert = useAlert()
    const HandleSubmit = (event) => {
        event.preventDefault();
        const value={
          catagory: catagoryID,
          item: itemId,
          venderName:venderName,
          venderEmail:venderEmail,
          venderNumber:venderPhone,
          venderAddress:venderAddress,
          venderCnic:venderCnic,
          venderCity:venderCity,
          venderImg:venderImg,
        }
        const date={id:props.data.id,value:value}
        dispatch(updateVender(date)).then(()=>{
          alert.success('Data Update successfully!')
        }).catch((error)=>{alert.error('Error '+ error)})
        // axios
        //   .post("http://localhost:3000/vender", {
        //     catagory: catagoryID,
        //     item: itemId,
        //     venderName:venderName,
        //     venderEmail:venderEmail,
        //     venderNumber:venderPhone,
        //     venderAddress:venderAddress,
        //     venderCnic:venderCnic,
        //     venderCity:venderCity,
        //     venderImg:venderImg,
        //   })
          // .then((response) => {
          //   alert.success('Data insert successfully!')
          //   console.log(response.data)
          //   dispatch(fetchVenderSingle(response.data));
          // })
          // .catch(function (error) {
          //   alert.error('Error '+error)
          //   console.log(error);
          // });
        setitemId("");
        setcatagoryID("");
        setvenderName()
        setvenderEmail('')
        setvenderPhone('')
        setvenderCnic('')
        setvenderAddress('')
        setvenderImg('')
        setvenderCity('')
      };
      const handleChangeCat = (e) => {
        setcatagoryID(e.target.value);
      };
      const handleChangeItem = (e) => {
        setitemId(e.target.value);
      };
      const handleChangeName = (e) => {
        setvenderName(e.target.value);
      };
      const handleChangeEmail = (e) => {
        setvenderEmail(e.target.value);
      };
      const handleChangePhone = (e) => {
        setvenderPhone(e.target.value);
      };
      const handleChangeCnic = (e) => {
        setvenderCnic(e.target.value);
      };
      const handleChangeAddress= (e) => {
        setvenderAddress(e.target.value);
      };
      const handleChangeCity = (e) => {
        setvenderCity(e.target.value);
      };
      const handleChangeImg = (e) => {
        setvenderImg(e.target.value);
      };
  return (
    <div className="container w-100 Page-Margin">
    <div className="row d-flex justify-content-center">
      <div className="col-md-8">
        <form className="data-from "  onSubmit={HandleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="wrap-input1">
                <input
                value={venderName}  
                 onChange={handleChangeName}
                  type="text"
                  className="input1"
                  placeholder="Name"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
             <div className="col-md-6">
              <div className="wrap-input1">
                <input
                value={venderEmail}  
                onChange={handleChangeEmail}
                  type="text"
                  className="input1"
                  placeholder="Email"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="wrap-input1">
                <input
                value={venderPhone}  
                onChange={handleChangePhone}
                  type="text"
                  className="input1"
                  placeholder="Phone No"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
             <div className="col-md-6">
              <div className="wrap-input1">
                <input
                value={venderCnic}  
                onChange={handleChangeCnic}
                  type="text"
                  className="input1"
                  placeholder="CNIC"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="wrap-input1">
                <input
                value={venderCity}  
                onChange={handleChangeCity}
                  type="text"
                  className="input1"
                  placeholder="City"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
             <div className="col-md-6">
              <div className="wrap-input1">
                <input
                value={venderImg}  
                onChange={handleChangeImg}
                  type="text"
                  className="input1"
                  placeholder="Upload Image"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="wrap-input1">
                <input
                value={venderAddress}  
                onChange={handleChangeAddress}
                  type="text"
                  className="input1"
                  placeholder="Addrss"
                />
                <span className="shadow-input1"></span>
              </div>
            </div>
          </div>
          {/* Catagoy and item */}
          <div className="row">
            <div className="col-md-6">
              <div className="wrap-input1">
                <div className="selectdiv">
                  <label>
                    <select    value={catagoryID}   onChange={handleChangeCat} className="input1" name="Catagory" id="">
                      <option  value="-1">
                        Select Catagory
                      </option>
                      {catagoryList.map((data, i) => (
                        <option key={i} value={data._id}>
                          {data.catagoryName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <span className="shadow-input1"></span>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="wrap-input1">
                <div className="selectdiv">
                  <label>
                    <select className="input1" name="item"  value={itemId}   onChange={handleChangeItem}>
                      <option   value="-1" >
                        Select Item
                      </option>
                      {itemList
                        .filter((sHowItem) => sHowItem.catId._id === catagoryID)
                        .map((data, i) => {
                          return (
                            <option key={i} value={data._id}>
                              {data.itemName}
                            </option>
                          );
                        })}
                    </select>
                  </label>
                </div>
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
  )
}

export default UpdateVender