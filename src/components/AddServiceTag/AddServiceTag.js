import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtags } from "../../features/tagSlice";
import { useAlert } from "react-alert";
import { showItem, updateItem } from "../../features/itemSlice";
import {  Button } from "reactstrap";
function AddServiceTag() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [namelist, setnamelist] = useState([]);
  const [checkCount, setCheckcount] = useState(0);
  const { itemList } = useSelector(showItem);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const HandleSubmit = () => {
    const value = {
      assetId: String(namelist.slice(-1).map((item) => item.tag)),
    };
    const data = { id: location.state.item._id, value: value };
    dispatch(updateItem(data)).catch((error) => {
      console.log(error);
    });
  };

  const [assetId, setassetId] = useState(
    String(
      itemList
        .filter((item) => item._id === location.state.item._id)
        .map((item) => item.assetId)
    )
  );

  const [assetIds, setAssetIds] = useState([]);
  const three2 = assetId.split("-")[2];

  const alert = useAlert();
  const AddToDatabase = () => {
    dispatch(addtags(namelist))
      .then((res) => {
        alert.success("Data insert successfully!");
        HandleSubmit();
      })
      .catch((error) => {
        alert.error("Error " + error);
      });
  };

  const handleDelete = (tag) => {
    setCheckcount(checkCount - 1);
    setnamelist(namelist.filter((item, i) => i !== tag));
  };

  useEffect(() => {
    if (assetIds.length - 1 !== location.state.quantity) {
      const zeroPad = (num, places) => String(num).padStart(places, "0");
      for (let i = 0; i < location.state.quantity; i++) {
        console.log(zeroPad(parseInt(three2) + (i + 1), 3));
        // console.log(i);
        setAssetIds((old) => [
          ...old,
          assetId.slice(0, 8) + zeroPad(parseInt(three2) + (i + 1), 3),
        ]);
        setnamelist((state) => [
          ...state,
          {
            tag:
              assetId.slice(0, 8) +
              zeroPad(parseInt(three2) + (i + 1), 3),
            catagory: location.state.catagory._id,
            item: location.state.item._id,
            uniStore: location.state._id,
            statusOfassign: false,
            specification: location.state.specification,
          },
        ]);
      }
    }
  }, [location.state.quantity, three2]);

  const Handle_Additional=()=>{
    setnamelist((state) => [
      ...state,
      {
        tag:one + "-" + two + "-" + three,
        catagory: location.state.catagory._id,
        item: location.state.item._id,
        uniStore: location.state._id,
        statusOfassign: false,
        specification: location.state.specification,
      },
    ]);
  }
  // console.log(namelist);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-12  d-flex justify-content-center  flex-column text-center">
          <div className="d-flex flex-column align-items-center">
            <h1 className="mb-5">Tags Added </h1>
            <div className="col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-2 py-1 px-1 text-start">
                      <h5>Asset Id</h5>
                    </div>
                    <div className="col-lg-10">
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
                        <div className="col-lg-1">
                        <Button onClick={Handle_Additional}>Add</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            <button
              className="data-from-btn w-50 mt-3 mb-3"
              onClick={AddToDatabase}
            >
             {namelist.length===location.state.quantity?'Submit':'Please equal the qunatity' } 
            </button>
            <table className="table table-hover ">
              <thead>
                <th>No</th>
                <th>Tag</th>
                <th>Action</th>
              </thead>
              <tbody>
                {namelist.map((a, i) => (
                  <tr key={i}>
                   
                      <td>
                        <h6>
                          {i} 
                        </h6>
                      </td>
                      <td>
                        <h6>
                           {a.tag}
                        </h6>
                      </td>
                      <td>
                        <div className="cellAction ms-2">
                          <div
                            className="deleteButton"
                            onClick={() => handleDelete(i)}
                          >
                            {" "}
                            Delete
                          </div>
                        </div>
                      </td>
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
