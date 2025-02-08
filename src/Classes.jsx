import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ProjectContext } from './Context/ProjectContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home () {
let { IsLogin, setIsLogin ,DeletingClasses,
    classes,userToken, getClasses, DelIdclasses } = useContext(ProjectContext);

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
    getClasses()
  },[])



    return <>
<div className="w-50%">
<h2 className='text-xl font-semibold pt-4'> Classes :</h2>

<div className="lg:px-14">
        <Slider className='pb-5' {...settings}>


{/*     
!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}


{classes?.length > 0   ? 
 classes?.map((classs)=>             <div key={classs.id} className="flex w-full flex-row gap-4 justify-center text-center ">
            <div className="text-blue-800 bg-white p-4 m-2">
                <h3 className="p-2 font-bold text-blue-700 text-lg "> {classs.class}  </h3>
                <h4 className="p-2 font-bold text-blue-700 text-lg">day: {classs.day}</h4>
                <p className="p-2 font-bold text-blue-700 text-lg "> <i class="fa-regular fa-clock"></i> at: <span className="text-xl text-black"> {classs.time1}</span >to:<span className="text-xl text-black"> {classs.time2} </span></p>
            
        
        {userToken !== sessionStorage.getItem('token') ? <button className='text-xl btn m-5 text-blue-700' onClick={()=>deleteprod(coache.id)}>{Deleting && DelIdCoaches==coache.id ? <span><i class="fa-solid fa-check text-blue-700"></i> <span className='text-blue-700'>Done</span> </span> : <span className='text-blue-600'>Delete</span> }</button>
: null}
</div>
    </div>
    

     )  : <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i> }



    </Slider>
    </div>
    </div>
    </>
}