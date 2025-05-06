import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../src/assets/img1.jpg";
import img2 from "../src/assets/img2.jpg";
import img3 from "../src/assets/img3.jpg";
export default function Img() {

    var settings = {
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed: 3000,
      };








  return <>
  <Slider className='pb-5' {...settings}>


<div>
    <img src={img1} alt="" />
</div>
<div>
    <img src={img2} alt="" />
</div>
<div>
    <img src={img3} alt="" />
</div>


  </Slider>
  
  </>
}
