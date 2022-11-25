import React, { useState, useEffect } from "react";
import "./main.css";
import { AiFillFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import { showStore, updateStore } from "../../../features/storeSlice";
import { addUni } from "../../../features/universitySlice";
import { useAlert } from "react-alert";
import { showVender } from "../../../features/venderSlice";
import { showPaybill, updatepaybill } from "../../../features/paybillSlice";
import AddSpecification from "../../Specification/AddSpecification";
import { showSpecific } from "../../../features/specificSlice";
import EditSpecification from "../../Specification/EditSpecification";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function AddProduct() {
  const User = JSON.parse(localStorage.getItem("Data"));
  const [dateto, setdateto] = useState("");
  const { specificList } = useSelector(showSpecific);
  const { venderList } = useSelector(showVender);
  const { storeList } = useSelector(showStore);
  const [click, setclick] = useState(false);
  const [clickEdit, setclickEdit] = useState(false);
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const [catagoryID, setcatagoryID] = useState("");
  const [itemId, setitemId] = useState("");
  const [specificID, setspecificID] = useState("");
  const [venderId, setvenderId] = useState("");
  const [quantity, setquanitity] = useState(0);
  const [ModelNo, setModelNo] = useState("");
  const [perUnitprice, setperUnitprice] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [Specific_id, setSpecific_id] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [asset, setAsset] = useState("");
  const alert = useAlert();
  // useEffect(() => {
  //   venderList
  //     .filter(
  //       (item) => item.catagory._id === catagoryID && item.item._id === itemId
  //     )
  //     .map((item) => setvenderId(item._id));
  // }, [itemId, catagoryID, venderList]);

  // useEffect(() => {
  //   const value = parseInt(totalPrice) / parseInt(quantity);

  //   setperUnitprice(Number(value.toFixed(3)));
  // }, [totalPrice, quantity]);

  // const UpdatePayBill = (id, quantityOld, unpaid) => {
  //   const value = {
  //     unpaid: parseInt(totalPrice) + parseInt(unpaid),
  //     quantity: parseInt(quantityOld) + parseInt(quantity),
  //   };
  //   const data = { id: id, value: value };
  //   dispatch(updatepaybill(data))
  //     .then((response) => {})
  //     .catch(function (error) {
  //       alert.error("Error " + error);
  //     });
  // };

  const UpdateStore = (id, quantityOld) => {
    const value = { quantity: parseInt(quantityOld) + parseInt(quantity) };
    const data = { id: id, value: value };
    dispatch(updateStore(data))
      .then((response) => {})
      .catch(function (error) {
        alert.error("Error " + error);
      });
  };
  const checkStoreID = () => {
    storeList
      .filter(
        (item) => item.catagory._id === catagoryID && item.item._id === itemId
      )
      .map((item) => UpdateStore(item._id, item.quantity));
  };

  // const new2 = new Date(Date.parse(dateto));
  // console.log(
  //   new Intl.DateTimeFormat("en-US", {
  //     dateStyle: "short",
  //   }).format(new2)
  // );

  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = {
      catagory: catagoryID,
      item: itemId,
      quantity: parseInt(quantity),
      // vender: venderId,
      specification: specificID,
      modelno: ModelNo,
      dateToAdd: new Date(Date.parse(dateto)),
    };
    dispatch(addUni(value))
      .then((res) => {
        checkStoreID();
        navigate("/addservicetag", { state: res.payload });
        alert.success("Data insert successfully!");
      })
      .catch((error) => {
        alert.error("Error " + error);
      });

    setquanitity("");
    setitemId("");
    setcatagoryID("");
    setvenderId("");
  };

  const handleChangeQun = (e) => {
    setquanitity(e.target.value);
  };
  const handleChangePur = (e) => {
    setperUnitprice(e.target.value);
  };
  const handleChangeCat = (e, value) => {
    setcatagoryID(value);
  };
  const handleChangeItem = (e) => {
    setitemId(e.target.value);
  };
  const handleChangeTotal = (e) => {
    settotalPrice(e.target.value);
  };
  const handleChange = (data) => {
    setclickEdit(!clickEdit);
    setSpecific_id(data);
  };
  const handleModelNo = (e) => {
    setModelNo(e.target.value);
  };
  return (
    <>
      {click && <AddSpecification />}
      {clickEdit && <EditSpecification data={Specific_id} />}
      <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <form
              className={`data-from ${User.admin ? "" : "disabled"}`}
              onSubmit={HandleSubmit}
            >
              <div className="row">
                <div className="col-lg-11">
                  <span className="data-from-title">Add Product</span>
                </div>
                <div className="col-lg-1 icon-back d-flex justify-content-center align-items-center">
                  <AiFillFileAdd
                    onClick={() => setclick(!click)}
                    className="icons colors"
                  />
                </div>
              </div>
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
              {/* Catagoy and item */}
              <div className="row pb-3">
                <div className="col-lg-6">
                  <div className="row ">
                    <div className="col-lg-4 py-1 text-start px-2">
                      <h5>Catagory</h5>
                    </div>
                    <div className="col-lg-8 ">
                      <Autocomplete
                        onChange={(event, value, reason) =>
                          reason === "clear"
                            ? setcatagoryID("-1")
                            : setcatagoryID(value._id)
                        }
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
                        onChange={(event, value, reason) =>
                          reason === "clear"
                            ? setcatagoryID("-1")
                            : setitemId(value._id)
                        }
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
              {/* Qunatity and Total Price */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 py-1 text-start px-2">
                      <h5>Quantity</h5>
                    </div>
                    <div className="col-lg-10">
                      {" "}
                      <div className="wrap-input1">
                        <input
                          required
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
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-2 py-1 text-start px-2">
                      <h5>Date</h5>
                    </div>
                    <div className="col-lg-10">
                      {" "}
                      <div className="wrap-input1">
                        <input
                          className="input1"
                          type="Date"
                          value={dateto}
                          onChange={(e) => setdateto(e.target.value)}
                          placeholder="Date of Purchase"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Purchaser */}
              {/* <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col md-2 py-1 text-start px-2">
                      <h5>Unit Price</h5>
                    </div>
                    <div className="col-lg-10">
                      <div className="wrap-input1">
                        <input
                          required
                          className="input1"
                          type="text"
                          value={perUnitprice}
                          onChange={handleChangePur}
                          disable={true}
                          placeholder="Purchaser"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-2 border-right">
            <h1>Preset</h1>
            {specificList
              .filter((item) => item._id === specificID)
              .map((item, i) => {
                return (
                  <>
                    <ul key={i}>
                      {item.specification
                        .split(",")
                        .filter((item) => item.length !== 0)
                        .map((items, i) => (
                          <li key={i}>{items}</li>
                        ))}
                    </ul>
                    <div
                      className="viewButton my-5"
                      onClick={() => handleChange(item)}
                    >
                      Eidt
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
