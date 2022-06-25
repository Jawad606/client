import React, { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStore, updateStore } from "../../../features/storeSlice";
import {
  showUni,
  fetchUni,
  deleteUni,
} from "../../../features/universitySlice";
import { useAlert } from "react-alert";
import { updateAssigns } from "../../../features/AssignStoreSlice";
import { deleteAssign } from "../../../features/assignSlice";
import { deleteVender } from "../../../features/venderSlice";

function DeleteVender(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const deleteProduct = () => {

    dispatch(deleteVender(props.data.id))
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

      <div className="btn btn-danger mx-2" type="submit" onClick={deleteProduct}>
        Delete
      </div>
      <div>{props.children}</div>
      </div>
      {/* {props.data.id}
        {props.data.quantity} */}
    </div>
  );
}

export default DeleteVender;
