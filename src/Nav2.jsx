import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";

function getNextThursdayAt6PM() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // Sun=0, Mon=1, ..., Thu=4
  let daysUntilThursday = (4 - day + 7) % 7;
  target.setDate(now.getDate() + daysUntilThursday);
  target.setHours(18, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

export default function PageWithVideo() {
  const [open, setOpen] = useState(false);
      const words = ["INHALE PASSION", "X-GYM"];
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const target = getNextThursdayAt6PM();
      const updateCountdown = () => {
        const diff = target.getTime() - new Date().getTime();
        if (diff <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      };
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }, []);

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
          src="/0910.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        ></video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content above video */}
        <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
          {/* ⏱ Countdown Timer */}
          <div className="mt-16 inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-md border border-blue-400/40 rounded-full px-4 py-2 shadow-lg">
            <i className="fa-solid fa-stopwatch text-blue-300 text-sm animate-pulse"></i>
            <span className="text-xs md:text-sm text-blue-100 font-semibold">Thursday 6 PM in</span>
            <div className="flex items-center gap-1 text-white font-bold">
              <span className="bg-blue-500/40 px-2 py-0.5 rounded text-xs md:text-sm tabular-nums">{String(timeLeft.days).padStart(2, '0')}d</span>
              <span className="bg-blue-500/40 px-2 py-0.5 rounded text-xs md:text-sm tabular-nums">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="bg-blue-500/40 px-2 py-0.5 rounded text-xs md:text-sm tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="bg-blue-500/40 px-2 py-0.5 rounded text-xs md:text-sm tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>

              <p className="mt-6 text-3xl lg:text-6xl gymfont  font-bold">
      {text}
      <span className="border-r-2 border-white ml-1 animate-pulse"></span>
    </p>

          {/* 🏆 Competition Announcement */}
          <div className="mt-8 w-full max-w-3xl mx-auto px-4">
            <div className="relative bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-900/70 backdrop-blur-md border-2 border-blue-400/50 rounded-2xl p-6 md:p-8 shadow-2xl shadow-blue-500/30 overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 animate-pulse"></div>

              {/* Badge */}
              <div className="relative flex justify-center mb-3">
                <span className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                  <i className="fa-solid fa-trophy"></i>
                  COMPETITION THIS THURSDAY
                </span>
              </div>

              {/* Title */}
              <h3 className="relative text-2xl md:text-4xl text-white font-bold gymfont mb-2">
                X-GYM Championship
              </h3>
              <p className="relative text-blue-200 text-sm md:text-base mb-5">
                Join us this Thursday and compete for amazing prizes!
              </p>

              {/* Prizes */}
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-blue-500/20 border border-blue-400/40 rounded-xl p-3 transform hover:scale-105 transition-all duration-300">
                  <i className="fa-solid fa-flask text-2xl md:text-3xl text-blue-300 mb-2"></i>
                  <p className="text-white text-xs md:text-sm font-bold">Creatine Jars</p>
                </div>
                <div className="bg-blue-500/20 border border-blue-400/40 rounded-xl p-3 transform hover:scale-105 transition-all duration-300">
                  <i className="fa-solid fa-jar text-2xl md:text-3xl text-blue-300 mb-2"></i>
                  <p className="text-white text-xs md:text-sm font-bold">Protein Jars</p>
                </div>
                <div className="bg-blue-500/20 border border-blue-400/40 rounded-xl p-3 transform hover:scale-105 transition-all duration-300">
                  <i className="fa-solid fa-bag-shopping text-2xl md:text-3xl text-blue-300 mb-2"></i>
                  <p className="text-white text-xs md:text-sm font-bold">Gym Bags</p>
                </div>
              </div>

              {/* Open to all */}
              <p className="relative text-blue-100 text-sm md:text-base font-semibold mb-5 flex items-center justify-center gap-2">
                <i className="fa-solid fa-venus-mars text-blue-300"></i>
                Open for both Men & Women
              </p>

              {/* Register Button */}
              <a href="https://supabase-alpha-one.vercel.app/"
                
                className="relative w-full md:w-auto mx-auto px-8 py-4 bg-white text-blue-500 font-bold text-lg rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl shadow-white/50 flex items-center justify-center gap-3"
              >
                
               to Register 
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Example of more page content below */}

    </div>
  </>
}
