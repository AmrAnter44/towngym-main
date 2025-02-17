import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ProjectContext } from './Context/ProjectContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Coaches (){
  let { IsLogin, setIsLogin ,DeletingCoaches,coaches,userToken, 
    getCoaches, DelIdCoaches,deleteCoaches } = useContext(ProjectContext);

    
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
 <h2 className='text-xl font-semibold pb-1 p-4 mb-4 gymfont '> Coaches :</h2>
 <div className="lg:px-14 ">
    {/* !!flexhere */}
<Slider className='pb-5' {...settings}>






{/* new  */}
    {coaches?.length > 0   ? 
 coaches?.map((coache)=>     <div key={coache.id} className="w-80 bg-black rounded-lg bg-opacity-70 text-blue-700 justify-between flex flex-col-reverse md:flex-row pt-2 gap-2 border">
    <div className='w-full flex flex-col-reverse md:flex-row bg-black '>
    <div className="w-full justify-center bottom-0"> <img className=" top-0 md:w-40  pt-2 pr-2 pl-2" src={coache.img} alt="Coach Img" /> </div>
    <div className="lg:p-6  lg:m-6 font-bold p-3 text-2xl justify-center m-1 flex flex-col gap-4 text-center">
        <h2 className='font-semibold text-pretty gymfont'> {coache.name} </h2>
        {/* <h3> {coache.title}</h3> */}

    </div>
    

    </div>
    {userToken !== sessionStorage.getItem('token') ? <button className='text-xl btn m-5 text-blue-700' onClick={()=>deleteCoaches(coache.id)}>{DeletingCoaches && DelIdCoaches==coache.id ? <span><i class="fa-solid fa-check text-blue-700"></i> <span className='text-blue-700 gymfont '>Done</span> </span> : <span className='text-blue-600 gymfont '>Delete</span> }</button>
    : null}
    
</div>

     )  : <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i> }



</Slider>
</div>
</div>



 </>
}
