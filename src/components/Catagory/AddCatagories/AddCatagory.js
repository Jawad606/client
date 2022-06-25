import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCatagory } from "../../../features/catagorySlice";
import "./Add.css";
import { useAlert } from "react-alert";
import { AiFillFileAdd } from "react-icons/ai";
import ReadCsv from "../../ReadCSV/ReadCsv";
function AddCatagory() {
  const [Catagory, setCatagory] = useState("");
  const [click, setclick] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const User = JSON.parse(localStorage.getItem("Data"));
  const nevigation = useNavigate();
  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = { catagoryName: Catagory };
    dispatch(addCatagory(value))
      .then((response) => {
        console.log(response.payload._id);
        nevigation(`/addcatagory/${response.payload._id}`);
        alert.success("Data insert successfully!");
      })
      .catch(function (error) {
        alert.error("Error " + error);
      });

    setCatagory("");
  };
  const handleChangePur = (e) => {
    setCatagory(e.target.value);
  };
  return (
    <>
      {click && <ReadCsv from="catagory" />}

      <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <form className="data-from " onSubmit={HandleSubmit}>
              <div className="row">
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
              {/* Purchaser */}
              <div className="row">
                <div className="col-md-2 py-1 px-2">
                  <h5>Catagory</h5>
                </div>
                <div className="col-md-10 ">
                  <div className="wrap-input1">
                    <input
                      className="input1"
                      type="text"
                      value={Catagory}
                      onChange={handleChangePur}
                      placeholder="Catagory"
                    />
                    <span className="shadow-input1"></span>
                  </div>
                </div>
              </div>
              <div className="container-data-from-btn">
                <button type="submit" className="data-from-btn"  disabled={!User.admin}>
                  <span>
                    Save & Next
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCatagory;
