import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { showCatagory } from "../../features/catagorySlice";
import { showItem } from "../../features/itemSlice";
import { addSpecific } from "../../features/specificSlice";
function AddSpecification() {
  const dispatch=useDispatch()
  const [ModleEdit, setModleEdit] = useState(true);
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const [catagoryID, setcatagoryID] = useState("");
  const [itemId, setitemId] = useState("");
  const [name, setname] = useState("");
  const [Specification, setSpecification] = useState("");
  const alert = useAlert();
  
  const HandleSubmit = (event) => {
    event.preventDefault();
    const value={
        catagory:catagoryID ,
        item: itemId ,
        model: name ,
        specification :Specification,
    }
    dispatch(addSpecific(value)).then((res) => {
        alert.success("Data insert successfully!");
      })
      .catch((error) => {
        alert.error("Error " + error);
      });
  };
  return (
    <Modal
      centered
      fullscreen="md"
      size="lg"
      isOpen={ModleEdit}
      toggle={() => setModleEdit(!ModleEdit)}
    >
      <form onSubmit={HandleSubmit}>
        <ModalHeader>Add Specification</ModalHeader>
        <ModalBody>
          <div className="container">
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
                            onChange={(e) => setcatagoryID(e.target.value)}
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
                            onChange={(e) => setitemId(e.target.value)}
                          >
                            <option value="-1">Select Item</option>
                            {itemList
                              .filter(
                                (sHowItem) => sHowItem.catId._id === catagoryID
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
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4 py-1 text-start px-2">
                    <h5>Model</h5>
                  </div>
                  <div className="col-md-8">
                    {" "}
                    <div className="wrap-input1">
                      <input
                        required
                        autoCapitalize="true"
                        min={0}
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="input1"
                        placeholder="Quantiy"
                      />
                      <span className="shadow-input1"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">
                    <h5>Specification</h5>
                  </div>
                  <div className="col-md-8">
                    <textarea
                      className="input1"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={Specification}
                      onChange={(e) => setSpecification(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="container-data-from-btn">
            <button type="submit" className="data-from-btn">
              <span>
                Submit
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
}
export default AddSpecification;