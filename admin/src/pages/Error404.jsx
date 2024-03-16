import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Error.css';

export const Error404 = () => {
  return (
   <div>
    <div>
      <img  style={{width:"500px",height:"300px",marginLeft:"500px",marginTop:"70px"}} src="\images\e1.jfif" alt="" srcset="" />
    </div>
    <div style={{fontSize:"40px",textAlign:"center",marginTop:"40px"}}>
        <div style={{color:"#E91E63"}}>Ohh....</div ><ui style={{color:"#E91E63"}}>You Requested The Page That Is No Longer There.</ui>
        <div>
          <Link to ="/">
          <Button className='bz' style={{marginLeft:"45%", marginTop:"1%"}}>
    <span>Back to home</span>
</Button>
        </Link>
      </div>
      </div>
      </div>
  )
  }

