import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../../features/catagorySlice";
import { addItem } from "../../../../features/itemSlice";
import { addStore } from "../../../../features/storeSlice";
import { useAlert } from "react-alert";
import { addAssigns } from "../../../../features/AssignStoreSlice";
import { AiFillFileAdd } from "react-icons/ai";
import ReadCsv from "../../../ReadCSV/ReadCsv";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function AddItems() {
  const dispatch = useDispatch();
  const { catagoryList } = useSelector(showCatagory);
  const [catagoryID, setcatagoryID] = useState("");
  const [assetId, setassetId] = useState("");
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [click, setclick] = useState(false);
  const [item, setitem] = useState("");
  const [asset, setAsset] = useState("");
  const User = JSON.parse(localStorage.getItem("Data"));
  const alert = useAlert();
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
      assetId: one + "-" + two + "-" + three,
    };
    console.log(value);
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
          <div className="col-lg-6  ">
            <form className="data-from " onSubmit={HandleSubmit}>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-11">
                  <span className="data-from-title">Add Items</span>
                </div>
                <div className="col-lg-1 icon-back d-flex justify-content-center align-items-center">
                  <AiFillFileAdd
                    onClick={() => setclick(!click)}
                    className="icons colors"
                  />
                </div>
              </div>
              {/* Catagoy and item */}
              <div className="row d-flex justify-content-start">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3 py-1 px-1 text-start">
                      <h5>Asset Types</h5>
                    </div>
                    <div className="col-lg-9">
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
                              <option value="-1">Select Asset</option>
                              <option value="Fixed">Fixed Assets</option>
                              <option value="Miscellaneous">
                                Miscellaneous Asset
                              </option>
                              <option value="Working">Working Asset</option>
                            </select>
                          </label>
                        </div>
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row pb-3">
                    <div className="col-lg-3 py-1 px-1 text-start">
                      <h5>Catagory</h5>
                    </div>
                    <div className="col-lg-9">
                      <Autocomplete
                        onChange={(event, value,reason) => reason==='clear' ? setcatagoryID('-1') : setcatagoryID(value._id)}
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
                          <TextField {...params} label={"Select Catagory"} />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-3 py-1 px-1 text-start">
                      <h5>Item</h5>
                    </div>
                    <div className="col-lg-9">
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
                <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-3 py-1 px-1 text-start">
                      <h5>Asset Id</h5>
                    </div>
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="wrap-input1">
                            <input
                              className="input1"
                              type="text"
                              value={one}
                              maxLength="3"
                              onChange={(e) => setOne(e.target.value)}
                              placeholder="Item"
                            />
                            <span className="shadow-input1"></span>
                          </div>
                        </div>
                        <div className="col-lg-1">-</div>
                        <div className="col-lg-3">
                          <div className="wrap-input1">
                            <input
                              className="input1"
                              type="text"
                              value={two}
                              maxLength="3"
                              onChange={(e) => setTwo(e.target.value)}
                              placeholder="Item"
                            />
                            <span className="shadow-input1"></span>
                          </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-3">
                          <div className="wrap-input1">
                            <input
                              className="input1"
                              type="text"
                              value={three}
                              maxLength="3"
                              onChange={(e) => setThree(e.target.value)}
                              placeholder="Item"
                            />
                            <span className="shadow-input1"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-data-from-btn ">
                  <button
                    type="submit"
                    className="data-from-btn"
                    disabled={!User.admin}
                  >
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
