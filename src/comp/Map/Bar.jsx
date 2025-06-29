import React from 'react'
import MapComp from '../Func/MapComp'

export default function Bar() {
  return <>
       <div>
    <a href="https://menu-kappa-sage.vercel.app/" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-3 p-3">Our Menu</a>
    </div> 
    <MapComp src="/assets/map/bar.jpg" alt="oopps:(">
  <ul className='list-disc '>




       <p>"Our gym bar offers a variety of healthy shakes, energy drinks, and snacks — freshly prepared to support your performance and recovery."
</p>
  </ul>
</MapComp>
  </>
}
