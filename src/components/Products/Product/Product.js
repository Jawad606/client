import React, { useEffect, useState } from "react";
import "./Product.css";
import "../AddProduct/main.css";
import { useSelector } from "react-redux";
import { showUni } from "../../../features/universitySlice";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { showCatagory } from "../../../features/catagorySlice";
import UpdateProduct from "./UpdateProduct";
import { showItem } from "../../../features/itemSlice";
import ReportPdf from "../Reports/ReportPdf";
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
import DeleteProduct from "./deleteProduct";
import MailComponent from "../../MailComponent";
import { Link } from "react-router-dom";
import { showPayment } from "../../../features/paymentSlice";
const RenderShow = () => {
  const user = JSON.parse(localStorage.getItem("Data"));
   const User = JSON.parse(localStorage.getItem("Data"));
  const { universityList } = useSelector(showUni);
  const { paymentList } = useSelector(showPayment);
  const [filterData, setfilterData] = useState(universityList);
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [data, setdata] = useState({});
  const [id, setid] = useState({});
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const [catagoryID, setcatagoryID] = useState("-1");
  const [itemId, setitemId] = useState("-1");
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [Report, setReport] = useState("");
  const [Modle, setModle] = useState(false);
  const [ModleEdit, setModleEdit] = useState(false);
  const toggle = (id, quantity, catagory, item) => {
    setid({
      id: id,
      quantity: quantity,
      item: item,
      catagory: catagory,
    });
    setModle(!Modle);
  };

  const toggleEdit = (id, catagory, item, quantity, purchaser, vender) => {
    setdata({
      id: id,
      catagory: catagory,
      item: item,
      quantity: quantity,
      purchaser: purchaser,
      vender: vender,
    });
    setModleEdit(!ModleEdit);
  };

  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";
    const Filtered = () => {
      // 2022-04-06
      if (catagoryID !== "-1" || dateto !== "") {
        return universityList.filter(
          // eslint-disable-next-line array-callback-return
          ({ _id, catagory, item, quantity, purchaser, vender, createdAt }) => {
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
              return catagory._id === catagoryID || item._id === itemId;
            } else if (catagoryID !== "-1" && itemId !== "-1") {
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
              return dateCreated === datetoInput;
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
        return universityList.map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [catagoryID, itemId, universityList, dateto, datefrom]);
  useEffect(() => {
    switch (Report) {
      case "1":
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
            Purchaser: item.purchaser,
            Vender: item.vender.venderName,
            Date: date,
          };
        });
        JSONTOCSV(dataset, "IMSCIU.csv");
        break;
      default:
        break;
    }
  }, [Report, filterData]);

  if (universityList.length === 0) {
    return (
      <tr>
        <td>
          <h1>No found</h1>
        </td>
      </tr>
    );
  } else {
    const renderList = filterData.map(
      (
        {
          _id,
          catagory,
          item,
          quantity,
          purchaser,
          vender,
          modelno,
          createdAt,
          specification,
        },
        i
      ) => {
        return (
          <tr key={i}>
            <td>{i}</td>
            <td>
              <Link
                className="Remove"
                to={{
                  pathname: `/servicetag/${_id}`,
                }}
                params={{ id: _id }}
              >
                {catagory.catagoryName}{" "}
              </Link>{" "}
            </td>
            <td>{item.itemName}</td>
            <td>{specification.model}</td>
            <td>{quantity}</td>
            {/* <td>{vender.venderName}</td> */}
            {/* {user.firstname !== "Usama" && <td>{per_unit_price}</td>}
                {user.firstname !== "Usama" && <td>{total_price}</td>} */}
            <td>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
              }).format(new Date(Date.parse(createdAt)))}
            </td>
            <td>
              <div className="cellAction" >
                <div
                  className="viewButton"
                  onClick={() => {
                    toggleEdit(
                      _id,
                      catagory._id,
                      item._id,
                      quantity,
                      purchaser,
                      vender._id
                    );
                  }}
                >
                  Edit
                </div>
                <div
                  className="deleteButton"
                  onClick={() => {
                    toggle(_id, quantity, catagory._id, item._id);
                  }}
                >
                  Delete
                </div>
              </div>
            </td>
          </tr>
        );
      }
    );
    return (
      <>
        {Report === "3" && <MailComponent />}
        <Modal
          centered
          fullscreen="sm"
          size="md"
          isOpen={Modle}
          toggle={() => toggle()}
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            <DeleteProduct data={id}>
              <Button onClick={() => toggle()}>Cancel</Button>
            </DeleteProduct>
          </ModalBody>
          <ModalFooter></ModalFooter>
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
            <UpdateProduct data={data} />
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
            <Link to={"/addproduct"}>
              <p className="tool">Add Product</p>
            </Link>
          </div>
        </div>
        {/* Filters */}
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
        {/* Exports */}
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

        <div className="p overflow d-flex flex-column justify-content-center">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Catagory</th>
                <th>Item</th>
                <th>Model No</th>
                <th>Quantity</th>
                {/* <th>Vender</th>
                {user.firstname !== "Usama" && <th>Per Unit</th>}
                {user.firstname !== "Usama" && <th>Total Price</th>} */}
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
function Product() {
  return (
    <div className="container">
      <div className="row">
        <RenderShow />
      </div>
    </div>
  );
}

export default Product;

// https://codesandbox.io/s/vj7yk35370?file=/index.js:1504-1512
