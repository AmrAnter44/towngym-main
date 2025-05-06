import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ProjectContext } from './Context/ProjectContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home () {
let { IsLogin, setIsLogin ,DeletingClasses,deleteClasses,
    classes,userToken, getClasses, DelIdclasses } = useContext(ProjectContext);

    var settings = {
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed: 4000,
      };


  useEffect(()=>{
    getClasses() 
  },[])
 

    return <>
<h2 className='text-xl font-semibold p-4 gymfont  gap-2'> Classes :</h2>

<div className=" w-50% flex flex-col lg:flex-row gap-2 flex-nowrap">





{/*     
!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}


{classes?.length > 0   ? 
 classes?.map((classs)=>             <div key={classs.id} className=" text-blue-800  bg-white flex flex-col  w-full border p-3 rounded-lg  justify-center text-center ">

                <h3 className="p-2 font-bold text-blue-700 text-lg gymfont gymfont "> {classs.class}  </h3>
                <h4 className="p-2 font-bold text-blue-700 text-lg">Day: {classs.day}</h4>

                <p className="p-2 font-bold text-blue-700 text-lg "> <i class="fa-regular fa-clock"></i> At: <span className="text-xl text-black px-1"> {classs.time1}</span > <span>pm</span> </p>
            
        
        {userToken !== sessionStorage.getItem('token') ? <button className='text-xl btn m-5 text-blue-700' onClick={()=>deleteClasses(classs.id)}>{DeletingClasses && DelIdclasses==classes.id ? <span><i class="fa-solid fa-check text-blue-700"></i> <span className='text-blue-700 gymfont'>Done</span> </span> : <span className='text-blue-600 gymfont '>Delete</span> }</button>
: null}

    </div>


     )  : <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i> }


    </div>
    </>
}