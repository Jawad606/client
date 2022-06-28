import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showTags } from "../../../features/tagSlice";
import { useParams } from "react-router-dom";
import ReportPdf from "./Report";
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
function ServiceTag() {
  const { tagList } = useSelector(showTags);
  const { id } = useParams();
  const [exportas, setexportas] = useState(false);
  const [Report, setReport] = useState("");
  console.log(
    tagList
      .filter((item) => item.uniStore._id === id)
      .map((item) => item.statusOfassign)
  );
  useEffect(() => {
    switch (Report) {
      case "1":
        ReportPdf(tagList.filter((item) => item.uniStore._id === id));
        break;
      case "2":
        const dataset = tagList
          .filter((item) => item.uniStore._id === id)
          .map((item, i) => {
            const date = new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
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

  return (
    <div>
      <h1 className="text-center pe-2">Service Tag</h1>
      <div
        className=" col-md-1"
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
        <div className="col-md-11 col-sm-12">
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

      <table className="table table-hover  p">
        <thead>
          <tr>
            <th>ID</th>
            <th>Catagory</th>
            <th>Item</th>
            <th>Tag No</th>
            <th>Model no</th>
            <th>Specification</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>
          {tagList
            .filter((item) => item.uniStore._id === id)
            .map((item, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{item.catagory.catagoryName}</td>
                <td>{item.item.itemName}</td>
                <td>{item.tag}</td>
                <td>{item.specification.model}</td>
                <td>{item.specification.specification}</td>
                <td>{item.statusOfassign}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default ServiceTag;
