import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import {} from "react-icons/fa";
import { showUser, login } from "../../features/userSlice";
import IsLoading from "../LoadingPage/isLoading";
function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const { status } = useSelector(showUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleUser = (event) => {
   
       const data = {
      username: userName,
      password: password,
    };
      dispatch(login(data)).then((response) => {
        if(response.payload.success){
          navigate("/home");
        }
        else{
          console.log("try again later")
        }
      });

    event.preventDefault();
  };
  const handleUsername = (e) => {
    setuserName(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  return (
    <>
      {status === "LoadingLogin" ? (
        <IsLoading />
      ) : (
        <div className="col-md-12">
          <div className="container-fluid   h-10  d-flex justify-content-center align-items-center ">
            <div className="row w-5 d-flex  justify-content-center">
              <div className="col-md-12   col-lg-10 ">
                <div className="wrap d-md-flex">
                  <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center justify-content-center order-md-last">
                    <div className="text ">
                    <img src="./COMSATS_new_logo.png" width={'100'} alt="" />
                      <h2>Inventory Management System</h2>
                      <p>Comsats Universtiy Sahiwal</p>
                       <a className='Remove' href='https://jawad606.github.io/personal-portfolio' target='_blank' rel="noreferrer"> Codex Developers</a> 
                    </div>
                  </div>
                  <div className="login-wrap p-4 p-lg-5">
                    <div className="d-flex">
                      <div className="w-100">
                        <h3 className="mb-4">Login</h3>
                      </div>
                    </div>
                    <form onSubmit={HandleUser} className="signin-form">
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="name">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={userName}
                          onChange={handleUsername}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={handlePassword}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control btn btn-primary submit px-3"
                        >
                          Login
                        </button>
                      </div>
                      <div className="form-group d-md-flex">
                        <div className="w-50 text-md-right">
                          <a href="/">Forgot Password</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
