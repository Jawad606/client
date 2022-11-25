import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { showStore } from "../../features/storeSlice";
import { useSelector } from "react-redux";
import { showAssignStore } from "../../features/AssignStoreSlice";
import { showCatagory } from "../../features/catagorySlice";
import { showItem } from "../../features/itemSlice";
ChartJS.register(ArcElement, Tooltip, Legend);
function Chart() {
  const { storeList } = useSelector(showStore);
  const { AssignListStore } = useSelector(showAssignStore);
  const { catagoryList } = useSelector(showCatagory);
  const { itemList } = useSelector(showItem);
  const [catagory, setcatagory] = useState('-1');
  const [itemId, setitem] = useState('-1');
  const [quantityStore, setquantityStore] = useState([]);
  const [quantityAssign, setquantityAssign] = useState([]);

 

  useEffect(()=>{
    if(catagory !=='-1' && itemId !=='-1'){
        const filterStore=()=> storeList.filter(({item})=>item._id===itemId)
        
        const fitlerAssignStore=()=> AssignListStore.filter(({item})=>item._id===itemId)
        setquantityAssign(fitlerAssignStore)
       setquantityStore(filterStore)
    }

   
  },[AssignListStore, catagory, itemId, storeList])

  const data = {  
    labels: ["Store", "Assign"],
    datasets: [
      {
        label: "# of Votes",
        data: [quantityStore.map(({quantity})=>quantity), quantityAssign.map(({quantity})=>quantity)],
        backgroundColor: ["rgba(54, 162, 235, 0.2)","rgba(255, 99, 132, 0.2)" ],
        borderColor: ["rgba(54, 162, 235, 1)","rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Chart">
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-6 m-0 py-2">
            <div className="wrap-input1 m-0">
              <div className="selectdiv">
                <label>
                  <select
                    value={catagory}
                    onChange={(e) => setcatagory(e.target.value)}
                    className="input1"
                    name="Catagory"
                    id=""
                  >
                    <option value="-1">Catagory</option>
                    {catagoryList.map((data, i) => (
                      <option key={i} value={data._id} >
                        {data.catagoryName}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <span className="shadow-input1"></span>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="wrap-input1 m-0">
              <div className="selectdiv">
                <label>
                  <select
                    className="input1"
                    name="item"
                    value={itemId}
                    onChange={(e) => setitem(e.target.value)}
                  >
                    <option value="-1">Item</option>
                    {itemList
                      .filter((sHowItem) => sHowItem.catId._id === catagory)
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
        </div>
      </div>

      <Pie data={data} />
    </div>
  );
}

export default Chart;
