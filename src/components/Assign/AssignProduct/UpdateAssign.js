import React, { useState } from "react";
import "../../Products/AddProduct/main.css";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import {
  showStore,
  updateStore,
} from "../../../features/storeSlice";
import {
  University,
  addUni,
  updateUni,
} from "../../../features/universitySlice";
import axios from "axios";
import { useAlert } from "react-alert";
import { showVender } from "../../../features/venderSlice";
import { updateAssigns } from "../../../features/AssignStoreSlice";
import { updateAssign } from "../../../features/assignSlice";

function UpdateAssign(props) {
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const { storeList } = useSelector(showStore);
  const [catagoryID, setcatagoryID] = useState(props.data.catagory);
  const [itemId, setitemId] = useState(props.data.item);
  const [venderId, setvenderId] = useState(props.data.assigner);
  const [quantity, setquanitity] = useState(parseInt(props.data.quantity));
  const [Depart, setDepart] = useState(props.data.Department);
  const [ItemFor, setItemFor] = useState(props.data.ItemFor);
  const dispatch = useDispatch();
  const alert = useAlert();
  const UpdateStoreAdd = (id, quantityOld) => {
    const value = {
      quantity:
        parseInt(quantityOld) +
        parseInt(quantity) -
        parseInt(props.data.quantity)
    };
    const data = { id: id, value: value };
    dispatch(updateAssigns(data))
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const CheckStoreIDAdd = () => {
    storeList
      .filter(
        (item) => item.catagory._id === catagoryID && item.item._id === itemId
      )
      .map((item) => UpdateStoreAdd(item._id, item.quantity));
  };
  const HandleSubmit = (event) => {
    event.preventDefault();

    const value = {
      catagory: catagoryID,
      item: itemId,
      quantity: parseInt(quantity),
      assigner: venderId,
      Department: Depart,
      ItemFor: ItemFor,
    };
    // CheckStoreIDSub();
    const data = { id: props.data.id, value: value };
    dispatch(updateAssign(data))
      .then(() => {
        alert.success("Data Update successfully!");
      })
      .catch((error) => {
        alert.error("Error " + error);
      });
    setTimeout(() => {
      CheckStoreIDAdd();
    }, 2000);
    setquanitity("");
    setDepart("");
    setItemFor("");
    setitemId("");
    setcatagoryID("");
    setvenderId("");
  };

  const handleChangeQun = (e) => {
    setquanitity(e.target.value);
  };
  const handleChangeCat = (e) => {
    setcatagoryID(e.target.value);
  };
  const handleChangeDepart = (e) => {
    setDepart(e.target.value);
  };
  const handleChangeItemFor = (e) => {
    setItemFor(e.target.value);
  };
  const handleChangeItem = (e) => {
    setitemId(e.target.value);
  };
  const handleChangeVender = (e) => {
    setvenderId(e.target.value);
  };
  return (
    <div className="container w-100 Page-Margin">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          {props.data.Department}
          <form className="data-from " onSubmit={HandleSubmit}>
            {/* Catagoy and item */}
            <div className="row">
              <div className="col-lg-6">
                <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        disabled
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
              <div className="col-lg-6 col-sm-12">
                <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        disabled
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
            {/* Qunatity and Vender */}
            <div className="row">
              <div className="col-lg-6">
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
              <div className="col-lg-6">
                <div className="wrap-input1">
                  <input
                    type="text"
                    value={venderId}
                    onChange={handleChangeVender}
                    className="input1"
                    placeholder="Quantiy"
                  />
                  <span className="shadow-input1"></span>
                </div>
              </div>
            </div>
            {/* Purchaser */}
            <div className="row">
              <div className="col-lg-6">
                <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        className="input1"
                        value={Depart}
                        onChange={handleChangeDepart}
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
              <div className="col-lg-6">
                <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        className="input1"
                        value={ItemFor}
                        onChange={handleChangeItemFor}
                      >
                        <option value="">Select Item</option>
                        <option value="Class">Class</option>
                        <option value="Lab">Lab</option>
                        <option value="Faculty">Faculty</option>
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
  );
}

export default UpdateAssign;
