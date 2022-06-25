import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showEmployee } from "../../../features/emplyeeSlice";
import MailComponent from "../../MailComponent";
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
import ReportPdf from "../../Store/ReportPDF";
import { Link } from "react-router-dom";
function Employees() {
  const { employeeList } = useSelector(showEmployee);
  const [filterData, setfilterData] = useState(employeeList);
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [Report, setReport] = useState("");
  const [DepatID, setDepatID] = useState("-1");
  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";
    const Filtered = () => {
      // 2022-04-06
      if (dateto !== "" || DepatID !== "-1") {
        return employeeList.filter(
          // eslint-disable-next-line array-callback-return
          ({ _id, catagory, item, Department, createdAt }) => {
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
            if (datetoInput.length !== 0) {
              return dateCreated === datetoInput;
            } else if (
              datefromInput.length === 0 &&
              datetoInput.length === 0 &&
              DepatID.length !== 0
            ) {
              return Department === DepatID;
            } else if (
              dateCreated.length !== 0 &&
              datefromInput.length !== 0 &&
              datetoInput.length !== 0
            ) {
              return dateCreated >= datetoInput && dateCreated <= datefromInput;
            }
          }
        );
      } else {
        console.log("else");
        return employeeList.map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [employeeList, dateto, datefrom, DepatID]);

  useEffect(() => {
    switch (Report) {
      case "1":
        // ReportPdf(filterData);
        ReportPdf(filterData);
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
        JSONTOCSV(dataset, "STOREIMS.csv");
        // csvDownload(dataset)
        break;
      default:
        break;
    }
  }, [Report, filterData]);

  const RenderStore = filterData.map((data, i) => {
    const { employeeName, Designation, Department, createdAt } = data;
    return (
      <tr key={i}>
        <td>{i}</td>
        <td>
          {" "}
          <Link
            to={{
              pathname: `/employee/${data._id}`,
            }}
            params={{ id: data._id, employeeName: data.employeeName }}
          >
            {employeeName}{" "}
          </Link>{" "}
        </td>
        <td>{Designation}</td>
        <td>{Department}</td>
        <td>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
          }).format(new Date(Date.parse(createdAt)))}
        </td>
      </tr>
    );
  });
  return (
    <>
      {Report === "3" && <MailComponent />}
      <div className="container">
        <div className="row px-5 d-flex justify-content-end">
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
        <div
          className={`row px-5 d-flex align-items-center   justify-content-center py-2 ${
            filter ? "d-block" : "d-none"
          } `}
        >
          <div className="col-md-2 col-sm-12">
            <div className="wrap-input1 m-0">
              <div className="selectdiv">
                <label>
                  <select
                    className="input1"
                    name="item"
                    value={DepatID}
                    onChange={(e) => setDepatID(e.target.value)}
                  >
                    <option value="-1">Department</option>
                    <option value="Ms Department">Ms Depart</option>
                    <option value="Cs Department">Cs Depart</option>
                    <option value="ME Department">ME Depart</option>
                    <option value="EE Department">EE Depart</option>
                    <option value="CE Department">CE Depart</option>
                  </select>
                </label>
              </div>
              <span className="shadow-input1"></span>
            </div>
          </div>
          <div className="col-md-1 text-end">To</div>
          <div className="col-md-2 p-0 px-1">
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
          <div className="col-md-1 text-end">From</div>
          <div className="col-md-2 p-0 px-1">
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
        <div
          className={`row px-5 d-flex align-items-center justify-content-center py-2 ${
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
        <div className="row">
          <div className=" d-flex justify-content-center">
            <div className=" s w-90  p d-flex justify-content-md-center justify-content-sm-start">
              <table className="table table-hover rounded">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Employee Name</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>{RenderStore}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;
