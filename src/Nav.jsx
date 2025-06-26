import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../towngym-main/public/assets/logo.png';
export default function Nav() {
  const [open, setOpen] = useState(false);

  return <>
  <div className=''>
    <nav className="bg-black text-white p-4 mb-10 flex justify-between items-center rounded-lg font-bold">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/coaches" className="hover:text-blue-500">Coaches</Link>
        <Link to="/classes" className="hover:text-blue-500">Classes</Link>
        <Link to="/map" className="hover:text-blue-500">Map</Link>

    </nav>

    <div className='absolute top-[1%] left-[2.9%]  lg:left-[1%]'>
      <img className='w-12' src={logo} alt="" />
    </div>
</div>
 </>
}
