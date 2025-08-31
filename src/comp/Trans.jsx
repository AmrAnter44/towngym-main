import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Trans() {
  const settings = {
    dots: true, // small dots navigation
    infinite: true, // loop forever
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // auto play
    autoplaySpeed: 3000, // 3 seconds
    arrows: true, // show left/right arrows
  };

  // Replace with your images
  const images = [
    "/trans/1.png",
    "/trans/2.png",
    "/trans/3.png",
    "/trans/4.png",
    "/trans/5.png",
    "/trans/6.png",
    "/trans/7.png",
    "/trans/8.png",
    "/trans/9.png",
    "/trans/10.png",

  ];

  return <>
  

    <div className="w-72 mx-auto mt-10 lg:py-14 pb-4">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-70 h-auto object-cover rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
    
  </>
}