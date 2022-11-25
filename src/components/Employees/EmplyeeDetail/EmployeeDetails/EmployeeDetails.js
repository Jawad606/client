import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showItem, fetchItem } from "../../../../features/itemSlice";
import { JSONTOCSV } from "../../../ReportsCSV/ReportCSV";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import MailComponent from "../../../MailComponent";
import { Link } from "react-router-dom";
import { showUni } from "../../../../features/universitySlice";
import { showAssign } from "../../../../features/assignSlice";
import { showCatagory } from "../../../../features/catagorySlice";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const RenderShow = (id) => {
  const { assignList } = useSelector(showAssign);
  const [filterData, setfilterData] = useState(assignList);
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [catagoryID, setcatagoryID] = useState("-1");
  const [itemId, setitemId] = useState("-1");
  const [DepatID, setDepatID] = useState("-1");
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [Report, setReport] = useState("");
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const [Modle, setModle] = useState(false);
  const [ModleEdit, setModleEdit] = useState(false);
  const [data, setdata] = useState({});
  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";

    const Filtered = () => {
      // 2022-04-06
      if (catagoryID !== "-1" || dateto !== "" || DepatID !== "-1") {
        return assignList.filter(
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
            if (catagoryID !== "-1" && itemId === "-1") {
              console.log("if");
              return catagory._id === catagoryID;
            } else if (
              catagoryID !== "-1" &&
              itemId !== "-1" &&
              DepatID === "-1"
            ) {
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
              return dateCreated === datetoInput;
            } else if (
              dateCreated.length !== 0 &&
              datefromInput.length !== 0 &&
              datetoInput.length !== 0
            ) {
              return dateCreated >= datetoInput && dateCreated <= datefromInput;
            } else if (
              datefromInput.length === 0 &&
              datetoInput.length === 0 &&
              DepatID.length !== 0
            ) {
              return Department === DepatID;
            } else if (
              catagoryID !== "-1" &&
              itemId !== "-1" &&
              datetoInput.length !== 0 &&
              catagoryID !== "-1" &&
              DepatID !== "-1"
            ) {
              return (
                catagory._id === catagoryID &&
                item._id === itemId &&
                dateCreated === datetoInput &&
                Department === DepatID
              );
            } else if (
              catagoryID !== "-1" &&
              itemId !== "-1" &&
              datetoInput.length === 0 &&
              DepatID !== "-1"
            ) {
              console.log("asfs");
              return (
                catagory._id === catagoryID &&
                item._id === itemId &&
                Department === DepatID
              );
            }
          }
        );
      } else {
        console.log("else");
        return assignList.map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [catagoryID, itemId, DepatID, assignList, dateto, datefrom]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);

  if (assignList.length === 0) {
    return (
      <tr>
        <td>
          <h1>No found</h1>
        </td>
      </tr>
    );
  } else {
    const RenderTable = () => {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Catagory</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">For</TableCell>
                <TableCell align="center">ClassRoom</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Re-Item</TableCell>
                <TableCell align="center">Re-Quantity</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell  scope="row">
                      {index}
                    </TableCell>
                  
                    <TableCell align="center">{row.catagory.catagoryName}</TableCell>
                    <TableCell align="center">{row.item.itemName}</TableCell>
                    <TableCell align="center">{row.Department}</TableCell>
                    <TableCell align="center">{row.ItemFor}</TableCell>
                    <TableCell align="center">{row.classRoom}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.returnItem}</TableCell>
                    <TableCell align="center">{row.returnQuantity}</TableCell>
                   
                    <TableCell align="center">
                      {" "}
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "short",
                      }).format(new Date(Date.parse(row.createdAt)))}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      );
    };


    return (
      <>
        <div className="row d-flex justify-content-end">
          <div
            className=" col-lg-1 acbtn"
            onClick={() => {
              setfilter(!filter);
            }}
          >
            <p className="tool">Filter</p>
          </div>
          <div
            className=" col-lg-1 acbtn"
            onClick={() => {
              setexportas(!exportas);
            }}
          >
            <p className="tool">Export</p>
          </div>
          <div className="  col-lg-2 acbtn">
            <Link to={"/addassign"}>
              <p className="tool">Add Assign</p>
            </Link>
          </div>
        </div>
        {/* Filters */}
        <div
          className={`row d-flex align-items-center py-2 ${
            filter ? "d-block" : "d-none"
          } `}
        >
          <div className="col-lg-2 m-0 py-2">
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
                    <option value="-1">Catagory</option>
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
          <div className="col-lg-2 col-sm-12">
            <div className="wrap-input1 m-0">
              <div className="selectdiv">
                <label>
                  <select
                    className="input1"
                    name="item"
                    value={itemId}
                    onChange={(e) => setitemId(e.target.value)}
                  >
                    <option value="-1">Item</option>
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
          <div className="col-lg-2 col-sm-12">
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
                    <option value="MS">Ms Depart</option>
                    <option value="CS">Cs Depart</option>
                    <option value="ME">ME Depart</option>
                    <option value="EE">EE Depart</option>
                    <option value="CE">CE Depart</option>
                  </select>
                </label>
              </div>
              <span className="shadow-input1"></span>
            </div>
          </div>
          <div className="col-lg-1 text-center">From</div>
          <div className="col-lg-2 p-0 px-2">
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
          <div className="col-lg-1 text-center">To</div>
          <div className="col-lg-2 p-0 px-2">
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
        <div className="p  justify-content-lg-center justify-content-sm-start ">
          <RenderTable/>
          {/* <table className="table table-hover rounded ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Catagory</th>
                <th>Item</th>
                <th>Department</th>
                <th>For</th>
                <th>ClessRoom</th>
                <th>Quantity</th>
                <th>Re-Item</th>
                <th>Re-Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{renderList}</tbody>
          </table> */}
        </div>
      </>
    );
  }
};
function EmployeeDetail() {
  const { id } = useParams();
  return (
    <div className="container">
      <RenderShow id={id} />
    </div>
  );
}

export default EmployeeDetail;
