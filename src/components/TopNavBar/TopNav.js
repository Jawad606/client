import React, { useEffect, useState } from "react";
import "./TopNav.css";
import Clock from "react-live-clock";
import { FaBars } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, showUser } from "../../features/userSlice";
import { FaBell } from "react-icons/fa";
import Notify from "../notify/Notify";
import { AiFillBell } from "react-icons/ai";
import { showStore } from "../../features/storeSlice";
function TopNav({ handleToggleSidebar, location }) {
  const negvigation = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(showUser);
  const { storeList } = useSelector(showStore);
  const [isOpen, setisOpen] = useState(false);
  const LogoutSlice = () => {
    dispatch(logout()).then(() => {
      negvigation("/");
    });
  };

  const RenderPanel = () => {
    return (
      <div className="position-absolute bg-panel">
        <div className="info">
          {" "}
          <table className='table table-hover'>
            <thead>
              <th>Catagory</th>
              <th>Item</th>
              <th>Quantity</th>
            </thead>
            <tbody>
            {storeList
            .filter((item) => item.quantity <= 10)
            .map((item) => (
                <tr>
                <td className='text-start'>{item.catagory.catagoryName}</td>
                <td className='text-start'>{item.item.itemName}</td>
                <td className='text-start'>{item.quantity}</td>
              </tr>
             
            ))}{" "}
            
            </tbody>
          </table>
        
        </div>
      </div>
    );
  };
  console.log(isOpen);
  return (
    <>
      {status === "LoadingLogout" ? (
        <isLoading />
      ) : (
        <div className="topNav p-2 top ">
          <div className="   w navbar navbar-expand-lg container-fluid  round ">
            <div
              className={`row  d-flex justify-content-center  align-items-center py-2 w-1000`}
            >
              <div className="col-lg-8 col-sm-8">
                <div className="row d-flex align-items-center">
                  <div
                    className="btn-toggle d-lg-none col-2"
                    onClick={() => handleToggleSidebar(true)}
                  >
                    <div className="fabars d-flex justify-content-center align-items-center">
                      <FaBars />
                    </div>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-8">
                        <Clock
                          className="time"
                          format={"dddd, MMMM DD, YYYY, h:mm:ss A"}
                          // format={"short"}
                          ticking={true}
                          timezone={"Asia/Karachi"}
                        />
                      </div>
                      <div className="col-4">
                        <h5 className="text-end location"> {location}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="topnav col-lg-4 col-sm-4 d-flex justify-content-end align-items-center ">
                <div>
                  <h5>Welcome! {localStorage.getItem("User")}</h5>
                </div>
                <button
                  type="button"
                  onClick={() => setisOpen(!isOpen)}
                  class="btn btn-primary position-relative mx-2"
                >
                  <AiFillBell className="icons-color" />
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {storeList.filter((item) => item.quantity <= 10).length}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                  {isOpen && <RenderPanel />}
                </button>
                <div className="px-2 " onClick={() => LogoutSlice()}>
                  <RiLogoutBoxRLine className="icons-color" />
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
}

export default TopNav;
