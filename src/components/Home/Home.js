import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { showUser } from "../../features/userSlice";
import { showCatagory } from "../../features/catagorySlice";
import IsLoading from "../LoadingPage/isLoading";
import { showItem } from "../../features/itemSlice";
import { showUni } from "../../features/universitySlice";
import { showAssign } from "../../features/assignSlice";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "./Chart";
import FindTag from "./FindTag";
ChartJS.register(ArcElement, Tooltip, Legend);
const RenderCard = () => {
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);


  const CatagoryTotal = () => {
    var total = 0;
    catagoryList.map((data, i) => {
      return (total = i + 1);
    });
    return total;
  };
  const ItemTotal = () => {
    var total = 0;
    itemList.map((data, i) => {
      return (total = i + 1);
    });
    return total;
  };
  return (
    <>
      <div className="featured container d-flex justify-content-center py-3">
        <div className="row width d-flex justify-content-center">
          <>
            <div className="featuredItem col-md-5 col-sm-12">
              <span className="featuredTitle">Catagories</span>
              <div className="featuredMoneyContainer d-flex justify-content-center">
                <span className="featuredMoney ">{CatagoryTotal()}</span>
              </div>
              <span className="featuredSub">Total catagories</span>
            </div>
          </>
          <div className="featuredItem col-md-5 col-sm-12">
            <span className="featuredTitle">Items</span>
            <div className="featuredMoneyContainer d-flex justify-content-center">
              <span className="featuredMoney">{ItemTotal()}</span>
            </div>
            <span className="featuredSub">Total items</span>
          </div>
        </div>
      </div>
    </>
  );
};
function Home() {
  const { universityList } = useSelector(showUni);
  const { assignList } = useSelector(showAssign);
  const [filterData, setfilterData] = useState([]);
  const [filterDataAssign, setfilterDataAssign] = useState([]);
  const {  status } = useSelector(showUser);
  useEffect(() => {
    const filter = () => {
      return universityList.filter(({ createdAt }) => {
        const dateCreated = new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
        }).format(new Date(Date.parse(createdAt)));
        let today = new Date().toLocaleDateString("en-US", {
          dateStyle: "short",
        });
        console.log(dateCreated + "  " + today);
        return dateCreated === today;
      });
    };
    setfilterData(filter);
  }, [universityList]);

  useEffect(() => {
    const filter = () => {
      return assignList.filter(({ createdAt }) => {
        const dateCreated = new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
        }).format(new Date(Date.parse(createdAt)));
        let today = new Date().toLocaleDateString("en-US", {
          dateStyle: "short",
        });
        console.log(dateCreated + "  " + today);
        return dateCreated === today;
      });
    };
    setfilterDataAssign(filter);
  }, [assignList]);
  return (
    <>
      {status === "LoadingLogin" && <IsLoading />}
      <div className="container w-100 Page-Margin ">
        <div className="row">
          <div className="col-md-12 text-center">
            <RenderCard />
          </div>
        </div>
        <div className="row  mx-5 d-flex justify-content-center">
          <div className="col-md-4 p px-1 mb-2">
            <Chart />
          </div>
          <div className="col-md ms-md-4 p">
            <FindTag />
          </div>
        </div>
        <div className="row px-5 py-4 ">
          <div className="col-md-6  p overflow">
            <Link to={"/product"}>
              <h4 className="text-center">Products</h4>
            </Link>
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Catagory</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Model no</th>
                </tr>
              </thead>
              <tbody>
                {filterData.slice(0, 10).map((item, i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{item.catagory.catagoryName}</td>
                    <td>{item.item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.specification.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6 p overflow">
            <Link to={"/assignproduct"}>
              <h4 className="text-center">Assign</h4>
            </Link>
            <table className="table table-hover  ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Catagory</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Model no</th>
                </tr>
              </thead>
              <tbody>
                {filterDataAssign.slice(0, 10).map((item, i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{item.catagory.catagoryName}</td>
                    <td>{item.item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.specification.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
