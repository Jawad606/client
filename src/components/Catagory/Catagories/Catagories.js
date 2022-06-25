import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { showCatagory } from "../../../features/catagorySlice";
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
import ReportPdf from "./ReportsPDF/ReportPdf";
import UpdateCatagory from "./UpdateCatagory";
import DeleteCatagory from "./DeleteCatagory";
import MailComponent from "../../MailComponent";
const RenderShow = () => {
  const [ModleEdit, setModleEdit] = useState(false);
  const [ModleDelete, setModleDelete] = useState(false);
  const { catagoryList } = useSelector(showCatagory);
  const [filterData, setfilterData] = useState(catagoryList);
  const [catagoryID, setcatagoryID] = useState("-1");
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [Report, setReport] = useState("");
  const [data, setdata] = useState({})

  const toggleEdit = (id,catagoryName) => {
    setdata({
      id: id,
      catagoryName:catagoryName
    });
    setModleEdit(!ModleEdit);
  };
  const toggleDelete = (id) => {
    setdata({
      id: id,
    });
    setModleDelete(!ModleDelete);
  };

  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";
    const Filtered = () => {
      // 2022-04-06
      if (catagoryID !== "-1" || dateto !== "") {
        return catagoryList.filter(
          // eslint-disable-next-line array-callback-return
          ({ _id, createdAt }) => {
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
            if (catagoryID !== "-1") {
              console.log("if");
              return _id === catagoryID;
            } else if (catagoryID !== "-1" && datetoInput.length !== 0) {
              return _id === catagoryID && dateCreated === datetoInput;
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
        return catagoryList.map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [catagoryID, catagoryList, dateto, datefrom]);

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
            Catagory: item.catagoryName,
            Date: date,
          };
        });
        JSONTOCSV(dataset, "CatagoriesIMS.csv");
        // csvDownload(dataset)
        break;
      default:
        break;
    }
  }, [Report, filterData]);

  if (catagoryList.length === 0) {
    return (
      <tr>
        <td>
          <h1>No found</h1>
        </td>
      </tr>
    );
  } else {
    const renderList = filterData.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i}</td>{" "}
          <td>
            {" "}
            <Link
              to={{
                pathname: `/catagory/${item._id}`,
              }}
              params={{ id: item._id, catagory: item.catagoryName }}
            >
              {item.catagoryName}{" "}
            </Link>{" "}
          </td>
          <td>
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
            }).format(new Date(Date.parse(item.createdAt)))}
          </td>
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                toggleEdit(item._id,item.catagoryName)
              }}
            >
              Eidt
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                toggleDelete(item._id)
              }}
            >
              Delete
            </div>
          </div>
        </tr>
      );
    });
    return (
      <>
    {Report === '3'&& <MailComponent /> }
        <Modal
          centered
          fullscreen="sm"
          size="md"
          isOpen={ModleDelete}
          toggle={() => toggleDelete()}
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            <DeleteCatagory data={data} >
            <Button onClick={() => toggleDelete()}>Cancel</Button>
            </DeleteCatagory>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>

        <Modal
          centered
          fullscreen="md"
          size="lg"
          isOpen={ModleEdit}
          toggle={() => toggleEdit()}
        >
          <ModalHeader>Update the Record</ModalHeader>
          <ModalBody>
            <UpdateCatagory data={data}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => toggleEdit()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="row d-flex justify-content-end">
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
          <div className="  col-md-2">
          <Link to={'/addcatagory'}><p className="tool">Add Catagory</p></Link>
          </div>
        </div>
        <div
          className={`row d-flex align-items-center py-2 ${
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
          <div className="col-md-1 text-end">To</div>
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
          <div className="col-md-1 text-end">From</div>
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
        <div
          className={`row d-flex align-items-center py-2 ${
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
        <div className=" p justify-content-md-center justify-content-sm-start">
          <table className="table table-hover rounded ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Catagory</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderList}</tbody>
          </table>
        </div>
      </>
    );
  }
};
function Catagories() {
  return (
    <div className="container">
      <RenderShow />
    </div>
  );
}

export default Catagories;
