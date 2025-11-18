import React, { useState } from 'react';

export default function BlackFridayOffer() {
  const [isVisible, setIsVisible] = useState(true);

  const handleBook = () => {
    const phone = "201028188900";  
    const message = "Hello, I would like to book the Black Friday offer: 3 months + 2 free months for 1800 EGP";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  };

  if (!isVisible) return null;

  return (
    <section className='relative w-full py-8 px-4 overflow-hidden'>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-gray-900/30 to-black/50"></div>
      
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-20 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <i className="fas fa-times text-white text-xs"></i>
      </button>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Badge */}
          <div>
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full">
              BLACK FRIDAY
            </span>
          </div>

          {/* Offer */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-white gymfont">3</div>
              <div className="text-xs text-blue-400 font-semibold">Months</div>
            </div>

            <div className="text-3xl text-blue-400 font-bold">+</div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 gymfont">2</div>
              <div className="text-xs text-white font-semibold">Free</div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-white gymfont">1800</span>
            <span className="text-xl font-bold text-blue-400">EGP</span>
          </div>

          {/* Button */}
          <button
            onClick={handleBook}
            className='px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-bold transform hover:scale-105 active:scale-95'
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}