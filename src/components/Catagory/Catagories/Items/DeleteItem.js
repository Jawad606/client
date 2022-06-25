import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../../../features/itemSlice';
function DeleteItem(props) {
    const dispatch=useDispatch()
    const User = JSON.parse(localStorage.getItem("Data"));
    const deleteProduct = () => {
        dispatch(deleteItem(props.data.id))
          .then(() => {
            alert.success("Data deleted successfully!");
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
  )
}

export default DeleteItem