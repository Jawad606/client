import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

function PayBill() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const HandleSubmit = (event) => {
    event.preventDefault();
    const value = {
     
    };
    dispatch((value))
      .then((response) => {
        alert.success("Data insert successfully!");
      })
      .catch(function (error) {
        alert.error("Error " + error);
        console.log(error);
      });
  };
  return (
    <div>
       <div className="container w-100 Page-Margin">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-6  ">
            <form className="data-from " onSubmit={HandleSubmit}>
              <div className="row d-flex justify-content-center">
                <div className="col-md-11">
                  <span className="data-from-title">Pay Bill</span>
                </div>
              </div>
              {/* Catagoy and item */}
              <div className="row d-flex justify-content-start">
                <div className="col-md-12">
                  <div className="row">
                  </div>
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="row">
                  </div>
                </div>
                <div className="container-data-from-btn ">
                  <button type="submit" className="data-from-btn">
                    <span>
                      Save
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
    </div>
  )
}

export default PayBill