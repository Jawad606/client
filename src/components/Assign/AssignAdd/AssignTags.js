import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showTags, updatetags } from "../../../features/tagSlice";
import { useAlert } from "react-alert";
function AssignTags() {
  const location = useLocation();
  const alert = useAlert();
  const { tagList } = useSelector(showTags);
  const [filteredMap, setFilteredMap] = useState(
    tagList
      .filter(
        ({ statusOfassign, item, specification }) =>
          statusOfassign !== true &&
          specification._id === location.state.specification._id &&
          item._id === location.state.item._id
      )
      .map((item) => item)
  );
  const dispatch = useDispatch();
  const [checkArray, setCheckarray] = useState(
    new Array(
      tagList.filter(
        ({ statusOfassign, item, specification }) =>
          statusOfassign !== true &&
          specification._id === location.state.specification._id &&
          item._id === location.state.item._id
      ).length
    ).fill(false)
  );
  const handleOnChange = (position) => {
    const updatedCheckedState = checkArray.map((item, index) =>
      index === position ? !item : item
    );
    setCheckarray(updatedCheckedState);
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    const AddnewArray = filteredMap
      .filter((item, i) => checkArray[i] === true)
      .map((item) => {
        const object = {
          _id: item._id,
          statusOfassign: true,
          assign: location.state._id,
        };
        return object;
      });
    dispatch(updatetags(AddnewArray.filter((item) => item !== false)))
      .then((res) => alert.success("Data insert successfully!"))
      .catch((error) => {
        alert.error("Error " + error);
      });
    setFilteredMap(
      filteredMap
        .filter((item, i) => checkArray[i] !== true)
        .map((item) => item)
    );
    setFilteredMap(
      filteredMap
        .filter((item, i) => checkArray[i] !== true)
        .map((item) => item)
    );
    setCheckarray(
      checkArray.filter((item, i) => checkArray[i] !== true).map((item) => item)
    );
  };

  return (
    <div>
      <h3 className="text-center mb-4">Assign Order Detail</h3>
      <div className="container">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <h4>
                  Specification : {location.state.specification.specification}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={HandleSubmit} className="py-4">
        <button type="submit" className="data-from-btn me-auto ms-auto">
          <span>
            Submit
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </span>
        </button>
      </form>
      <table className="table table-hover rounded ">
        <thead>
          <tr>
            <th>ID</th>
            <th>tag</th>
          </tr>
        </thead>
        <tbody>
          {filteredMap.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.tag}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={checkArray[index]}
                    onChange={() => handleOnChange(index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AssignTags;
