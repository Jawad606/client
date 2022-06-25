import React, { useState } from "react";
import "../AddProduct/main.css";
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

function UpdateProduct(props) {
    const User = JSON.parse(localStorage.getItem("Data"));
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const { venderList } = useSelector(showVender);
  const { storeList } = useSelector(showStore);
  const [catagoryID, setcatagoryID] = useState(props.data.catagory);
  const [itemId, setitemId] = useState(props.data.item);
  const [venderId, setvenderId] = useState(props.data.vender);
  const [quantity, setquanitity] = useState(parseInt(props.data.quantity));
  const [Purchaser, setPurchaser] = useState(props.data.purchaser);
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
    dispatch(updateStore(data))
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
      purchaser: Purchaser,
      vender: venderId,
    };
    // CheckStoreIDSub();
    const data = { id: props.data.id, value: value };
    dispatch(updateUni(data))
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
    setPurchaser("");
    setitemId("");
    setcatagoryID("");
    setvenderId("");
  };

  const handleChangeQun = (e) => {
    console.log(quantity);
    setquanitity(e.target.value);
    console.log(quantity);
  };
  const handleChangePur = (e) => {
    setPurchaser(e.target.value);
  };
  const handleChangeCat = (e) => {
    setcatagoryID(e.target.value);
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
        <div className="col-md-8">
          <form className="data-from " onSubmit={HandleSubmit}>
            <span className="data-from-title">Add Product</span>
            {/* Catagoy and item */}
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6 col-sm-12">
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
              <div className="col-md-6">
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
              <div className="col-md-6">
                <div className="wrap-input1">
                  <div className="selectdiv">
                    <label>
                      <select
                        value={venderId}
                        onChange={handleChangeVender}
                        className="input1"
                        name="Catagory"
                        id=""
                      >
                        <option value="-1"> Select Vender </option>
                        {venderList.map((data, i) => {
                          return (
                            <option key={i} value={data._id}>
                              {data.venderName}
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
            {/* Purchaser */}
            <div className="row">
              <div className="col-md-6">
                <div className="wrap-input1">
                  <input
                    className="input1"
                    type="text"
                    value={Purchaser}
                    onChange={handleChangePur}
                    placeholder="Purchaser"
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
  );
}

export default UpdateProduct;
