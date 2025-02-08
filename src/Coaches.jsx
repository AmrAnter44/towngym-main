import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ProjectContext } from './Context/ProjectContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Coaches (){
  let { IsLogin, setIsLogin ,DeletingCoaches,coaches,userToken, 
    getCoaches, DelIdCoaches } = useContext(ProjectContext);

    
    var settings = {
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed: 3000,
      };

  useEffect(()=>{
    getCoaches()
  },[])



return <>
<div className='w-50%'>
 <h2 className='text-xl font-semibold pb-1 pt-6'> Coaches :</h2>
 <div className="lg:px-14 ">
    {/* !!flexhere */}
<Slider className='pb-5 gap-2' {...settings}>


{/* <div key={coache.id} className="w-full bg-blue-800 bg-opacity-70 text-white justify-between flex flex-row pt-2 gap-2 border">
    <div className='w-full flex flex-row '>
    <div className="w-full top-5 justify-center"> <img className="w-40" src={coache.img} alt="Coach Img" /> </div>
    <div className="lg:p-6 lg:m-6 font-bold  text-2xl justify-center flex flex-col gap-4 text-center">
        <h2 className='font-semibold text-pretty'> {coache.name} </h2>
        <h3> {coaches.title}</h3>

    </div>
    </div>
</div> */}





{/* new  */}
    {coaches?.length > 0   ? 
 coaches?.map((coache)=>     <div key={coache.id} className="w-full bg-blue-800 bg-opacity-70 text-white justify-between flex flex-row pt-2 gap-2 border">
    <div className='w-full flex flex-row '>
    <div className="w-full top-5 justify-center"> <img className="w-40" src={coache.img} alt="Coach Img" /> </div>
    <div className="lg:p-6 lg:m-6 font-bold  text-2xl justify-center flex flex-col gap-4 text-center">
        <h2 className='font-semibold text-pretty'> {coache.name} </h2>
        <h3> {coaches.title}</h3>
        {userToken !== sessionStorage.getItem('token') ? <button className='text-xl btn m-5 text-blue-700' onClick={()=>deleteprod(coache.id)}>{Deleting && DelIdCoaches==coache.id ? <span><i class="fa-solid fa-check text-blue-700"></i> <span className='text-blue-700'>Done</span> </span> : <span className='text-blue-600'>Delete</span> }</button>
: null}

    </div>
    </div>
</div>
     )  : <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i> }



</Slider>
</div>
</div>



 </>
}