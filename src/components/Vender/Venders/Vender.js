import React, { useEffect, useState } from 'react'
import "../../Products/Product/Product.css";
import { useSelector } from "react-redux";
import { showVender } from '../../../features/venderSlice';
import { showCatagory } from '../../../features/catagorySlice';
import { showItem } from '../../../features/itemSlice';
import { JSONTOCSV } from "../../ReportsCSV/ReportCSV";
import ReportPdf from "./ReportPdf";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import DeleteVender from './DeleteVender';
import UpdateVender from './UpdateVender';
import MailComponent from '../../MailComponent';
import {Link} from 'react-router-dom'
function Vender() {
  
    const {venderList}=useSelector(showVender)
    const [filterData, setfilterData] = useState(venderList);
    const [filter, setfilter] = useState(false);
    const [exportas, setexportas] = useState(false);
    const { catagoryList } = useSelector(showCatagory);
    const { itemList } = useSelector(showItem);
    const [catagoryID, setcatagoryID] = useState("-1");
    const [itemId, setitemId] = useState("-1");
    const [dateto, setdateto] = useState("");
    const [datefrom, setdatefrom] = useState("");
    const [Report, setReport] = useState("");

    const [Modle, setModle] = useState(false);
    const [ModleEdit, setModleEdit] = useState(false);
    const [data, setdata] = useState({})
    const toggle = (id,catagory,item,venderName,venderEmail,venderPhone,venderAddress,venderCnic,venderCity,venderImg) => {
      setdata({
          id: id,
        catagory: catagory,
        item: item,
        venderName:venderName,
        venderEmail:venderEmail,
        venderNumber:venderPhone,
        venderAddress:venderAddress,
        venderCnic:venderCnic,
        venderCity:venderCity,
        venderImg:venderImg,
      });
      setModle(!Modle);
    };
    
      const toggleEdit = (id,catagory,item,venderName,venderEmail,venderPhone,venderAddress,venderCnic,venderCity,venderImg) => {
        setdata({
          id: id,
          catagory: catagory,
          item: item,
          venderName:venderName,
          venderEmail:venderEmail,
          venderNumber:venderPhone,
          venderAddress:venderAddress,
          venderCnic:venderCnic,
          venderCity:venderCity,
          venderImg:venderImg,
        });
        setModleEdit(!ModleEdit);
      };


    useEffect(() => {
      var datefromInput = "";
      var datetoInput = "";
      const Filtered = () => {
        // 2022-04-06
        if (catagoryID !== "-1" || dateto !== "") {
          return venderList.filter(
            // eslint-disable-next-line array-callback-return
            ({ catagory, item, createdAt }) => {
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
          return venderList.map((item) => item);
        }
      };
      setfilterData(Filtered);
    }, [catagoryID, itemId, venderList, dateto, datefrom]);
  
    useEffect(() => {
      switch (Report) {
        case "1":
          ReportPdf(filterData)
          break;
        case "2":
            const dataset = filterData.map((item, i) => {
            const date = new Intl.DateTimeFormat("en-US", {
              dateStyle: "short",
            }).format(new Date(Date.parse(item.createdAt)));
          return {
              id: i,
              Name:item.venderName,
              Email:item.venderEmail,
              Phone:item.venderNumber,
              Address:item.venderAddress,
              City:item.venderCity,
              Catagory: item.catagory.catagoryName,
              Items: item.item.itemName,
              Date: date,
            }
          })
          JSONTOCSV(dataset, "IMSCIU.csv");
          // csvDownload(dataset)
          break;
        default:
          break;
      }
    }, [Report, filterData]);
  

const RenderShow = () => {
    if (venderList.length === 0) {
      return (
        <tr>
          <td>
            <h1>No found</h1>
          </td>
        </tr>
      );
    } else {
      console.log(venderList)
      const renderList = filterData.map(
        ({ _id,venderName,venderEmail,venderNumber,venderAddress,venderCity,catagory,item, createdAt }, i) => {
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{venderName}</td>
              <td>{venderEmail}</td>
              <td>{venderNumber}</td>
              <td>{venderAddress}</td>
              <td>{venderCity}</td>
              <td>{catagory.catagoryName}</td>
              <td>{item.itemName}</td>
              <td>
                {new Intl.DateTimeFormat("en-US", {
                 dateStyle: "short",
                }).format(new Date(Date.parse(createdAt)))}
              </td>
              <td>

              <div className="cellAction">
                <div className="viewButton" onClick={()=>{toggleEdit(_id,catagory._id,item._id,venderName,venderEmail,venderNumber,venderAddress,venderCity)}}>Eidt</div>
                <div className="deleteButton" onClick={()=>{toggle(_id,catagory._id,item._id,venderName,venderEmail,venderNumber,venderAddress,venderCity)}}>Delete</div>
              </div>
              </td>
            </tr>
          );
        }
      );
      return <>
        {Report === '3'&& <MailComponent /> }
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
          <Link to={'/addvender'}><p className="tool">Add Vender</p></Link>
          </div>
        </div>
{/* Filters */}
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



        <Modal
          centered
          fullscreen="sm"
          size="md"
          isOpen={Modle}
          toggle={() => toggle()}
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            <DeleteVender data={data} >
            <Button onClick={() => toggle()}>Cancel</Button>
            </DeleteVender>
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
            <UpdateVender data={data} >
            <Button onClick={() => toggleEdit()}>Cancel</Button>
            </UpdateVender>
          </ModalBody>
          <ModalFooter>
        
          </ModalFooter>
        </Modal>
        <div className="p  justify-content-lg-center justify-content-sm-start">
          <table className="table table-hover rounded ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone no</th>
                <th>Address</th>
                <th>City</th>
                <th>Catagory</th>
                <th>Item</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {renderList}
            </tbody>
          </table>
        </div>
      </>
      
    }
  };

  return (
    
    <div className="container">
    <div className="row w-100 ">
      <RenderShow />
    </div>

</div>
  )
}

export default Vender