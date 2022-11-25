import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { showItem, fetchItem } from "../../../../features/itemSlice";
import { JSONTOCSV } from "../../../ReportsCSV/ReportCSV";
import ReportPdf from "./ReportPDF";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import UpdateItem from "./UpdateItem";
import DeleteItem from "./DeleteItem";
import MailComponent from "../../../MailComponent";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const RenderShow = (catid) => {
  const [ModleEdit, setModleEdit] = useState(false);
  const [ModleDelete, setModleDelete] = useState(false);
  const { itemList } = useSelector(showItem);
  const [filterData, setfilterData] = useState([]);
  const [catagoryID, setcatagoryID] = useState("-1");
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [Report, setReport] = useState("");
  const [data, setdata] = useState({});
  const toggleEdit = (id, itemName) => {
    setdata({
      id: id,
      itemName: itemName,
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
    const filter = itemList
      .filter((items) => items.catId._id === catid.catid)
      .map((item) => item);

    setfilterData(filter);
  }, [catid.catid, filter, itemList]);
  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";
    const Filtered = () => {
      // 2022-04-06
      if (catagoryID !== "-1" || dateto !== "") {
        return itemList.filter(
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
              return _id === catagoryID;
            } else if (catagoryID !== "-1" && datetoInput.length !== 0) {
              return _id === catagoryID && dateCreated === datetoInput;
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
        return itemList
          .filter((items) => items.catId._id === catid.catid)
          .map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [catagoryID, itemList, dateto, datefrom, catid.catid]);

  useEffect(() => {
    switch (Report) {
      case "1":
        ReportPdf(filterData);
        break;
      case "2":
        const dataset = filterData.map((item, i) => {
          const date = new Intl.DateTimeFormat("en-US", {
           dateStyle: "short",
          }).format(new Date(Date.parse(item.createdAt)));
          return {
            id: i,
            Item: item.itemName,
            Catagory: item.catId.catagoryName,
            Date: date,
          };
        });
        JSONTOCSV(dataset, "ITemIMS.csv");
        // csvDownload(dataset)
        break;
      default:
        break;
    }
  }, [Report, filterData]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);

  if (itemList.length === 0) {
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
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, i) => (
                  <TableRow key={items._id}>
                    <TableCell align="center">{i}</TableCell>
                    <TableCell align="center">{items.itemName}</TableCell>
                    <TableCell align="center">
                      {new Intl.DateTimeFormat("en-US", {
                       dateStyle: "short",
                      }).format(new Date(Date.parse(items.createdAt)))}
                    </TableCell>
                    <TableCell align="center">
                      <div className="cellAction">
                        <div
                          className="viewButton"
                          onClick={() => {
                            toggleEdit(items._id, items.catagoryName);
                          }}
                        >
                          Eidt
                        </div>
                        <div
                          className="deleteButton"
                          onClick={() => {
                            toggleDelete(items._id);
                          }}
                        >
                          Delete
                        </div>
                      </div>
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
    const renderList = filterData.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i}</td>
          <td>{item.itemName}</td>
          <td>
            {new Intl.DateTimeFormat("en-US", {
             dateStyle: "short",
            }).format(new Date(Date.parse(item.createdAt)))}
          </td>
          <td>
            <div className="cellAction">
              <div
                className="viewButton"
                onClick={() => {
                  toggleEdit(item._id, item.itemName);
                  // alert(item._id);
                }}
              >
                Eidt
              </div>
              <div
                className="deleteButton"
                onClick={() => {
                  toggleDelete(item._id);
                  // alert(item._id);
                }}
              >
                Delete
              </div>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <>
        {Report === "3" && <MailComponent />}
        <Modal
          centered
          fullscreen="sm"
          size="md"
          isOpen={ModleDelete}
          toggle={() => toggleDelete()}
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            <DeleteItem data={data}>
              <Button onClick={() => toggleDelete()}>Cancel</Button>
            </DeleteItem>
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
            <UpdateItem data={data} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => toggleEdit()}>Cancel</Button>
          </ModalFooter>
        </Modal>

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
            <Link to={"/addcatagory/:id"}>
              <p className="tool">Add item</p>
            </Link>
          </div>
        </div>
        <div
          className={`row d-flex align-items-center py-2 ${
            filter ? "d-block" : "d-none"
          } `}
        >
          <div className="col-lg-3 m-0 py-2">
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
                    <option value="-1">Select Item</option>
                    {itemList.map((data, i) => (
                      <option key={i} value={data._id}>
                        {data.itemName}
                      </option>
                    ))}
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
          <div className="col-lg-1 text-center">to</div>
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
        <div
          className={`row d-flex align-items-center py-2 ${
            exportas ? "d-block" : "d-none"
          } `}
        >
          <div className="col-lg-12 col-sm-12">
          <Button className="mx-2" onClick={() =>setReport('1')}>PDF</Button>
          <Button className="mx-2" onClick={() =>setReport('2')}>CSV</Button>
          <Button className="mx-2" onClick={() =>setReport('3')}>EMAIL</Button>
          </div>
        </div>
        <div className="p justify-content-lg-center justify-content-sm-start ">
          <RenderTable/>
          {/* <table className="table table-hover rounded ">
            <thead>
              <tr>
                <th>ID</th>
                <th>item</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderList}</tbody>
          </table> */}
        </div>
      </>
    );
  }
};
function Items() {
  const { id } = useParams();
  return (
    <div className="container">
      <RenderShow catid={id} />
    </div>
  );
}

export default Items;
