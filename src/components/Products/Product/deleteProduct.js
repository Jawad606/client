import React, { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStore, updateStore } from "../../../features/storeSlice";
import { showPayment, deletePayment } from "../../../features/paymentSlice";
import {
  showUni,
  fetchUni,
  deleteUni,
} from "../../../features/universitySlice";
import { useAlert } from "react-alert";

function DeleteProduct(props) {
  const dispatch = useDispatch();
  const User = JSON.parse(localStorage.getItem("Data"));
  const alert = useAlert();
  const { storeList } = useSelector(showStore);
  const {paymentList} =useSelector(showPayment)
  const UpdateStoreAdd = (id, quantityOld) => {
    var value={}
    if ( parseInt(quantityOld) < parseInt(props.data.quantity)){
      value = {
        quantity: 0,
      };
    }
    else{
      value = {
        quantity: parseInt(quantityOld) - parseInt(props.data.quantity),
      };
    }
    const data = { id: id, value: value };
    dispatch(updateStore(data))
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  const DeletePayment=(id)=>{
    dispatch(deletePayment(id))
    .then((response) => {
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const CheckStoreIDAdd = () => {
    storeList
      .filter(
        (item) =>
          item.item._id === props.data.item
      )
      .map((item) => UpdateStoreAdd(item._id, item.quantity));
  };

  const CheckPaymentID=()=>{
    paymentList
    .filter(
      (item) =>
        item.uniStore._id === props.data.id
    )
    .map((item) => DeletePayment(item._id));
  }
  const deleteProduct = () => {
    CheckStoreIDAdd();
    CheckPaymentID();
    dispatch(deleteUni(props.data.id))
      .then(() => {
        alert.success("Data Deleted successfully!");
      })
      .catch((error) => {
        alert.error("Error " + error);
      });
  };
  return (
    <div className="">
      Do you want to delete the record? 
      <br/>
      <div className=" d-flex justify-content-end">

      <div className="btn btn-danger mx-2" type="submit" onClick={deleteProduct} disabled={!User.admin}>
        Delete
      </div>
      <div>{props.children}</div>
      </div>
      {/* {props.data.id}
        {props.data.quantity} */}
    </div>
  );
}

export default DeleteProduct;
