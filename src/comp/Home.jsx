import React, { useState, useEffect } from 'react';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { dataService } from '../data/dataService';
import BlackFridayOffer from './BlackFridayOffer'; // حط المسار الصح

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [offers33, setOffers33] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [showOffers33, setShowOffers33] = useState(false);
  const [showPT, setShowPT] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch العروض العادية
    dataService.getOffers().then(({ data }) => {
      if (data) {
        setOffers(data);
        
        // حساب العروض بخصم 33%
        const discountedOffers = data.map(offer => {
          const originalPrice = parseFloat(offer.price);
          const priceAfterDiscount = originalPrice * 0.67;
          const discountedPrice = Math.round(priceAfterDiscount / 10) * 10;
          
          return {
            ...offer,
            price: originalPrice,
            price_new: discountedPrice
          };
        });
        setOffers33(discountedOffers);
      }
      setIsLoading(false);
    });

    // fetch باقات PT
    dataService.getPtPackages().then(({ data }) => {
      if (data) setPtPackages(data);
    });
  }, []);

  function handlebook(offer) {
    const phone = "201028188900";  
    const message = `Hello, I would like to book the ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  function handlePTBook(ptPackage) {
    const phone = "201028188900";  
    const message = `Hello, I would like to book ${ptPackage.sessions} PT Sessions.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  // حساب سعر الحصة الواحدة
  const calculatePricePerSession = (price, sessions) => {
    return Math.round(price / sessions);
  };

  return (
    <>
      <Nav2 />
      
      <div className="mt-20 space-y-8">
    <BlackFridayOffer />

        {/* ==================== قسم PT (الجديد) ==================== */}
        <section className='relative w-full py-16 px-4 overflow-hidden'>
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-900/30 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full mb-4">
                PROFESSIONAL COACHING
              </span>
              <h2 className='text-3xl md:text-4xl text-white font-bold gymfont mb-2'>
                Personal Training
              </h2>
              <p className="text-gray-300 text-sm md:text-base">Transform your body with expert guidance</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* الزر */}
            <button
              onClick={() => setShowPT(!showPT)}
              className='w-full max-w-2xl mx-auto text-xl md:text-2xl text-white font-bold gymfont bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 md:px-8 py-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 active:scale-95 border-2 border-blue-400/30'
            >
              <i className="fa-solid fa-dumbbell"></i>
              {showPT ? 'Hide' : 'View'} PT Packages
              <i className={`fas fa-chevron-${showPT ? 'up' : 'down'} transition-all duration-500 transform ${showPT ? 'rotate-180' : ''}`}></i>
            </button>

            {/* محتوى PT عند الفتح */}
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showPT ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className='pt-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {ptPackages.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <i className="text-3xl text-blue-400 fa-solid fa-spinner fa-spin" />
                      <p className="text-blue-400 mt-4 animate-pulse">Loading PT Packages...</p>
                    </div>
                  ) : (
                    ptPackages.map((pkg, index) => {
                      const hasDiscount = pkg.price_discount && parseFloat(pkg.price_discount) > 0;
                      const finalPrice = hasDiscount ? parseFloat(pkg.price_discount) : parseFloat(pkg.price);
                      const pricePerSession = calculatePricePerSession(finalPrice, pkg.sessions);

                      return (
                        <div 
                          key={pkg.id} 
                          className="group relative bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-transparent backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-400 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 overflow-hidden"
                          style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          
                          <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-t-2xl">
                            <h3 className='font-bold text-2xl gymfont text-center text-white flex items-center justify-center gap-2'>
                              <i className="fa-solid fa-dumbbell transform group-hover:rotate-180 transition-transform duration-500"></i> 
                              {pkg.sessions} Sessions
                            </h3>
                          </div>

                          <div className='p-6'>
                            {/* السعر */}
                            <div className='mb-4'>
                              <p className='text-xs text-gray-400 mb-2 uppercase tracking-wider'>Total Investment:</p>
                              <div className='flex items-center justify-between'>
                                {hasDiscount ? (
                                  <>
                                    <span className="text-lg line-through text-gray-500">
                                      {pkg.price} EGP
                                    </span>
                                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                      {pkg.price_discount} EGP
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-3xl font-bold text-white">
                                    {pkg.price} EGP
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* سعر الحصة الواحدة */}
                            <div className='relative bg-gradient-to-br from-blue-600/40 to-blue-800/40 p-4 rounded-xl mb-4 border border-blue-400/30 backdrop-blur-sm overflow-hidden group/price hover:scale-105 transition-transform duration-300'>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover/price:opacity-100 transition-opacity duration-500"></div>
                              <p className='text-xs text-gray-300 mb-2 text-center uppercase tracking-wider relative z-10'>Price per session:</p>
                              <div className='flex items-center justify-center gap-2 relative z-10'>
                                <i className="fa-solid fa-tag text-blue-400 animate-pulse"></i>
                                <span className='text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent'>
                                  {pricePerSession}
                                </span>
                                <span className='text-2xl font-bold text-blue-300'>EGP</span>
                              </div>
                            </div>

                            {/* تفاصيل إضافية */}
                            <ul className='space-y-3 mb-6'>
                              {[
                                { icon: 'fa-user-tie', text: `${pkg.sessions} Personal Training Sessions` },
                                { icon: 'fa-medal', text: 'Professional Coach' },
                                { icon: 'fa-clipboard-list', text: 'Customized Training Plan' }
                              ].map((item, i) => (
                                <li 
                                  key={i}
                                  className='flex items-center gap-3 text-gray-200 transform transition-all duration-300 hover:translate-x-2 hover:text-white group/item'
                                >
                                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover/item:bg-blue-500/40 transition-colors duration-300">
                                    <i className={`fa-solid ${item.icon} text-blue-400 text-sm group-hover/item:scale-125 transition-transform duration-300`}></i>
                                  </div>
                                  <span className="text-sm font-medium">{item.text}</span>
                                </li>
                              ))}
                            </ul>

                            {/* زر الحجز */}
                            <button
                              onClick={() => handlePTBook(pkg)}
                              className='w-full px-6 text-lg py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-500 font-bold transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 relative overflow-hidden group/btn'
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <i className="fa-solid fa-calendar-check"></i>
                                Book Now
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== قسم العروض العادية ==================== */}
        <section className='relative w-full py-16 px-4 overflow-hidden'>
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-blue-900/25 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/15 via-transparent to-transparent"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full mb-4">
                BEST VALUE
              </span>
              <h2 className='text-3xl md:text-4xl text-white font-bold gymfont mb-2'>
                Our Offers
              </h2>
              <p className="text-gray-300 text-sm md:text-base">Complete packages for your fitness journey</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <button
              onClick={() => setShowOffers(!showOffers)}
              className='w-full max-w-2xl mx-auto text-xl md:text-2xl text-white font-bold gymfont bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 md:px-8 py-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 active:scale-95 border-2 border-blue-400/30'
            >
              <span className="relative z-10">{showOffers ? 'Hide' : 'View'} All Offers</span>
              <i className={`fas fa-chevron-${showOffers ? 'up' : 'down'} transition-all duration-500 transform ${showOffers ? 'rotate-180' : ''} relative z-10`}></i>
            </button>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showOffers ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className='pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {offers.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <i className="text-3xl text-blue-400 fa-solid fa-spinner fa-spin" />
                  </div>
                ) : (
                  offers.map((offer, index) => (
                    <div 
                      key={offer.id} 
                      className="group relative bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-transparent backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-400 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 overflow-hidden"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      {/* Header */}
                      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-t-2xl">
                        <h3 className='font-bold text-xl gymfont text-white flex items-center justify-center gap-2'>
                          <i className="fa-solid fa-dumbbell transform group-hover:rotate-180 transition-transform duration-500"></i>
                          {offer.duration}
                        </h3>
                      </div>

                      <div className='p-6'>
                        {/* Price */}
                        <div className='flex items-center justify-between mb-6 pb-4 border-b border-blue-500/20'>
                          {offer.price_new && offer.price_new !== "0" ? (
                            <>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Was</span>
                                <span className="text-lg line-through text-gray-500">
                                  {offer.price} EGP
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-blue-400 uppercase tracking-wider mb-1">Now</span>
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                  {offer.price_new} EGP
                                </span>
                              </div>
                            </>
                          ) : (
                            <span className="text-3xl font-bold text-white mx-auto">
                              {offer.price} EGP
                            </span>
                          )}
                        </div>

                        {/* Features */}
                        <ul className='space-y-3 mb-6'>
                          {[
                            { icon: 'fa-user-tie', text: `${offer.private} Sessions Personal Training` },
                            { icon: 'fa-weight-scale', text: `${offer.inbody} Sessions In Inbody` },
                            { icon: 'fa-user-plus', text: `${offer.invite} Sessions Invitations` },
                            { icon: 'fa-calendar-days', text: 'ALL Classes' },
                            { icon: 'fa-spa', text: 'SPA' }
                          ].map((item, i) => (
                            <li 
                              key={i}
                              className='flex items-center gap-3 text-gray-200 transform transition-all duration-300 hover:translate-x-2 hover:text-white group/item'
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover/item:bg-blue-500/40 transition-colors duration-300 flex-shrink-0">
                                <i className={`fa-solid ${item.icon} text-blue-400 text-xs group-hover/item:scale-125 transition-transform duration-300`}></i>
                              </div>
                              <span className="text-sm font-medium">{item.text}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Book Button */}
                        <button
                          onClick={() => handlebook(offer)}
                          className='w-full px-6 text-lg py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-500 font-bold transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 relative overflow-hidden group/btn'
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <i className="fa-solid fa-calendar-check"></i>
                            Book Now
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

 {/* ==================== قسم العروض بخصم 33% ==================== */}
        <section className='relative w-full py-16 px-4 overflow-hidden'>
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-900/30 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full mb-4 animate-pulse">
                LIMITED TIME OFFER
              </span>
              <h2 className='text-3xl md:text-4xl text-white font-bold gymfont mb-2'>
                33% OFF 
              </h2>
              <p className="text-gray-300 text-sm md:text-base">Valid only from 3 AM to 3 PM</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* الزر */}
            <button
              onClick={() => setShowOffers33(!showOffers33)}
              className='w-full max-w-2xl mx-auto text-xl md:text-2xl text-white font-bold gymfont bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 px-6 md:px-8 py-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 active:scale-95 border-2 border-blue-400/30'
            >
              <i className="fa-solid fa-tag"></i>
              {showOffers33 ? 'Hide' : 'View'} 33% OFF Offers
              <i className={`fas fa-chevron-${showOffers33 ? 'up' : 'down'} transition-all duration-500 transform ${showOffers33 ? 'rotate-180' : ''}`}></i>
            </button>

            {/* محتوى العروض عند الفتح */}
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showOffers33 ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className='pt-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {offers33.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <i className="text-3xl text-blue-400 fa-solid fa-spinner fa-spin" />
                      <p className="text-blue-400 mt-4 animate-pulse">Loading Special Offers...</p>
                    </div>
                  ) : (
                    offers33.map((offer, index) => (
                      <div 
                        key={`33-${offer.id}`} 
                        className="group relative bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-transparent backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-400 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 overflow-hidden"
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Discount Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                            33% OFF
                          </div>
                        </div>

                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-blue-600 to-blue-600 p-4 rounded-t-2xl">
                          <h3 className='font-bold text-2xl gymfont text-center text-white flex items-center justify-center gap-2'>
                            <i className="fa-solid fa-dumbbell transform group-hover:rotate-180 transition-transform duration-500"></i> 
                            {offer.duration}
                          </h3>
                        </div>

                        <div className='p-6'>
                          {/* السعر */}
                          <div className='flex items-center justify-between mb-6 pb-4 border-b border-blue-500/20'>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Was</span>
                              <span className="text-lg line-through text-gray-500">
                                {offer.price} EGP
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-blue-400 uppercase tracking-wider mb-1">Now</span>
                              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                                {offer.price_new} EGP
                              </span>
                            </div>
                          </div>

                          {/* Features */}
                          <ul className='space-y-3 mb-6'>
                            {[
                              { icon: 'fa-user-tie', text: `${offer.private} Sessions Personal Training` },
                              { icon: 'fa-weight-scale', text: `${offer.inbody} Sessions In Inbody` },
                              { icon: 'fa-user-plus', text: `${offer.invite} Sessions Invitations` },
                              { icon: 'fa-calendar-days', text: 'ALL Classes' },
                              { icon: 'fa-spa', text: 'SPA' }
                            ].map((item, i) => (
                              <li 
                                key={i}
                                className='flex items-center gap-3 text-gray-200 transform transition-all duration-300 hover:translate-x-2 hover:text-white group/item'
                              >
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover/item:bg-blue-500/40 transition-colors duration-300 flex-shrink-0">
                                  <i className={`fa-solid ${item.icon} text-blue-400 text-xs group-hover/item:scale-125 transition-transform duration-300`}></i>
                                </div>
                                <span className="text-sm font-medium">{item.text}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Book Button */}
                          <button
                            onClick={() => handlebook(offer)}
                            className='w-full px-6 text-lg py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-500 hover:to-blue-500 transition-all duration-500 font-bold transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 relative overflow-hidden group/btn'
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <i className="fa-solid fa-calendar-check"></i>
                              Book Now
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee">
          <p className="ml-11">
            <span># INHALLE PASSION</span> &nbsp; &nbsp; 
            <span># INHALLE PASSION</span> &nbsp; &nbsp; 
            <span># INHALLE PASSION</span> &nbsp; &nbsp; 
            <span># INHALLE PASSION</span> &nbsp; &nbsp;
          </p>
        </div>

        <Coaches />

        <div className='flex justify-evenly transform transition-all duration-700 ease-out'>
          <div className="w-1/3 rounded-xl p-3 text-center transform transition-all duration-500 hover:scale-110 hover:-translate-y-2">
            <i className="fas fa-clock text-xl text-blue-400 mb-1 animate-pulse"></i>
            <p className="text-white font-bold text-sm">24/7</p>
            <p className="text-gray-300 text-xs">Open</p>
          </div>

          <div className="w-1/3 rounded-xl p-3 text-center transform transition-all duration-500 hover:scale-110 hover:-translate-y-2">
            <i className="fas fa-wifi text-xl text-blue-400 mb-1 animate-pulse"></i>
            <p className="text-white font-bold text-sm">FREE</p>
            <p className="text-gray-300 text-xs">Wi-Fi</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}