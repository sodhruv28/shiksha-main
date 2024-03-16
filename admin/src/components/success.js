import React from 'react'
import "./p1.css"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const success = () => {
  return (
<div>
    <div>
    <div className="content" style={{marginTop:"10px", marginLeft:"3%"}}>
        <svg width="400" height="400">
          <circle
            fill="none"
            stroke="#68E534"
            stroke-width="20"
            cx="100"
            cy="100"
            r="150"
            strokeLinecap="round"
            transform="rotate(-180 150 150)"
            className="circle"
          />
          <polyline
            fill="none"
            stroke="#68E534"
            points="88,214 173,284 304,138"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tick"
          />
        </svg>
      </div>

        {/* <img  style={{width:"200px",height:"200px",marginTop:"100px",marginLeft:"610px"}}src="\images\p1.png" alt="" srcset="" /> */}
    </div>
    <div>
      <div style={{marginTop:"4px"}}>
        <p style={{fontSize:"40px",color:"#2ECC71 ",textAlign:"center",marginTop:"370px", marginLeft:"22px"}}>THANK YOU!!</p>
        <p style={{fontSize:"30px",marginLeft:"525px"}}>PAYMENT DONE SUCCESSFULLY</p>
        {/* <p style={{fontSize:"20px",marginLeft:"550px"}}> you will be redirect to the home page shortly </p> */}
        <p style={{fontSize:"20px",marginLeft:"615px", fontStyle:"initial"}}> Click Here To Return To Home Page</p>
<Link to ="/">
        <Button style={{marginLeft:"45%", height:"40px", width:"180px", fontSize:"15px"}} variant="success">Back To Home</Button>{' '}
        </Link>
        {/* <Link to ="/">
        <button1 style={{marginLeft:"43.5%"}}>
  <span class="transition"></span>
  <span class="gradient"></span>
  <span class="label">Home Page</span>
</button1>
</Link> */}


    </div>
    </div>
    </div>
  )
}

export default success
