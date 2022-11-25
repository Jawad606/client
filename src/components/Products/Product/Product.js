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
  const { universityList } = useSelector(showUni);
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
          ({ _id, catagory, item, quantity, purchaser, vender, createdAt,dateToAdd }) => {
            const dateCreated = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
            }).format(new Date(Date.parse(dateToAdd)));
            console.log(dateCreated)
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
        setReport('-1')
        break;
      case "2":
        const dataset = filterData.map((item, i) => {
          const date = new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
          }).format(new Date(Date.parse(item.createdAt)));
          return {
            id: i,
            Catagory: item.catagory.catagoryName,
            Items: item.item.itemName,
            Quantity: item.quantity,
            Date: date,
          };
        });
        JSONTOCSV(dataset, "IMSCIU.csv");
        setReport('-1')
        break;
      default:
        
        break;
    }
  }, [Report, filterData]);
 console.log(universityList.filter(item=>item.dateToAdd.length>0).map(item=>new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
}).format(new Date(Date.parse(item.dateToAdd)))))
  if (universityList.length === 0) {
    return (
      <tr>
        <td>
          <h1>No found</h1>
        </td>
      </tr>
    );
  } else {
    const reversed = [...filterData].reverse();
    const RenderTable = () => {
      return (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Catagory</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Model No</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reversed
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, i) => (
                  <TableRow key={items._id}>
                    <TableCell align="center">{i}</TableCell>
                    <TableCell align="center">
                      {
                        <Link
                          to={{
                            pathname: `/servicetag/${items._id}`,
                          }}
                          params={{ id: items._id }}
                        >
                          {items.catagory.catagoryName}{" "}
                        </Link>
                      }{" "}
                    </TableCell>
                    <TableCell align="center">{items.item.itemName}</TableCell>
                    <TableCell align="center">
                      {items.specification.model}
                    </TableCell>
                    <TableCell align="center">{items.quantity}</TableCell>
                    <TableCell align="center">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "short",
                      }).format(new Date(Date.parse(items.dateToAdd)))}
                    </TableCell> 
                    <TableCell align="center">
                      <div className="cellAction">
                        <div
                          className="viewButton"
                          onClick={() => {
                            toggleEdit(
                              items._id,
                              items.catagory._id,
                              items.item._id,
                              items.quantity,
                              items.purchaser
                              // items.vender._id
                            );
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="deleteButton"
                          onClick={() => {
                            toggle(
                              items._id,
                              items.quantity,
                              items.catagory._id,
                              items.item._id
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
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      );
    };
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
          <div className="col-lg-3 ">
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
          <div className="col-lg-3 ">
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
        {/* Exports */}
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

        <div className=" p justify-content-lg-center justify-content-sm-start">
          <RenderTable />
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
