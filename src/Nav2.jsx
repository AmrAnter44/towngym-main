import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";

export default function PageWithVideo() {
  const [open, setOpen] = useState(false);
      const words = ["INHALE PASSION", "XGYM"];
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);
  
      useEffect(() => {
      const handleTyping = () => {
        const currentWord = words[wordIndex % words.length];
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
        } else {
          setText(currentWord.substring(0, text.length + 1));
        }
  
              if (!isDeleting && text === currentWord) {
          // توقف قبل المسح
          setTimeout(() => setIsDeleting(true), 1000);
          setSpeed(50);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
          setSpeed(150);
        }
      };
  
          const timer = setTimeout(handleTyping, speed);
  
      return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex]);

  return <>
    <div className="relative w-full min-h-screen">
     {/*
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="flex flex-col lg:flex-row items-center justify-between glass-nav text-white lg:m-2 mb-5">
         
          <div className="lg:ml-4 flex justify-between w-full lg:w-auto px-4 lg:px-0">
            <Link to={"/"}>
              <img src="/assets/bigLogo.png" alt="logo" className="w-28" />
            </Link>

        
            <div className="flex items-center lg:hidden">
              <Link to={"/shop"}>
                <i className="fa-solid fa-cart-shopping text-2xl mr-4 mb-2 mt-3"></i>
              </Link>

              <button
                className="text-white text-3xl"
                onClick={() => setOpen(!open)}
              >
                {open ? "✕" : "☰"}
              </button>
            </div>
          </div> 

         
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out flex-col lg:flex lg:flex-row justify-between items-center font-bold text-center w-full lg:w-auto ${
              open
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
            }`}
          >
            <Link
              to="/"
              className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/classes"
              className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Classes
            </Link>
            <Link
              to="/map"
              className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Map
            </Link>

            <Link
              to={"/shop"}
              className="hidden lg:block ml-4"
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
            </Link>
          </div>
        </div>
      </div>
*/}
      {/* ✅ Video background */}
      <section className="w-full min-h-screen relative flex items-center justify-center">
        <video
          src="./0910.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        ></video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content above video */}
        <div className="relative z-20 w-full h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
              <p className="mt-40 text-3xl lg:text-6xl gymfont  font-bold">
      {text}
      <span className="border-r-2 border-white ml-1 animate-pulse"></span>
    </p>
        </div>
      </section>

      {/* Example of more page content below */}

    </div>
  </>
}
