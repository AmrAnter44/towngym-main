import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import zema from "/src/assets/coaches/zema.jpg";
import amr from "/src/assets/coaches/amr.jpg";
import aimlia from "/src/assets/coaches/aimlia.jpg";
import haitham from "/src/assets/coaches/haitham.jpg";
import saif from "/src/assets/coaches/saif.jpg";
// import bogy from "../src/assets/coaches/bogy.jpg";


export default function Coaches() {
  const [coaches, setCoaches] = useState([
    { id: 1, name: "zema", img: zema },
    { id: 2, name: "amr", img: amr },
    { id: 3, name: "aimlia", img: aimlia },
    { id: 4, name: "haitham", img: haitham },
    { id: 5, name: "saif", img: saif },
    // { id: 6, name: "bogy", img: bogy },

  ]);

  const [deletingId, setDeletingId] = useState(null);

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
      <div className="w-50%">
        <h2 className="text-xl font-semibold pb-1 p-4 mb-4 gymfont"> Coaches :</h2>
        <div className="lg:px-14">
          <Slider className="pb-5 w-50%" {...settings}>
            {coaches.length > 0 ? (
              coaches.map((coache) => (
                <div
                  key={coache.id}
                  className="w-80 bg-black rounded-lg bg-opacity-70 text-blue-700 justify-between flex flex-col-reverse md:flex-row pt-2 gap-2 border"
                >
                  <div className="w-full flex flex-col-reverse md:flex-row bg-black ">
                    <div className="w-full justify-center bottom-0">
<img className=" top-0 md:w-40  pt-2 pr-2 pl-2" src={coache.img} alt="Coach Img" />
                    </div>
                    <div className="lg:p-6 lg:m-6 font-bold p-3 text-2xl justify-center m-1 flex flex-col gap-4 text-center">
                      <h2 className="font-semibold text-pretty gymfont">{coache.name}</h2>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
}

