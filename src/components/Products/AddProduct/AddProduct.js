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
import { addPayment } from "../../../features/paymentSlice";
import { showPaybill, updatepaybill } from "../../../features/paybillSlice";
import AddSpecification from "../../Specification/AddSpecification";
import { showSpecific } from "../../../features/specificSlice";
import EditSpecification from "../../Specification/EditSpecification";
function AddProduct() {
  const User = JSON.parse(localStorage.getItem("Data"));

  const { specificList } = useSelector(showSpecific);
  const { paybillList } = useSelector(showPaybill);
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
  const alert = useAlert();
  useEffect(() => {
    venderList
      .filter(
        (item) => item.catagory._id === catagoryID && item.item._id === itemId
      )
      .map((item) => setvenderId(item._id));
  }, [itemId, catagoryID, venderList]);

  useEffect(() => {
    const value = parseInt(totalPrice) / parseInt(quantity);

    setperUnitprice(Number(value.toFixed(3)));
  }, [totalPrice, quantity]);

  const UpdatePayBill = (id, quantityOld, unpaid) => {
    const value = {
      unpaid: parseInt(totalPrice) + parseInt(unpaid),
      quantity: parseInt(quantityOld) + parseInt(quantity),
    };
    const data = { id: id, value: value };
    dispatch(updatepaybill(data))
      .then((response) => {})
      .catch(function (error) {
        alert.error("Error " + error);
      });
  };
  const Payment = (uniStore) => {
    const user = JSON.parse(localStorage.getItem("Data"));
    const value = {
      uniStore: uniStore,
      quantity: quantity,
      per_unit_price: perUnitprice,
      total_price: totalPrice,
      vender: venderId,
      user: user._id,
    };
    dispatch(addPayment(value))
      .then((response) => {})
      .catch(function (error) {
        alert.error("Error " + error);
      });
  };
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
  const checkPayBill = () => {
    paybillList
      .filter(
        (item) => item.catagory._id === catagoryID && item.item._id === itemId
      )
      .map((item) => UpdatePayBill(item._id, item.quantity, item.unpaid));
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = {
      catagory: catagoryID,
      item: itemId,
      quantity: parseInt(quantity),
      // vender: venderId,
      specification:specificID,
      modelno:ModelNo
    };
    dispatch(addUni(value))
      .then((res) => {
        checkStoreID();
        // checkPayBill();
        // Payment(res.payload._id);
        navigate("/addservicetag",{state:res.payload});
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
  const handleChangeCat = (e) => {
    setcatagoryID(e.target.value);
  };
  const handleChangeItem = (e) => {
    setitemId(e.target.value);
  };
  const handleChangeTotal = (e) => {
    settotalPrice(e.target.value);
  };
  const handleChange=(data)=>{
    setclickEdit(!clickEdit)
    setSpecific_id(data)
  }
  const handleModelNo=(e)=>{
    setModelNo(e.target.value)
  }
  return (
    <>
      {click && <AddSpecification />}
      {clickEdit && <EditSpecification data={Specific_id} />}
      <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <form className={`data-from ${User.admin?'':'disabled'}`  }onSubmit={HandleSubmit}>
              <div className="row">
                <div className="col-md-11">
                  <span className="data-from-title">Add Product</span>
                </div>
                <div className="col-md-1 icon-back d-flex justify-content-center align-items-center">
                  <AiFillFileAdd
                    onClick={() => setclick(!click)}
                    className="icons colors"
                  />
                </div>
              </div>
              {/* Catagoy and item */}
              <div className="row">
                <div className="col-md-6">
                  <div className="row ">
                    <div className="col-md-4 py-1 text-start px-2">
                      <h5>Catagory</h5>
                    </div>
                    <div className="col-md-8">
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
                              <option value="">Select Catagory</option>
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
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4 py-1 text-start px-2">
                      <h5>Items</h5>
                    </div>
                    <div className="col-md-8">
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
                                  (sHowItem) =>
                                    sHowItem.catId._id === catagoryID
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
              {/* Qunatity and Total Price */}
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-2 py-1 text-start px-2">
                      <h5>Quantity</h5>
                    </div>
                    <div className="col-md-10">
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
                {/* <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 py-1 text-start px-2">
                      <h5>Total Price</h5>
                    </div>
                    <div className="col-md-8">
                      {" "}
                      <div className="wrap-input1">
                        <input
                          required
                          className="input1"
                          min={0}
                          type="number"
                          pattern="[0-9]*"
                          value={totalPrice}
                          onChange={handleChangeTotal}
                          placeholder="Purchaser"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Purchaser */}
              {/* <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col md-2 py-1 text-start px-2">
                      <h5>Unit Price</h5>
                    </div>
                    <div className="col-md-10">
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
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-2">
                      <h5>Model</h5>
                    </div>
                    <div className="col-md-10">
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
                              <option value="-1">Select Model Specification</option>
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
                <button type="submit" className="data-from-btn" disabled={!User.admin}>
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
          <div className="col-md-2 border-right">
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
                        <li key={i} >{items}</li>
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
