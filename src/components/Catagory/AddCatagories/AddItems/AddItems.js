import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../../features/catagorySlice";
import { addItem } from "../../../../features/itemSlice";
import { addStore } from "../../../../features/storeSlice";
import { useAlert } from "react-alert";
import { addAssigns } from "../../../../features/AssignStoreSlice";
import { AiFillFileAdd } from "react-icons/ai";
import ReadCsv from "../../../ReadCSV/ReadCsv";
import {useNavigate} from 'react-router-dom'
function AddItems() {
  const dispatch = useDispatch();
  const { catagoryList } = useSelector(showCatagory);
  const [catagoryID, setcatagoryID] = useState("");
  const [click, setclick] = useState(false);
  const [item, setitem] = useState("");
  const User = JSON.parse(localStorage.getItem("Data"));
  const alert = useAlert();
  const nevigate=useNavigate();
  const addStore1 = (itemId, catId) => {
    const value = {
      catagory: catId,
      item: itemId,
      quantity: 0,
    };

    dispatch(addStore(value))
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const addAssign = (itemId, catId) => {
    const value = {
      catagory: catId,
      item: itemId,
      quantity: 0,
    };
    dispatch(addAssigns(value))
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = {
      catId: catagoryID,
      itemName: item,
    };
    dispatch(addItem(value))
      .then((response) => {
        console.log(response.payload);
        addStore1(response.payload._id, response.payload.catId._id);
        addAssign(response.payload._id, response.payload.catId._id);
        alert.success("Data insert successfully!");
      })
      .catch(function (error) {
        alert.error("Error " + error);
        console.log(error);
      });
    setitem("");
    setcatagoryID("");
  };
  const handleChangeCat = (e) => {
    setcatagoryID(e.target.value);
  };
  const handleChangeItem = (e) => {
    setitem(e.target.value);
  };
  return (
    <>
      {click && <ReadCsv from="item" />}
      <div className="container w-100 Page-Margin">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-6  ">
            <form className="data-from " onSubmit={HandleSubmit}>
              <div className="row d-flex justify-content-center">
                <div className="col-md-11">
                  <span className="data-from-title">Add Catagory</span>
                </div>
                <div className="col-md-1 icon-back d-flex justify-content-center align-items-center">
                  <AiFillFileAdd
                    onClick={() => setclick(!click)}
                    className="icons colors"
                  />
                </div>
              </div>
              {/* Catagoy and item */}
              <div className="row d-flex justify-content-start">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3 py-1 px-4 text-center">
                      <h5>Catagory</h5>
                    </div>
                    <div className="col-md-9">
                      <div className="wrap-input1">
                        <div className="selectdiv">
                          <label>
                            <select
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
                <div className="col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-md-3 py-1 px-1 text-center">
                      <h5>Item</h5>
                    </div>
                    <div className="col-md-9">
                      <div className="wrap-input1">
                        <input
                          className="input1"
                          type="text"
                          value={item}
                          onChange={handleChangeItem}
                          placeholder="Item"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-data-from-btn ">
                  <button type="submit" className="data-from-btn"  disabled={!User.admin} >
                    <span>
                      Save & Next
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItems;
