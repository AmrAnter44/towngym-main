import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img2 from "../src/assets/img2.jpg";
import img3 from "../src/assets/img3.jpg";
import img4 from "../src/assets/img4.jpg";
import img5 from "../src/assets/img5.jpg";
import img6 from "../src/assets/img6.jpg";
import img7 from "../src/assets/img7.jpg";
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
    <img src={img2} alt="" />
</div>

<div>
    <img src={img3} alt="" />
</div>

<div>
    <img src={img4} alt="" />
</div>

<div>
    <img src={img5} alt="" />
</div>

<div>
    <img src={img6} alt="" />
</div>

<div>
    <img src={img7} alt="" />
</div>
  </Slider>
  
  </>
}
