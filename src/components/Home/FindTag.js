import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showTags } from "../../features/tagSlice";

function FindTag() {
  const { tagList } = useSelector(showTags);
  const [tagName, setTagname] = useState("");
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const filtered = tagList
      .filter((item) => item.tag === tagName)
      .map((item) => item);
    setFilter(filtered);
  }, [tagList, tagName]);

  return (
    <div>
      <input
        className="input1 my-2"
        value={tagName}
        onChange={(e) => setTagname(e.target.value)}
      />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 text-center">
            <h1>Store</h1>
            {filter.length === 0 ? (
              <h2>Not Found</h2>
            ) : (
              filter.map((item) => {
                return (
                  <>
                    <h3>Product Id :Found </h3>
                    <h3>Catagory   :<span>{item.catagory.catagoryName}</span>  </h3>
                    <h3>Product    : <span></span> {item.item.itemName} </h3>
                    <h3>Quantity   : <span></span> {item.uniStore.quantity}</h3>
                    <h3>
                      Date         :{" "}
                      <span></span> 
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                      }).format(new Date(Date.parse(item.createdAt)))}
                    </h3>
                  </>
                );
              })
            )}
          </div>
          <div className="col-md-5 ms-2 text-center oneBorder">
            <h1>Assign</h1>
            {filter.length === 0 ? (
              <h2>Not Found</h2>
            ) : (
              filter.map((item) => { return item.statusOfassign?(
                  <>
                    <h3>Assign Id :Found </h3>
                    <h3>Catagory   :<span>{item.catagory.catagoryName}</span>  </h3>
                    <h3>Product    : <span></span> {item.item.itemName} </h3>
                    <h3>Quantity   : <span></span> {item.assign.quantity}</h3>
                    <h3>
                      Date         :{" "}
                      <span></span> 
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                      }).format(new Date(Date.parse(item.createdAt)))}
                    </h3>
                  </>
                ):( <h1>Not yet Assign</h1>)
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindTag;
