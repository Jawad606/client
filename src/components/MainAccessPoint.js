import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import AddServiceTag from "./AddServiceTag/AddServiceTag";
import ApiComponent from "./ApiComponent";
import AssignAdd from "./Assign/AssignAdd/AssignAdd";
import AssignTags from "./Assign/AssignAdd/AssignTags";
import AssignProduct from "./Assign/AssignProduct/AssignProduct";
import ServiceTagAssign from "./Assign/AssignProduct/ServiceTag/ServiceTagAssign";
import AssignStore from "./Assign/AssignStore/AssignStore";
import BillDetail from "./Bill/BillDetail/BillDetail";
import PayBill from "./Bill/PayBill/PayBill";
import AddCatagory from "./Catagory/AddCatagories/AddCatagory";
import AddItems from "./Catagory/AddCatagories/AddItems/AddItems";
import Catagories from "./Catagory/Catagories/Catagories";
import Items from "./Catagory/Catagories/Items/Items";
import AddEmployee from "./Employees/AddEmplyee/AddEmployee";
import EmployeeDetail from "./Employees/EmplyeeDetail/EmployeeDetails/EmployeeDetails";
import Employees from "./Employees/EmplyeeDetail/Employees";
import Home from "./Home/Home";
import Login from "./Login/Login";
import MyPage from "./MyPage/MyPage";
import AddProduct from "./Products/AddProduct/AddProduct";
import Product from "./Products/Product/Product";
import ServiceTag from "./Products/Servicetag/ServiceTag";
import NavBar from "./SideNavBar/Navbar";
import Store from "./Store/Store";
import TopNav from "./TopNavBar/TopNav";
import AddUser from "./User/AddUser/AddUser";
import Setting from "./User/Setting/Setting";
import AddVender from "./Vender/AddVender/AddVender";
import Vender from "./Vender/Venders/Vender";

export function RenderNevigation() {
  const navigate = useNavigate();
  navigate("/home");
}

function MainAccessPoint() {
  const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  const location = useLocation();
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<Login />} />
      </Routes>

      <div className={`d-flex ${toggled ? "toggled" : ""}`}>
        {location.pathname !== "/login" && location.pathname !== "/" && (
          <ApiComponent />
        )}
        {location.pathname !== "/login" && location.pathname !== "/" && (
          <NavBar toggled={toggled} handleToggleSidebar={handleToggleSidebar}>
            {location.pathname !== "/login" && location.pathname !== "/" && (
              <TopNav
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
              />
            )}
            <Routes>
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                {/* Home */}
                <Route path="/home" element={<Home />} />
              </Route>
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                {/* Product */}
                <Route path="/product" element={<Product />} />
              </Route>
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addproduct" element={<AddProduct />} />
              </Route>
              {/* Catagories */}
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/catagory" element={<Catagories />} />
              </Route>
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/catagory/:id" element={<Items />} />
              </Route>
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addcatagory" element={<AddCatagory />} />
              </Route>
              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addcatagory/:id" element={<AddItems />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/store" element={<Store />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/assignproduct" element={<AssignProduct />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addassignproduct" element={<AssignAdd />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/assignstore" element={<AssignStore />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/venders" element={<Vender />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addvender" element={<AddVender />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/setting" element={<Setting />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/adduser" element={<AddUser />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/billdetail" element={<BillDetail />} />
              </Route>

              {/* <Route
            element={
              <PrivateWrapper
                auth={{ isAuthenticated: localStorage.getItem("auth") }}
              />
            }
          >
            <Route path="/paybill" element={<PayBill />} />
          </Route> */}

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/employeedetail" element={<Employees />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addemployee" element={<AddEmployee />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/employee/:id" element={<EmployeeDetail />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/codedeveloper" element={<MyPage />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/addservicetag" element={<AddServiceTag />} />
              </Route>

              <Route
                element={
                  <PrivateWrapper
                    auth={{ isAuthenticated: localStorage.getItem("auth") }}
                  />
                }
              >
                <Route path="/assignsevicetag" element={<AssignTags />} />
              </Route>

              <Route
            element={
              <PrivateWrapper
                auth={{ isAuthenticated: localStorage.getItem("auth") }}
              />
            }
          >
            <Route path="/servicetag/:id" element={<ServiceTag />} />
          </Route>
              <Route
            element={
              <PrivateWrapper
                auth={{ isAuthenticated: localStorage.getItem("auth") }}
              />
            }
          >
            <Route path="/servicetagassing/:id" element={<ServiceTagAssign />} />
          </Route>

            </Routes>
          </NavBar>
        )}
      </div>
    </>
  );
}

export default MainAccessPoint;
