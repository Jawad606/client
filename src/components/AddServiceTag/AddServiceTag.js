import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtags } from "../../features/tagSlice";
import { useAlert } from "react-alert";
function AddServiceTag() {
  const location = useLocation();
  const dispatch=useDispatch();
  const [namelist, setnamelist] = useState([]);
  const [namebuffer, setnamebuffer] = useState("");
  const [checkCount, setCheckcount] = useState(0);
  const alert = useAlert();
 const AddToDatabase=()=>{
  dispatch(addtags(namelist))
  .then((res)=> alert.success("Data insert successfully!"))
  .catch((error) => {
    alert.error("Error " + error);
  })
 }

  const handleSubmit = (event) => {
    
    setCheckcount(checkCount + 1);
    if (location.state.quantity > checkCount) {
      setnamelist((state) => [...state, { tag: namebuffer,catagory:location.state.catagory._id,item:location.state.item._id,uniStore:location.state._id,statusOfassign:false,specification:location.state.specification }]);
    }
    setnamebuffer("");
    event.preventDefault();
  };
  const handleDelete = (tag) => {
    setnamelist(namelist.filter((item) => item.tag !== tag));
  };
  return (
    <div className="container">
      <div className="row d-flex flex-row">
        <div className="col-md-7">
          <h1 className="text-center mb-5">
            Please add {location.state.quantity} Tags
          </h1>
          <form
            onSubmit={handleSubmit}
            className="px-5 d-flex justify-content-center align-items-center "
          >
            <input
              type={"text"}
              className="input1 my-3 mx-2"
              value={namebuffer}
              placeholder="Add Tags Here"
              onChange={(e) => setnamebuffer(e.target.value)}
            />
            <button type="submit" className={`w-50  data-from-btn input1 ${checkCount===location.state.quantity?'disabled':""}`} >Add</button>
          </form>
        </div>
        <div className="col-md-5  d-flex justify-content-center  flex-column text-center">
          <div className="">
            <h1 className="mb-3">Tags Added </h1> 
            <button  className="data-from-btn" onClick={AddToDatabase}>Submit</button>
            <table className="table table-hover ">
              <tbody>
                {namelist.map((a, i) => (
                  <tr key={i}>
                    <div className="text-center">
                      <td>
                        <h3>
                          {i}.{a.tag}
                        </h3>
                      </td>
                      <td>
                        <div className="cellAction ms-2">
                          <div
                            className="deleteButton"
                            onClick={() => handleDelete(a.tag)}
                          >
                            {" "}
                            Delete
                          </div>
                        </div>
                      </td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <></>
    </div>
  );
}

export default AddServiceTag;
