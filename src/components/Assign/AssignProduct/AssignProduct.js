import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showAssign } from "../../../features/assignSlice";
import { showCatagory } from "../../../features/catagorySlice";
import { showItem } from "../../../features/itemSlice";
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
import ReportPdf from "./ReportPdf";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import DeleteAssign from "./DeleteAssign";
import UpdateAssign from "./UpdateAssign";
import MailComponent from "../../MailComponent";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const RenderShow = () => {
  // useEffect(()=>{
  //   dispatch(fetchAssing())
  // },[dispatch])
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

  const toggle = (
    id,
    catagory,
    item,
    quantity,
    venderId,
    Department,
    ItemFor
  ) => {
    setdata({
      id: id,
      catagory: catagory,
      item: item,
      quantity: quantity,
      Department: Department,
      ItemFor: ItemFor,
    });
    setModle(!Modle);
  };

  const toggleEdit = (
    id,
    catagory,
    item,
    quantity,
    venderId,
    Department,
    ItemFor
  ) => {
    setdata({
      id: id,
      catagory: catagory,
      item: item,
      quantity: quantity,
      Department: Department,
      ItemFor: ItemFor,
    });
    setModleEdit(!ModleEdit);
  };
  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";

    const Filtered = () => {
      // 2022-04-06
      if (
        catagoryID !== "-1" ||
        dateto !== "" ||
        DepatID !== "-1" ||
        itemId !== "-1"
      ) {
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
              console.log(item._id + " " + itemId);
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

  useEffect(() => {
    switch (Report) {
      case "1":
        ReportPdf(filterData);
        setReport("-1");
        break;
      case "2":
        const dataset = filterData.map((item, i) => {
          const date = new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
          }).format(new Date(Date.parse(item.createdAt)));
          return {
            id: i,
            Department: item.Department,
            For: item.ItemFor,
            Issued: item.classRoom,
            Catagory: item.catagory.catagoryName,
            Items: item.item.itemName,
            Quantity: item.quantity,
            Date: date,
          };
        });
        JSONTOCSV(dataset, "IMSCIU.csv");
        setReport("-1");
        // csvDownload(dataset)
        break;
      default:
        break;
    }
  }, [Report, filterData]);

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
      const reversed = [...filterData].reverse();
      return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Depart</TableCell>
                <TableCell align="center">For</TableCell>
                <TableCell align="center">Issued to</TableCell>
                <TableCell align="center">Catagory</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Employee</TableCell>
                <TableCell align="center">Re-Item</TableCell>
                <TableCell align="center">Re-Quantity</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reversed
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row">{index}</TableCell>

                    <TableCell align="center">
                      <Link
                        className="Remove"
                        to={{
                          pathname: `/servicetagassing/${row._id}`,
                        }}
                        params={{ id: row._id }}
                      >
                        {row.Department}
                      </Link>{" "}
                    </TableCell>
                    <TableCell align="center">{row.ItemFor}</TableCell>
                    <TableCell align="center">{row.classRoom}</TableCell>
                    <TableCell align="center">
                      {row.catagory.catagoryName}
                    </TableCell>
                    <TableCell align="center">{row.item.itemName}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      {row.employee.employeeName}
                    </TableCell>
                    <TableCell align="center">{row.returnItem}</TableCell>
                    <TableCell align="center">{row.returnQuantity}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "short",
                      }).format(new Date(Date.parse(row.createdAt)))}
                    </TableCell>
                    <TableCell align="center">
                      <div className="cellAction">
                        <div
                          className="viewButton"
                          onClick={() => {
                            toggleEdit(
                              row._id,
                              row.catagory._id,
                              row.item._id,
                              row.quantity,
                              row.Department,
                              row.ItemFor
                            );
                          }}
                        >
                          Eidt
                        </div>
                        <div
                          className="deleteButton"
                          onClick={() => {
                            toggle(
                              row._id,
                              row.catagory._id,
                              row.item._id,
                              row.quantity,
                              row.Department,
                              row.ItemFor
                            );
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
    return (
      <>
        {Report === "3" && <MailComponent />}
        <div className="row d-flex justify-content-end w-100">
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
        </div>
        {/* Filters */}
        <div
          className={`row d-flex align-items-center py-2 ${
            filter ? "d-block" : "d-none"
          } `}
        >
         <div className="col-lg-2 ">
            <Autocomplete
              onChange={(event, value, reason) =>
                reason==='clear' ? setcatagoryID('-1') : setcatagoryID(value._id)
              }
              clearOnEscape
              className="input1"
              id="combo-box-demo"
              options={catagoryList}
              // sx={{ width: 300 }}
              getOptionLabel={(option) => option.catagoryName.toString()}
              renderInput={(params) => (
                <TextField {...params} label="Select Catagory" />
              )}
            />
          </div>
          <div className="col-lg-2 ">
            <Autocomplete
              onChange={(event, value,reason) => 
                reason==='clear' ? setitemId('-1') : setitemId(value._id)
                }
              disablePortal
              className="input1"
              id="combo-box-demo"
              options={itemList.filter(
                (sHowItem) => sHowItem.catId._id === catagoryID
              )}
              getOptionLabel={(option) => option.itemName.toString()}
              renderInput={(params) => (
                <TextField {...params} label="Select Item" />
              )}
            />
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
          <div className="col-lg-1 text-center">from</div>
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
        {/* Exports */}

        {/* Exports */}
        <div
          className={`row d-flex align-items-center py-2 ${
            exportas ? "d-block" : "d-none"
          } `}
        >
          <div className="col-lg-12 col-sm-12">
            <Button className="mx-2" onClick={() => setReport("1")}>
              PDF
            </Button>
            <Button className="mx-2" onClick={() => setReport("2")}>
              CSV
            </Button>
            <Button className="mx-2" onClick={() => setReport("3")}>
              EMAIL
            </Button>
          </div>
        </div>
        <Modal
          centered
          fullscreen="sm"
          size="md"
          isOpen={Modle}
          toggle={() => toggle()}
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            <DeleteAssign data={data}>
              <Button onClick={() => toggle()}>Cancel</Button>
            </DeleteAssign>
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
            <UpdateAssign data={data}>
              <Button onClick={() => toggleEdit()}>Cancel</Button>
            </UpdateAssign>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
        <div className="row w-100">
          <div className="p justify-content-lg-center justify-content-sm-start">
            <RenderTable />
          </div>
        </div>
      </>
    );
  }
};
function AssignProduct() {
  return (
    <div className="container px-3">
      <RenderShow />
    </div>
  );
}

export default AssignProduct;
