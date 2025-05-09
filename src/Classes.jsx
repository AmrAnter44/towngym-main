import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [classes, setClasses] = useState([
    { id: 1, class: "Functional Training", day: "Saturday", time1: "8:00" },
    { id: 2, class: "Aerobics", day: "Sunday", time1: "8:00" },
    { id: 3, class: "Flexibility", day: "Sunday", time1: "9:00" },
    { id: 2, class: "Superman Kids", day: "Monday", time1: "6:00" },
    { id: 2, class: "Boxing", day: "Monday", time1: "7:00" },
    { id: 2, class: "Circuit", day: "Monday", time1: "8:00" },
    { id: 2, class: "Zumba", day: "Tuesday", time1: "8:00" },
    { id: 2, class: "Yoga", day: "Tuesday", time1: "9:00" },
    { id: 2, class: "Core", day: "Wednesday", time1: "8:00" },
    { id: 2, class: "Superman Kids", day: "Thursday", time1: "6:00" },
    { id: 2, class: "Boxing", day: "Thursday", time1: "7:00" },
    { id: 2, class: "Belly Dancing", day: "Sunday", time1: "8:00" },

  ]);


  var settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };


  return (
    <>
      <h2 className="text-xl font-semibold p-4 gymfont gap-2">Classes :</h2>

      <div className="w-50% flex flex-col lg:flex-row gap-2 flex-wrap justify-center">
        {classes.length > 0 ? (
          classes.map((classs) => (
            <div
              key={classs.id}
              className="text-blue-800 bg-white flex flex-col flex-wrap min-w-28 border p-3 rounded-lg justify-center text-center"
            >
              <h3 className="p-2 font-bold text-blue-700 text-lg gymfont gymfont">
                {classs.class}
              </h3>
              <h4 className="p-2 font-bold text-blue-700 text-lg">
                Day: {classs.day}
              </h4>

              <p className="p-2 font-bold text-blue-700 text-lg">
                <i className="fa-regular fa-clock"></i> At:{" "}
                <span className="text-xl text-black px-1">{classs.time1}</span>{" "}
                <span>pm</span>
              </p>

            </div>
          ))
        ) : (
          <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i>
        )}
      </div>
    </>
  );
}
