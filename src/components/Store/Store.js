import React, { useEffect, useState } from "react";
import "./Store.css";
import { useSelector } from "react-redux";
import { showStore } from "../../features/storeSlice";
import { showCatagory } from "../../features/catagorySlice";
import { showItem } from "../../features/itemSlice";
import { JSONTOCSV } from "../ReportsCSV/ReportCSV";
import ReportPdf from "./ReportPDF";
import MailComponent from "../MailComponent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Button } from "reactstrap";
function Store() {
  const { storeList } = useSelector(showStore);
  const [filterData, setfilterData] = useState(storeList);
  const [filter, setfilter] = useState(false);
  const [exportas, setexportas] = useState(false);
  const [catagoryID, setcatagoryID] = useState("-1");
  const [itemId, setitemId] = useState("-1");
  const [dateto, setdateto] = useState("");
  const [datefrom, setdatefrom] = useState("");
  const [Report, setReport] = useState("");
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);

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

  useEffect(() => {
    var datefromInput = "";
    var datetoInput = "";
    const Filtered = () => {
      // 2022-04-06
      if (catagoryID !== "-1" || dateto !== "") {
        return storeList.filter(
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
        return storeList.map((item) => item);
      }
    };
    setfilterData(Filtered);
  }, [catagoryID, itemId, storeList, dateto, datefrom]);

  useEffect(() => {
    switch (Report) {
      case "1":
        // ReportPdf(filterData);
        ReportPdf(filterData);
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
        JSONTOCSV(dataset, "STOREIMS.csv");
        // csvDownload(dataset)
        break;
      default:
        break;
    }
  }, [Report, filterData]);

  const RenderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Catagory Name</TableCell>
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">Quantityo</TableCell>
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
                  <TableCell align="center">
                    {row.catagory.catagoryName}
                  </TableCell>
                  <TableCell align="center">{row.item.itemName}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
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
  // const RenderStore = filterData.map((data, i) => {
  //   const { catagory, item, quantity, createdAt } = data;
  //   const { catagoryName } = catagory;
  //   const { itemName } = item;

  //   return (
  //     <tr key={i}>
  //       <td>{i}</td>
  //       <td>{catagoryName}</td>
  //       <td>{itemName}</td>
  //       <td>{quantity}</td>
  //       <td>
  //         {new Intl.DateTimeFormat("en-US", {
  //          dateStyle: "short",
  //         }).format(new Date(Date.parse(createdAt)))}
  //       </td>
  //     </tr>
  //   );
  // });
  return (
    <>
      {Report === "3" && <MailComponent />}
      <div className="container">
        <div className="row px-5 d-flex justify-content-end">
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
        <div
          className={`row px-5 d-flex align-items-center   justify-content-center py-2 ${
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
          <div className="col-lg-3 col-sm-12">
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
          <div className="col-lg-1 text-center">From</div>
          <div className="col-lg-2 p-0 px-1">
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
          <div className="col-lg-2 p-0 px-1">
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
          <div className="col-lg-12 col-sm-12">
          <Button className="mx-2" onClick={() =>setReport('1')}>PDF</Button>
          <Button className="mx-2" onClick={() =>setReport('2')}>CSV</Button>
          <Button className="mx-2" onClick={() =>setReport('3')}>EMAIL</Button>
          </div>
        </div>
        <div className="row">
          <div className=" d-flex justify-content-center">
            <div className="p s w-90">
              <RenderTable/>
              {/* <table className="table table-hover rounded">
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
              </table> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
