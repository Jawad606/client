import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssign } from "../../../features/assignSlice";
import { useNavigate } from "react-router-dom";
import { showSpecific } from "../../../features/specificSlice";
import {
  showAssignStore,
  updateAssigns,
} from "../../../features/AssignStoreSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import { showStore, updateStore } from "../../../features/storeSlice";
import { useAlert } from "react-alert";
import { showEmployee } from "../../../features/emplyeeSlice";
function AssignAdd() {
  const User = JSON.parse(localStorage.getItem("Data"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { specificList } = useSelector(showSpecific);
  const { catagoryList } = useSelector(showCatagory);
  const { employeeList } = useSelector(showEmployee);
  const { itemList } = useSelector(showItem);
  const { storeList } = useSelector(showStore);
  const { AssignListStore } = useSelector(showAssignStore);
  const [catagoryID, setcatagoryID] = useState("");
  const [employeeID, setemployeeID] = useState("");
  const [itemId, setitemId] = useState("");
  const [quantity, setquanitity] = useState(0);
  const [department, setdepartment] = useState("");
  const [itemFor, setitemFor] = useState("");
  const [classRoom, setclassRoom] = useState("");
  const [returnItem, setreturnItem] = useState("");
  const [returnQuantity, setreturnQuantity] = useState("");
  const alert = useAlert();
  const [asset, setAsset] = useState("");
  const [specificID, setspecificID] = useState("");

  const data = [
    { id: 1, for: "CLASS", depart: "CS", class: "c1" },
    { id: 2, for: "CLASS", depart: "CS", class: "c2" },
    { id: 3, for: "CLASS", depart: "CS", class: "c3" },
    { id: 4, for: "CLASS", depart: "CS", class: "c4" },
    { id: 5, for: "CLASS", depart: "CS", class: "c5" },
    { id: 6, for: "CLASS", depart: "CS", class: "c1.1" },
    { id: 7, for: "CLASS", depart: "CS", class: "c1.2" },
    { id: 8, for: "CLASS", depart: "CS", class: "c1.3" },
    { id: 9, for: "CLASS", depart: "CS", class: "c1.4" },
    { id: 10, for: "CLASS", depart: "CS", class: "c1.5" },
    { id: 11, for: "CLASS", depart: "CS", class: "c2.1" },
    { id: 12, for: "CLASS", depart: "CS", class: "c2.2" },
    { id: 13, for: "CLASS", depart: "CS", class: "c2.3" },
    { id: 14, for: "CLASS", depart: "CS", class: "c2.4" },
    { id: 15, for: "LAB", depart: "CS", class: "c1" },
    { id: 16, for: "LAB", depart: "CS", class: "c2" },
    { id: 17, for: "FACILITY", depart: "CS", class: "cs_facility" },
  ];
  const AddAssign = () => {
    const value = {
      catagory: catagoryID,
      item: itemId,
      quantity: parseInt(quantity),
      Department: department,
      ItemFor: itemFor,
      employee: employeeID,
      classRoom: classRoom,
      specification: specificID,
      returnItem: returnItem,
      returnQuantity: returnQuantity,
    };
    dispatch(addAssign(value))
      .then((res) => {
        alert.success("Data insert successfully!");
        navigate("/assignsevicetag", { state: res.payload });
      })
      .catch((error) => {
        alert.error("Error " + error);
      });

    checkAssignStoreId();
  };

  const UpdateAssignStore = (id, quantityOld) => {
    const value = { quantity: parseInt(quantityOld) + parseInt(quantity) };
    const data = { id: id, value: value };
    dispatch(updateAssigns(data))
      .then((response) => {})
      .catch(function (error) {
        alert.error("Error " + error);
      });
  };
  const UpdateStore = (id, quantityOld) => {
    if (parseInt(quantityOld) >= parseInt(quantity)) {
      const value = { quantity: parseInt(quantityOld) - parseInt(quantity) };
      const data = { id: id, value: value };
      console.log(value);
      dispatch(updateStore(data))
        .then((response) => {
          AddAssign();
        })
        .catch(function (error) {
          alert.error("Error " + error);
        });
    } else {
      alert.error("Quantity not Found");
    }
  };
  const checkStoreID = () => {
    storeList
      .filter(
        (item) => item.catagory._id === catagoryID && item.item._id === itemId
      )
      .map((item) => UpdateStore(item._id, item.quantity));
  };
  const checkAssignStoreId = () => {
    AssignListStore.filter(
      (item) => item.catagory._id === catagoryID && item.item._id === itemId
    ).map((item) => UpdateAssignStore(item._id, item.quantity));
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    checkStoreID();

    // setquanitity("");
    // setitemId("");
    // setcatagoryID("");
    // setdepartment("");
    // setitemFor("");
  };

  const handleChangeQun = (e) => {
   
    setquanitity(e.target.value);
  };
  const handleChangeCat = (e) => {
    setcatagoryID(e.target.value);
  };
  const handleChangeItem = (e) => {
    setitemId(e.target.value);
  };
  const handleChangeDepart = (e) => {
    setdepartment(e.target.value);
  };
  const handleChangeItemFor = (e) => {
    setitemFor(e.target.value);
  };

  return (
    <div className="container w-100 Page-Margin">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <form className="data-from " onSubmit={HandleSubmit}>
            <span className="data-from-title">Add Product</span>
            {/* Catagoy and item */}
            <div className="row">
              <div className="col-lg-2 py-1 px-1 text-start">
                <h5>Asset Types</h5>
              </div>
              <div className="col-lg-10">
                <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        value={asset}
                        onChange={(e) => setAsset(e.target.value)}
                        className="input1"
                        name="Type of Assets"
                        id=""
                      >
                        <option value="-1">Select Catagory</option>
                        <option value="Fixed">Fixed Assets</option>
                        <option value="Miscellaneous">
                          Miscellaneous Asset
                        </option>
                        <option value="Working">Working</option>
                      </select>
                    </label>
                  </div>
                  <span className="shadow-input1"></span>
                </div>
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-lg-6">
                <div className="row ">
                  <div className="col-lg-4 py-1 text-start px-2">
                    <h5>Catagory</h5>
                  </div>
                  <div className="col-lg-8 ">
                    <Autocomplete
                      onChange={(event, value,reason) =>  reason==='clear' ? setcatagoryID('-1') :setcatagoryID(value._id)}
                      disablePortal
                      className="input1"
                      id="combo-box-demo"
                      options={catagoryList.filter(
                        (item) => item.assetType === asset
                      )}
                      // sx={{ width: 300 }}
                      getOptionLabel={(option) =>
                        option.catagoryName.toString()
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Catagory" />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-4 py-1 text-start px-2">
                    <h5>Items</h5>
                  </div>
                  <div className="col-lg-8">
                    {" "}
                    <Autocomplete
                      onChange={(event, value) => setitemId(value._id)}
                      disablePortal
                      className="input1"
                      id="combo-box-demo"
                      options={itemList.filter(
                        (sHowItem) => sHowItem.catId._id === catagoryID
                      )}
                      getOptionLabel={(option) => option.itemName.toString()}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Item" />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Qunatity and Vender */}
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Department</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            className="input1"
                            value={department}
                            onChange={handleChangeDepart}
                          >
                            <option value="">Select Department</option>
                            <option value="MS">Ms Department</option>
                            <option value="CS">Cs Department</option>
                            <option value="ME">ME Department</option>
                            <option value="EE">EE Department</option>
                            <option value="CE">CE Department</option>
                          </select>
                        </label>
                      </div>
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-5">
                    <h5>For </h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            className="input1"
                            value={itemFor}
                            onChange={handleChangeItemFor}
                          >
                            <option value="">Please Select Item</option>
                            <option value="Room">Room Number</option>
                            <option value="FACILITY">facility</option>
                          </select>
                        </label>
                      </div>
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 pb-3">
                <div className="row">
                  <div className="col-lg-2 py-1 px-2">
                    <h5>
                      {"Issued To"}
                    </h5>
                  </div>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      value={classRoom}
                      className="input1"
                      placeholder="Issued to Room/Person"
                      onChange={(e) => setclassRoom(e.target.value)}
                    />
                    {/* <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            value={classRoom}
                            onChange={(e) => setclassRoom(e.target.value)}
                            className="input1"
                            name="Class Room"
                            id=""
                          >
                            <option value="-1">Select ClassRoom</option>
                            {data
                              .filter(
                                (item) =>
                                  item.depart === department &&
                                  item.for === itemFor
                              )
                              .map((data, i) => (
                                <option key={i} value={data.class}>
                                  {data.class}
                                </option>
                              ))}
                          </select>
                        </label>
                      </div>
                      <span className="shadow-input1"></span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Quantity</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        min={0}
                        type="number"
                        pattern="[0-9]*"
                        value={quantity}
                        onChange={handleChangeQun}
                        className="input1"
                        placeholder="Quantiy"
                      />
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Employee</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            value={employeeID}
                            onChange={(e) => setemployeeID(e.target.value)}
                            className="input1"
                            name="Catagory"
                            id=""
                          >
                            <option value="-1">Select Employee</option>
                            {employeeList.map((data, i) => (
                              <option key={i} value={data._id}>
                                {data.employeeName}
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
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Retured Item</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
                        value={returnItem}
                        onChange={(e) => setreturnItem(e.target.value)}
                        type="text"
                        className="input1"
                        placeholder="Item"
                      />
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-4 py-1 px-2">
                    <h5>Retured Quantity</h5>
                  </div>
                  <div className="col-lg-8">
                    <div className="wrap-input1">
                      <input
                        required
                        value={returnQuantity}
                        onChange={(e) => setreturnQuantity(e.target.value)}
                        min={0}
                        type="number"
                        pattern="[0-9]*"
                        className="input1"
                        placeholder="Quantity"
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
                  <div className="col-lg-2">
                    <h5>Model</h5>
                  </div>
                  <div className="col-lg-10">
                    <div className="wrap-input1">
                      <div className="selectdiv">
                        <label>
                          <select
                            required
                            className="input1"
                            name="item"
                            value={specificID}
                            onChange={(e) => setspecificID(e.target.value)}
                          >
                            <option value="-1">
                              Select Model Specification
                            </option>
                            {specificList
                              .filter(
                                (sHowItem) =>
                                  sHowItem.catagory._id === catagoryID &&
                                  sHowItem.item._id === itemId
                              )
                              .map((data, i) => {
                                return (
                                  <option key={i} value={data._id}>
                                    {data.model}
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
            <div className="container-data-from-btn">
              <button
                type="submit"
                className="data-from-btn"
                disabled={!User.admin}
              >
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

export default AssignAdd;
