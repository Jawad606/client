import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { addCatagory, addCatagoryMulti, showCatagory } from "../../features/catagorySlice";
import { showItem } from "../../features/itemSlice";
function ReadCsv({from}) {
  const [data, setdata] = useState([]);
  const [header, setheader] = useState([]);
const dispatch=useDispatch()
  const [Modle, setModle] = useState(true);
  const { catagoryList } = useSelector(showCatagory);
  const {itemList}=useSelector(showItem)
  var UpdateData=[{}]
  const toggle = () => {
    setModle(!Modle);
  };

  const AddData=()=>{
      if(from ==='catagory'){
        dispatch(addCatagoryMulti(UpdateData))
      }
      else if(from === 'item'){}
  }

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
          setheader(results.meta.fields);
          setdata(results.data);
        },
      });
    }
  };
  const user =JSON.parse(localStorage.getItem('Data'))
  if( from ==='catagory'){
      data.user = user._id
      UpdateData = data.map((obj) => Object.assign(obj,{user:user._id}));
      console.log(UpdateData)
  }
  else if(from === 'item'){
     UpdateData = data.map((obj) => {
        // clone the current object
        const newObj = Object.assign({}, obj);
        // update the new object
        catagoryList.map((item) => {
            console.log(item._id)
          if (newObj.Catagory === item.catagoryName) newObj.Catagory = item._id;
        });
        return newObj;
      });
  }


  return (
    <div>
      <Modal
        centered
        fullscreen="sm"
        size="md"
        isOpen={Modle}
        toggle={() => toggle()}
      >
        <ModalHeader>Upload Csv file</ModalHeader>
        <ModalBody>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
          />
          <table>
            <thead>
              <tr>
                {header.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UpdateData.map((item) => (
                <tr>
                  {header.map((head) => (
                    <td>{item[head]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => AddData()}>Add</Button>
          <Button onClick={() => toggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReadCsv;
