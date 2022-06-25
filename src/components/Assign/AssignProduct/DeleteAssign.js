import React, { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStore, updateStore } from "../../../features/storeSlice";
import {
  showUni,
  fetchUni,
  deleteUni,
} from "../../../features/universitySlice";
import { useAlert } from "react-alert";
import { showAssignStore, updateAssigns } from "../../../features/AssignStoreSlice";
import { deleteAssign } from "../../../features/assignSlice";

function DeleteAssign(props) {


  const { AssignListStore } = useSelector(showAssignStore);
  const { storeList } = useSelector(showStore);
  const dispatch = useDispatch();
  const alert = useAlert();

  const UpdateStoreAdd = (id, quantityOld) => {
    console.log(id, quantityOld);
    const value = {
      quantity: parseInt(quantityOld) + parseInt(props.data.quantity),
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
    console.log(props.data.item)
    console.log(storeList)
    storeList
      .filter(
        (item) =>
          item.item._id === props.data.item
      )
      .map((item) => UpdateStoreAdd(item._id, item.quantity));
  };

  const UpdateAssignStoreAdd = (id, quantityOld) => {
    console.log(id, quantityOld);
    const value = {
      quantity: parseInt(quantityOld) - parseInt(props.data.quantity),
    };
    const data = { id: id, value: value };
    console.log(quantityOld)
    dispatch(updateAssigns(data))
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const CheckAssignStoreIDAdd = () => {
    AssignListStore
      .filter(
        (item) =>
          item.item._id === props.data.item
      )
      .map((item) => UpdateAssignStoreAdd(item._id, item.quantity));
  };
  const deleteProduct = () => {
    CheckAssignStoreIDAdd();
    CheckStoreIDAdd();
    dispatch(deleteAssign(props.data.id))
      .then(() => {
        alert.success("Data Deleted successfully!");
      })
      .catch((error) => {
        alert.error("Error " + error);
      });
  };
  return (
    <div className="">
       {props.data.quantity}
      Do you want to delete the record? 
      <br/>
      <div className=" d-flex justify-content-end">

      <div className="btn btn-danger mx-2" type="submit" onClick={deleteProduct}>
        Delete
      </div>
      <div>{props.children}</div>
      </div>
     
    </div>
  );
}

export default DeleteAssign;
