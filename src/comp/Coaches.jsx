import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Coaches() {
  const [coaches, setCoaches] = useState([
    { id: 1, name: "Mostafa", img: "/coaches/mostafa.jpg", title: "Leader" },
    { id: 2, name: "Zima", img: "/coaches/zema.jpg", title: "Fitness manager" },
    { id: 3, name: "Aimlia", img: "/coaches/aimlia.jpg", title: "Coach" },
    { id: 4, name: "Haitham", img: "/coaches/haitham.jpg", title: "Coach" },
    { id: 5, name: "Saif", img: "/coaches/saif.jpg", title: "Coach" },
    { id: 6, name: "Amr", img: "/coaches/amr.jpg", title: "Coach" },
    { id: 7, name: "Ali", img: "/coaches/ali.jpg", title: "Coach" },
    { id: 8, name: "Bogy", img: "/coaches/bogy.jpg", title: "Coach" },


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
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return <>


    <div className="w-50%">
      {/* <h2 className="text-xl font-semibold pb-1 p-4 mb-4 gymfont">Coaches :</h2> */}
                <p className='text-lg  font-bold p-2'>
         Our coaches are here to support you in becoming stronger, healthier, and better every single day.
        </p>

      <div className="lg:px-14">
        <Slider className="pb-5 w-50%" {...settings}>
          {coaches.length > 0 ? (
            coaches.map((coache) => (
             <div
                key={coache.id}
                className="w-full md:w-40 bg-black rounded-lg bg-opacity-70 text-blue-700 flex flex-col justify-center pt-2 gap-2"
              >
                <div className="w-full flex flex-col-reverse md:flex-row bg-black justify-center">
                  <div className="w-full justify-center items-center bottom-0">
      <img className=" rounded-lg p-2 mx-1 md:w-40" src={coache.img} alt="Coach Img " />
                  </div>
                  <div className="lg:p-6 lg:m-6 font-bold p-3 text-2xl justify-between items-center flex flex-row gap-4 text-center">
                   <i className="fa-solid fa-arrow-left text-blue-600"></i>
                        <div>
      <h2 className="font-semibold text-pretty gymfont ">{coache.name}</h2>
 <h3 className='font-semibold text-white text-sm mt-2'>{coache.title}</h3>
                        </div>
                    <i className="fa-solid fa-arrow-right text-blue-600"></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i>
          )}
        </Slider>
      </div>

      <div>

      </div>
    </div>



 </>
}
