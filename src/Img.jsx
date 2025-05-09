import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Img() {
  var settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Slider className='pb-5' {...settings}>
        <div>
          <img className='w-full h-auto rounded-lg shadow-md' src="/assets/img/img1.jpg" alt="" />
        </div>
        <div>
          <img className='w-full h-auto rounded-lg shadow-md' src="/assets/img/img2.jpg" alt="" />
        </div>
        <div>
          <img className='w-full h-auto rounded-lg shadow-md' src="/assets/img/img3.jpg" alt="" />
        </div>
      </Slider>
    </>
  )
}
