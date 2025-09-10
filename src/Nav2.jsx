import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";

export default function PageWithVideo() {
  const [open, setOpen] = useState(false);
      const words = ["INHALE PASSION", "X-GYM"];
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
