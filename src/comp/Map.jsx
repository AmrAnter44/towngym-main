import React from "react";
import gymMap from "../../public/map.png"; // تأكد من المسار
import { Link } from "react-router-dom";

function Map() {
  return (
    <>
      <h3 className="text-2xl font-bold text-center ">
        Tap any section on the map to discover more details!
      </h3>

      <div className="relative w-full max-w-[768px] mx-auto p-6 m-12">
        {/* الخريطة */}
        <img src={gymMap} alt="Gym Map" className="w-full" />

        {/* اللوجو فوق الخريطة في الشمال */}
        <img
          src="./maplogo.png"
          alt="Map Logo"
          className="absolute -top-9 -left-2 w-20 -z-20 "
        />

        {/* الروابط */}
        <Link
          to="/men"
          className="absolute top-0 left-0 w-[50%] h-[12.5%] z-10"
        ></Link>
        <Link
          to="/ladies"
          className="absolute top-[12.5%] left-0 w-[50%] h-[12.5%] z-10"
        ></Link>
        <Link
          to="/spa"
          className="absolute top-[25%] left-0 w-[50%] h-[12.5%] z-10"
        ></Link>
        <Link
          to="/bar"
          className="absolute top-[36.5%] left-0 w-[50%] h-[9%] z-10"
        ></Link>
        <Link
          to="/weight"
          className="absolute top-[45%] left-0 w-[50%] h-[26%] z-10"
        ></Link>
        <Link
          to="/fitness"
          className="absolute bottom-0 left-0 w-[70%] h-[28%] z-10"
        ></Link>
        <Link
          to="/caples"
          className="absolute top-0 left-[50%] w-[20%] h-[72%] z-10"
        ></Link>
        <Link
          to="/machines"
          className="absolute top-[44.5%] right-0 w-[30%] h-[30%] z-10"
        ></Link>
        <Link
          to="/cardio"
          className="absolute top-0 right-0 w-[28.3%] h-[45%] z-10"
        ></Link>
        <Link
          to="/leg"
          className="absolute bottom-0 right-0 w-[29%] h-[25%] z-10"
        ></Link>
      </div>
    </>
  );
}

export default Map;
