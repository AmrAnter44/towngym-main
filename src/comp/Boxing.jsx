import React from 'react';

export default function Boxing() {

  const handleBook = () => {
    const phone = "201028188900";
    const message = "Hello, I would like to book the Monthly Combo: Membership + Boxing for 1000 EGP";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  };

  return (
    <section className='relative w-full py-8 px-4 overflow-hidden'>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/50 to-gray-900/30"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-6">

        <div className="bg-gradient-to-r from-blue-900/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Badge */}
          <div>
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full">
              Monthly Combo
            </span>
          </div>

          {/* Offer Items */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {/* Membership */}
            <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-2 rounded-lg border border-purple-500/30">
              <i className="fas fa-id-card text-purple-400 text-xl"></i>
              <span className="text-white font-semibold text-sm md:text-base">Membership</span>
            </div>

            <div className="text-2xl font-bold text-blue-400">+</div>

            {/* Boxing */}
            <div className="flex items-center gap-2 bg-red-900/30 px-3 py-2 rounded-lg border border-red-500/30">
              <i className="fas fa-hand-rock text-red-400 text-xl"></i>
              <span className="text-white font-semibold text-sm md:text-base">Boxing</span>
            </div>
          </div>

          {/* Duration */}
          <div className="text-center">
            <div className="text-5xl font-bold text-white gymfont">1</div>
            <div className="text-xs text-blue-400 font-semibold">Month</div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-white gymfont">1000</span>
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
