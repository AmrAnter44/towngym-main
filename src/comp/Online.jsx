import React from 'react'
import zema from '../../public/coaches/zema.jpg'
import aimlia from '../../public/coaches/aimlia.jpg'
import { Link } from 'react-router-dom'

export default function Online() {
  return <>
    <div>Online</div>

    <div className='flex flex-row items-center gap-5 pt-5'>
        <div className='bg-black rounded-lg '>
            <img  className='w-64 object-cover p-4' src={zema} alt="" />
            <ul className='p-2'>
                <li>experiense 7 years</li>
                <li>strenss training</li>
                <li>certified trainer</li>
            </ul>
                    <Link to={'/sign'}  className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full'>Book Now </Link>
        </div>

                <div className='bg-black rounded-lg '>
            <img  className='w-64 object-cover p-4' src={aimlia} alt="" />
            <ul className=' p-2'>
                <li>experiense 6 years</li>
                <li>yoga teaching</li>
                <li>certified trainer</li>
            </ul>
            <Link to={'/sign'}  className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full'>Book Now </Link>
        </div>

    </div>
  </>
}
