import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import ReportPdf from "./Report";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Button } from "reactstrap";
import { showTags } from "../../../../features/tagSlice";
import { JSONTOCSV } from "../../../ReportsCSV/ReportCSV";
function ServiceTagAssign() {
  const { tagList } = useSelector(showTags);
  const { id } = useParams();
  console.log(id)
  const [exportas, setexportas] = useState(false);
  const [Report, setReport] = useState("");
  console.log( tagList.filter((item) => item.statusOfassign===true ).map(item=>item) );
  useEffect(() => {
    switch (Report) {
      case "1":
        ReportPdf(tagList.filter((item) => item.statusOfassign===true && item.assign._id === id));
        break;
      case "2":
        const dataset = tagList
          .filter((item) =>  item.statusOfassign===true &&  item.assign._id === id)
          .map((item, i) => {
            const date = new Intl.DateTimeFormat("en-US", {
             dateStyle: "short",
            }).format(new Date(Date.parse(item.createdAt)));
            return {
              id: i,
              tag: item.tag,
              model: item.specification.model,
              Specitication: item.specification.specification,
              Assiged: item.statusOfassign,
              Date: date,
            };
          });
        JSONTOCSV(dataset, "IMSCIU.csv");
        break;
      default:
        break;
    }
  }, [Report, id, tagList]);
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
    rowsPerPage - Math.min(rowsPerPage, tagList.length - page * rowsPerPage);

    console.log(tagList)
  return (
    <div className="px-3">
      <h1 className="text-center pe-2">Assigned Tag</h1>
      <div
        className=" col-lg-1 acbtn"
        onClick={() => {
          setexportas(!exportas);
        }}
      >
        <p className="tool">Export</p>
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Catagory </TableCell>
              <TableCell align="center">Item </TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Model</TableCell>
              <TableCell align="center">Specification</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tagList
              .filter((item) =>  item.statusOfassign ===true &&  item.assign._id === id)
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
                  <TableCell align="center">{row.tag}</TableCell>
                  <TableCell align="center">{row.specification.model}</TableCell>
                  <TableCell align="center">{row.specification.specification}</TableCell>
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
          count={tagList.filter((item) =>  item.statusOfassign ===true &&  item.assign._id === id).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      
    </div>
  );
}
export default ServiceTagAssign;
