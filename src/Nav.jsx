import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../public/assets/logo.png';
export default function Nav() {
  const [open, setOpen] = useState(false);

  return <>
<div className='flex flex-col lg:flex-row items-center justify-between glass-nav text-white  lg:m-2 mb-5 '  >
  <div className=' lg:ml-4'>
  <img src="/assets/bigLogo.png" alt="" className='w-28 mb-3' />
</div>



    <div className="  justify-between items-center  font-bold flex-wrap text-center ">
        <Link to="/" className="hover:text-blue-500 px-2 m-1">Home</Link>
        <Link to="/coaches" className="hover:text-blue-500 px-2 m-1">Coaches</Link>
        <Link to="/classes" className="hover:text-blue-500 px-2 m-1">Classes</Link>
        <Link to="/map" className="hover:text-blue-500 px-2 m-1">Map</Link>
        {/* <br /> <Link to="/online" className="hover:text-blue-500 my-4 ">Online Coaching</Link> */}

    </div>


</div>
 </>
}
