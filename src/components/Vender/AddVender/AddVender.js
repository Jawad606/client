import React, { useState } from "react";
import "../../Products/AddProduct/main.css";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import { useAlert } from "react-alert";
import { addVender } from "../../../features/venderSlice";
import { addpaybill } from "../../../features/paybillSlice";
function AddVender() {
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const [catagoryID, setcatagoryID] = useState("");
  const [itemId, setitemId] = useState("");
  const [venderName, setvenderName] = useState("");
  const [venderEmail, setvenderEmail] = useState("");
  const [venderPhone, setvenderPhone] = useState("");
  const [venderCnic, setvenderCnic] = useState("");
  const [venderAddress, setvenderAddress] = useState("");
  const [venderImg, setvenderImg] = useState("");
  const [venderCity, setvenderCity] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const addpaymentBill1 = (catagory, item, vender) => {
    const user = JSON.parse(localStorage.getItem("Data"));
    const value = {
      catagory: catagory,
      item: item,
      paid: 0,
      unpaid: 0,
      quantity: 0,
      user: user._id,
      vender: vender,
    };
    dispatch(addpaybill(value))
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = {
      catagory: catagoryID,
      item: itemId,
      venderName: venderName,
      venderEmail: venderEmail,
      venderNumber: venderPhone,
      venderAddress: venderAddress,
      venderCnic: venderCnic,
      venderCity: venderCity,
      venderImg: venderImg,
    };
    dispatch(addVender(value))
      .then((response) => {
        console.log(response.payload);
        addpaymentBill1(
          response.payload.catagory._id,
          response.payload.item._id,
          response.payload._id
        );
        alert.success("Data insert successfully!");
      })
      .catch((error) => {
        alert.error("Error " + error);
      });
    setitemId("");
    setcatagoryID("");
    setvenderName("");
    setvenderEmail("");
    setvenderPhone("");
    setvenderCnic("");
    setvenderAddress("");
    setvenderImg("");
    setvenderCity("");
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
  const handleChangeAddress = (e) => {
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
        <div className="col-lg-8">
          <form className="data-from " onSubmit={HandleSubmit}>
            <span className="data-from-title">Add Vender</span>
             {/* Catagoy and item */}
             <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Catagory</h5>
                  </div>
                  <div className="col-lg-8">
                    {" "}
                    <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            required
                            value={catagoryID}
                            onChange={handleChangeCat}
                            className="input1"
                            name="Catagory"
                            id=""
                          >
                            <option value="-1">Select Catagory</option>
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
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Item</h5>
                  </div>
                  <div className="col-lg-8">
                    {" "}
                    <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            required
                            className="input1"
                            name="item"
                            value={itemId}
                            onChange={handleChangeItem}
                          >
                            <option value="-1">Select Item</option>
                            {itemList
                              .filter(
                                (sHowItem) => sHowItem.catId._id === catagoryID
                              )
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Name</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
                        value={venderName}
                        onChange={handleChangeName}
                        type="text"
                        className="input1"
                        placeholder="Name"
                      />
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Email</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Phone No</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
                        value={venderPhone}
                        onChange={handleChangePhone}
                        type="text"
                        className="input1"
                        placeholder="Phone No"
                      />
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>CNIC</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>City</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
                        value={venderCity}
                        onChange={handleChangeCity}
                        type="text"
                        className="input1"
                        placeholder="City"
                      />
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Image</h5>
                  </div>
                  <div className="col-lg-8">
                    {" "}
                    <div className="wrap-input1">
                      <input
                        required
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
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-2 py-1 px-2">
                    <h5>Address</h5>
                  </div>
                  <div className="col-lg-10">
                    {" "}
                    <div className="wrap-input1">
                      <input
                        required
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

export default AddVender;
