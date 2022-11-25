import React from "react";
import { useSelector } from "react-redux";
import {  showCatagory } from "../features/catagorySlice";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import "../style/HomeStyle.css";
import { showItem } from "../features/itemSlice";
import { showAssign } from "../features/assignSlice";
import { showAssignStore } from "../features/AssignStoreSlice";
import IsLoading from "./LoadingPage/isLoading";
function RenderCatagory() {
  const {catagoryList,isLoading} = useSelector(showCatagory);
   var Total;
  catagoryList.map((data, i) => {
   return Total=i+1;
  });
  return <>
  {
    !isLoading?(<>{Total}</>):(<><IsLoading /></>)
  }
  </>;
}
function RenderItem() {
  const {itemList,isLoading} = useSelector(showItem);

  var Total;
  itemList.map((data, i) => {
   return Total=i+1;
  });
  return <>
  {
    !isLoading?(<>{Total}</>):(<><IsLoading /></>)
  }
  </>;
}
function RenderAssignChair() {
  const countCata = useSelector(showAssignStore);
  let total=0
const data=  countCata.map((data, i) => {
    return  ( 
        <div className="col-lg-4 p-4" key={i}>
    <Card>
      <CardHeader tag="h3">{data.item.itemName}</CardHeader>
      <CardBody>
        <CardTitle tag="h3">
          { total+=data.quantity}
        </CardTitle>
      </CardBody>
    </Card>
      </div>)
  });
  return <>{data}</>;
}
function HomeComponent() {
  return (
    <div>
      <div className="container">
        <div className="row  d-flex justify-content-center ">
          <div className="col-lg-4 p-4">
            <Card>
              <CardHeader tag="h3">Catagoies</CardHeader>
              <CardBody>
                <CardTitle tag="h3">
                  <RenderCatagory />
                </CardTitle>
              </CardBody>
            </Card>
          </div>
          <div className="col-lg-4 p-4">
            <Card>
              <CardHeader tag="h3">Products</CardHeader>
              <CardBody>
                <CardTitle tag="h3">
                 < RenderItem/>
                </CardTitle>
              </CardBody>
            </Card>
          </div>
       <RenderAssignChair/>
        </div>
      </div>
      </div>
  );
}

export default HomeComponent;
