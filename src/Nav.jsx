import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../public/assets/logo.png';
export default function Nav() {
  const [open, setOpen] = useState(false);

  return <>
  <div className='text-center justify-center items-center'>
    <nav className="bg-black text-white p-4 mb-10  justify-between items-center rounded-lg font-bold flex-wrap text-center">
        <Link to="/" className="hover:text-blue-500 px-2 m-1">Home</Link>
        <Link to="/coaches" className="hover:text-blue-500 px-2 m-1">Coaches</Link>
        <Link to="/classes" className="hover:text-blue-500 px-2 m-1">Classes</Link>
        <Link to="/map" className="hover:text-blue-500 px-2 m-1">Map</Link>
        {/* <br /> <Link to="/online" className="hover:text-blue-500 my-4 ">Online Coaching</Link> */}

    </nav>

    <div className='absolute top-[1%] left-[2.9%]  lg:left-[17%] lg:top-[0%]'>
      <img className='w-12' src={logo} alt="" />
    </div>
</div>
 </>
}
