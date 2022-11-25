import React from 'react'
import "./isloading.css";
function IsLoading() {
  return (
    <div className='container '>
      <div className='row '>
        <div className='col-lg-12 d-flex justify-content-center align-items-center Size'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
   
  )
}

export default IsLoading