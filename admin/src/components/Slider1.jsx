import React from 'react';
import { Link } from 'react-router-dom';


export const Slider1 = () => {
  return (
    <div>
        {/* <button onClick={() => Teacher()}>submit</button> */}
        {/* <link to="/register" >Teacher</link> */}
        <Link to="/teachform" className='instructor' state={{color:"black", textDecoration:"none"}}>
          
        
        </Link>
        <Link to="/teacher">
        
        </Link>
        <Link to="/intro">

        </Link>
        <Link to="/intro2">
        
        </Link>
        <Link to="/intro3">
      
        </Link>
        <Link to="/intro4">
        
        </Link>
    </div>
  )
}
