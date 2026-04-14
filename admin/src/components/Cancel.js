import React from 'react'
import "./p2.css"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
<div>
    <div>
        <img  style={{width:"30%",height:"30%",marginLeft:"36%", marginTop:"2%"}} src="\images\10783810_19197383.jpg" alt="" srcset="" />
        <p style={{fontSize:"25px",textAlign:"center",color:"red", fontStyle:"initial", marginLeft:"10px"}}>PAYMENT DECLINED OR </p>
        <p style={{fontSize:"25px",textAlign:"center",marginTop:"5px",color:"red", fontStyle:"initial", marginLeft:"10px"}}> SOMETHING WENT WRONG!!</p>
       <Link to ="/cart"> <Button varient = "danger"  style={{marginLeft:"668px",marginTop:"5px",height:"40px", width:"180px", fontSize:"10px"}} class="btn">
  <span>BACK TO CHECKOUT</span>
</Button></Link>
</div>     
</div> 
  )
}

export default Cancel