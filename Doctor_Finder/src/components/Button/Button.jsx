import React from 'react'

const Button = ({ handelTab }) => {
    
  return (
    <>
     <div className="button" onClick={() => handelTab("Form")}>Form</div>
    <div className="button" onClick={() => handelTab("Interest")}>Interest</div>
    <div className="button" onClick={() => handelTab("Setting")}>Setting</div>
    </>
   
  )
}

export default Button