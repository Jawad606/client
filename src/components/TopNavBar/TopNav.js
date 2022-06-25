import React, { useEffect,useState } from "react";
import "./TopNav.css";
import Clock from "react-live-clock";
import { FaBars } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, showUser } from "../../features/userSlice";
import { FaBell } from "react-icons/fa";
import Notify from "../notify/Notify";
function TopNav({ handleToggleSidebar }) {
  const negvigation = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(showUser);
  const [isOpen,setisOpen]=useState(false)
  const LogoutSlice = () => {
    dispatch(logout()).then(() => {
      negvigation("/");
    });
  };
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
              <div className="col-md-8 col-sm-8">
                <div className="row d-flex align-items-center">
                  <div
                    className="btn-toggle d-md-none col-2"
                    onClick={() => handleToggleSidebar(true)}
                  >
                    <div className="fabars d-flex justify-content-center align-items-center">
                      <FaBars />
                    </div>
                  </div>
                  <div className="col-10">
                    <Clock
                      className="time"
                      format={"dddd, MMMM DD, YYYY, h:mm:ss A"}
                      ticking={true}
                      timezone={"Asia/Karachi"}
                    />
                  </div>
                </div>
              </div>
              <div className="topnav col-md-4 col-sm-4 d-flex justify-content-end align-items-center ">
                <div>
                  <h5>Welcome! {localStorage.getItem("User")}</h5>
                </div>

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
