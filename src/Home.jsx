import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { ProjectContext } from './Context/ProjectContext';
import Coaches from './Coaches';
import Classes from './Classes';
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'
import { motion } from "motion/react"
import Img from './Img';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Home () {
  let {  deleteprod ,
    offers,
         userToken,
         Deleting, setDeleting, getdata , Delid, setDelid} = useContext(ProjectContext)

  // created_at
  // : 
  // "2024-09-07T22:09:48.000Z"
  // duration
  // : 
  // "3 month"
  // id
  // : 
  // 1
  // inbody
  // : 
  // "6"
  // invite
  // : 
  // "6"
  // price
  // : 
  // "2000.00"
  // priceNew
  // : 
  // "1800.00"
  // private
  // : 
  // "6"
  // updated_at
  // : 
  // "2024-09-07T22:09:48.000Z

  useEffect(()=>{
    getdata()
  },[])



  return <>
    {/* <Link className='text-black' to="/manage">manage</Link> */}
  <div className=''>
    <div className='flex justify-center'>



  <div className='sm:max-w-40 lg:justify-center lg:flex'>
<motion.img animate={{ rotate: 360 }} className='justify-center m-auto object-cover' src={logo} alt="logo" />
</div>

</div>

<div className='flex justify-center p-4'>
<div className='w-96 lg:hidden'><Img></Img></div>
</div>


<h2  className='text-xl p-4 text-white font-semibold gymfont'>Special Offers For You :</h2>
    <div className='pt-4 md:flex md:flex-wrap flex-row-reverse gap-4 justify-center' >
     
    {offers?.length > 0   ? 
 
 offers?.map((offer)=>    <div key={offer.id} className=' md:w-80  offer mt-7 p-2 rounded-lg flex flex-col bg-white shadow-md border-b-8 border-blue-600 opacity-90'>
<h3 className='p-2 font-bold text-blue-700 text-2xl gymfont'><i className="fa-solid fa-dumbbell pr-2"></i>  {offer.duration}</h3>
<div className='flex justify-between'>

<h3 className='p-2 font-bold text-blue-700 text-lg line-through'><i className="fa-solid fa-tag pr-1"></i>{ (offer.price).split('.00')} EGP</h3>
<h3 className='p-2 font-bold text-blue-700 text-lg '>{(offer.priceNew).split('.00')} EGP</h3>

</div>

     <ul className='p-2 text-start text-blue-700'>
      <li className='p-1  font-semibold'> <i className='pr-1 fa-solid fa-check'></i>  {(offer.private)} Sessions Personal Training </li>
      <li className='p-1 font-semibold'> <i className='pr-1 fa-solid fa-check'></i>  {(offer.inbody)} Sessions In Inbody </li>
      <li className='p-1 font-semibold'> <i className='pr-1 fa-solid fa-check'></i>  {(offer.invite)} Sessions Invitations </li>
      <li className='p-1 font-semibold'> <i className='pr-1 fa-solid fa-check'></i>  ALL Classes</li>
      <li className='p-1 font-semibold'> <i className='pr-1 fa-solid fa-check'></i>  SPA</li>


     </ul>
     
     {userToken !== sessionStorage.getItem('token') ? <button className='text-xl btn m-5 text-blue-700' onClick={()=>deleteprod(offer.id)}>{Deleting && Delid==offer.id ? <span><i class="fa-solid fa-check text-blue-700"></i> <span className='text-blue-700 gymfont '>Done</span> </span> : <span className='text-blue-600  gymfont '>Delete</span> }</button>
: null}
   </div>
  
  )  : <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i> }
  


   </div>



   <div className=' gap-3 '>

    <div>
    <Coaches></Coaches>
    </div>

    <div>
    <Classes></Classes>
    </div>

   </div>



   <div className=' flex  mt-9 bottom-0 mb-0 justify-between  p-2 lg:justify-center  lg:p-4'>
<h3 className='text-start font-semibold pt-3 '>Our Pages <i className="fa-solid fa-arrow-right"></i></h3>
<div>
<a className='text-white p-2 lg:p-4' href="https://www.instagram.com/x_ggym?igsh=MWEwdjV0eXk0MnBseQ=="><i className=" p-1 fa-brands fa-instagram text-2xl text-blue-500 mt-1"></i> </a>
</div>
<div>
<a className='text-white p-2 lg:p-4 ' href="https://wa.link/zyhpxd"><i className=" p-1 fa-brands fa-whatsapp text-2xl text-blue-500 mt-1"></i>  </a>
</div>
<div>
<a className='text-white p-2 lg:p-4' href="https://www.facebook.com/TOWN411"><i className=" p-1 fa-brands fa-facebook text-2xl text-blue-500 mt-1"></i>  </a>
</div>
<div>
<a className='text-white p-2 lg:p-4' href="https://maps.app.goo.gl/goVtwSXvxrkmpzzPA"><i className=" fa-solid fa-location-dot text-2xl text-blue-500 mt-1 p-1"></i>  </a>
</div>


</div>
   </div>
   </>
}
