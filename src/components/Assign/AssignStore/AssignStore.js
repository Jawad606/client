import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAssign } from "../../../features/assignSlice";
import { fetchAssigns, showAssignStore } from "../../../features/AssignStoreSlice";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import MailComponent from "../../MailComponent";
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
import ReportPdf from "./ReportPDF";

function AssignStore() {
  const dispatch=useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchAssigns())
  // },[dispatch])
  const { AssignListStore } = useSelector(showAssignStore);
  const [filterData, setfilterData] = useState(AssignListStore);
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [catagoryID, setcatagoryID] = useState("-1");
  const [itemId, setitemId] = useState("-1");
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [Report, setReport] = useState("");
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);

  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";
    const Filtered = () => {
      // 2022-04-06
      if (catagoryID !== "-1" || dateto !== "") {
        return AssignListStore.filter(
          // eslint-disable-next-line array-callback-return
          ({ _id, catagory, item, createdAt }) => {
            const dateCreated = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
            }).format(new Date(Date.parse(createdAt)));

            if (dateto.length !== 0) {
              datetoInput = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
              }).format(new Date(Date.parse(dateto)));
            }
            if (datefrom.length !== 0) {
              datefromInput = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
              }).format(new Date(Date.parse(datefrom)));
            }
            if (catagoryID !== "-1" && itemId === "-1") {
              console.log("if");
              return catagory._id === catagoryID || item._id === itemId;
            } else if (catagoryID !== "-1" && itemId !== "-1") {
              console.log("if else");
              return catagory._id === catagoryID && item._id === itemId;
            } else if (
              catagoryID !== "-1" &&
              itemId !== "-1" &&
              datetoInput.length !== 0 &&
              catagoryID !== "-1"
            ) {
              return (
                catagory._id === catagoryID &&
                item._id === itemId &&
                dateCreated === datetoInput
              );
            } else if (
              dateCreated.length !== 0 &&
              datetoInput.length !== 0 &&
              datefromInput.length === 0 &&
              catagoryID === "-1"
            ) {
              console.log("single");
              return dateCreated === datetoInput;
            } else if (
              dateCreated.length !== 0 &&
              datefromInput.length !== 0 &&
              datetoInput.length !== 0
            ) {
              console.log("double");
              return dateCreated >= datetoInput && dateCreated <= datefromInput;
            }
          }
        );
      } else {
        console.log("else");
        return AssignListStore.map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [catagoryID, itemId, AssignListStore, dateto, datefrom]);

  useEffect(() => {
    switch (Report) {
      case "1":
        ReportPdf(filterData)
        break;
      case "2":
        const dataset = filterData.map((item, i) => {
          const date = new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
          }).format(new Date(Date.parse(item.createdAt)));
          return {
            id: i,
            Catagory: item.catagory.catagoryName,
            Items: item.item.itemName,
            Quantity: item.quantity,
            Date: date,
          };
        });
        JSONTOCSV(dataset, "AssignSTOREIMS.csv");
        // csvDownload(dataset)
        break;
      default:
        break;
    }
  }, [Report, filterData]);

  const RenderStore = filterData.map((data, i) => {
    return (
      <tr key={i}>
        <td>{i}</td>
        <td>{data.catagory.catagoryName}</td>
        <td>{data.item.itemName}</td>
        <td>{data.quantity}</td>
        <td>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
          }).format(new Date(Date.parse(data.createdAt)))}
        </td>
      </tr>
    );
  });
  return (
    <>
    {Report === '3'&& <MailComponent /> }
    <div className="container ">

      <div className="row pe-5 d-flex justify-content-end">
        <div
          className=" col-md-1"
          onClick={() => {
            setfilter(!filter);
          }}
        >
          <p className="tool">Filter</p>
        </div>
        <div
          className=" col-md-1"
          onClick={() => {
            setexportas(!exportas);
          }}
        >
          <p className="tool">Export</p>
        </div>
      </div>
      <div  className={`row w-90 d-flex px-2 justify-content-center align-items-center py-2 ms-5 ${
          filter ? "d-block" : "d-none"
        } `}
      >
        <div className="col-md-3 m-0 py-2">
          <div className="wrap-input1 m-0">
            <div className="selectdiv">
              <label>
                <select
                  value={catagoryID}
                  onChange={(e) => setcatagoryID(e.target.value)}
                  className="input1"
                  name="Catagory"
                  id=""
                >
                  <option value="-1">Select Catagory</option>
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
        <div className="col-md-3 col-sm-12">
          <div className="wrap-input1 m-0">
            <div className="selectdiv">
              <label>
                <select
                  className="input1"
                  name="item"
                  value={itemId}
                  onChange={(e) => setitemId(e.target.value)}
                >
                  <option value="-1">Select Item</option>
                  {itemList
                    .filter((sHowItem) => sHowItem.catId._id === catagoryID)
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
        <div className="col-md-1">To</div>
        <div className="col-md-2 p-0 px-2">
          <div className="container-data-from-btn">
            <div className="wrap-input1 m-0">
              <input
                className="input1"
                type="Date"
                value={dateto}
                onChange={(e) => setdateto(e.target.value)}
                placeholder="Purchaser"
              />
              <span className="shadow-input1"></span>
            </div>
          </div>
        </div>
        <div className="col-md-1">From</div>
        <div className="col-md-2 p-0 px-2">
          <div className="container-data-from-btn">
            <div className="wrap-input1 m-0">
              <input
                className="input1"
                type="Date"
                value={datefrom}
                onChange={(e) => setdatefrom(e.target.value)}
                placeholder="Purchaser"
              />
              <span className="shadow-input1"></span>
            </div>
          </div>
        </div>
      </div>

      <div className={`row px-4 d-flex align-items-center  py-2 ${
          exportas ? "d-block" : "d-none"
        } `}
      >
        <div className="col-md-12 col-sm-12">
          <div className="wrap-input1">
            <div className="selectdiv">
              <label>
                <select
                  className="input1"
                  name="item"
                  value={Report}
                  onChange={(e) => setReport(e.target.value)}
                >
                  <option value="-1">Select Report</option>
                  <option value="1">PDF</option>
                  <option value="2">CSV</option>
                  <option value="3">Email</option>
                </select>
              </label>
            </div>
            <span className="shadow-input1"></span>
          </div>
        </div>
      </div>
    </div>

      <div className=" d-flex justify-content-center">
        <div className=" s w-90  p d-flex justify-content-md-center justify-content-sm-start">
            <table className="table table-hover rounded ">
            <thead>
              <tr>
                <th>id</th>
                <th>Catagory Name</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{RenderStore}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AssignStore;
