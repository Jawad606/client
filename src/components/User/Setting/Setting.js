import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../../../features/userSlice";
import Switch from "react-switch";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import ChangePassword from "./ChangePassowrd";
function Setting() {
  var retrievedObject = localStorage.getItem('Data');
  const data=JSON.parse(retrievedObject)
  const [firstname, setfirstname] = useState(data.firstname);
  const [lastname, setlastname] = useState(data.lastname);
  const [designation, setdesignation] = useState(data.designation);
  const [email, setemail] = useState(data.email);
  const [admin, setadmin] = useState(data.admin);
  const [Modle, setModle] = useState(false);
  const toggle = (id) => {
    setModle(!Modle);
  };
  return (
    <div>
       <Modal
          centered
          fullscreen="md"
          size="lg"
          isOpen={Modle}
          toggle={() => toggle()}
        >
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <ChangePassword  id={data._id}/>
            {/* <UpdateProduct data={data} /> */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => toggle()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <div className="container w-100 Page-Margin">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <form className="data-from ">
              <span className="data-from-title">Update User</span>
              {/* Purchaser */}
              <div className="row  py-2 d-flex align-items-center justify-content-end">
               <div className="col-md-12 d-flex align-items-center justify-content-end">
                 <h5 className="h5" onClick={()=>toggle()}>Change Password</h5>

               </div>
              </div>
              <div className="row  py-4 d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">First Name</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1">
                        <input
                          className="input1"
                          onChange={ (e)=> setfirstname(e.target.value) }
                          value={firstname}
                          type="text"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Last Name</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input
                          className="input1"
                          value={lastname}
                          onChange={ (e)=> setlastname(e.target.value) }
                          type="text"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Designation</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input
                          className="input1"
                          value={designation}
                          onChange={ (e)=> setdesignation(e.target.value) }
                          type="text"
                        />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5"> Email</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="wrap-input1 m-0">
                        <input className="input1"  onChange={ (e)=> setemail(e.target.value) } value={email} type="text" />
                        <span className="shadow-input1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <h5 className="h5">Admin</h5>
                    </div>
                    <div className="col-md-8">
                      <Switch
                        onColor="#2f659b"
                         onChange={()=>setadmin(!admin)}
                        checked={admin}
                        uncheckedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 12,
                              color: "#fff",
                              fontWeight: 700,
                              paddingRight: 2,
                            }}
                          >
                            OFF
                          </div>
                        }
                        checkedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#fff",
                              paddingRight: 2,
                            }}
                          >
                            NO
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-data-from-btn">
                <button type="submit" className="data-from-btn">
                  <span>
                    Submit
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
    </div>
  );
}

export default Setting;
