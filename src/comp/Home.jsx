import React, { useState, useEffect } from 'react';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [offers33, setOffers33] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [showOffers33, setShowOffers33] = useState(false);
  const [showPT, setShowPT] = useState(false);

  useEffect(() => {
    // fetch العروض العادية
    supabase
      .from('offers')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data }) => {
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
      });

    // fetch باقات PT
    supabase
      .from('pt_packages')
      .select('*')
      .order('sessions', { ascending: true })
      .then(({ data }) => {
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
      
      <div className="mt-20">
        {/* ==================== VIP GOLD ==================== */}
        <h2 className='text-xl pt-9 text-white font-semibold gymfont'>
          VIP Body Package
        </h2>

        <div className="flex flex-wrap flex-row-reverse gap-4 justify-center pt-3 m-4">
          <Link 
            to={'/gold'} 
            className="group relative gold-text glass-button hover:bg-blue-500 hover:text-white font-bold px-6 py-2 m-2 rounded-full flex flex-row justify-center items-center overflow-hidden transition-all duration-500"
          >
            <span className="m-auto">Gold</span>
            <img 
              src="./logo.png" 
              alt="" 
              className="ml-2 w-12 transform transition-all duration-500 group-hover:-rotate-90 group-hover:translate-x-10 group-hover:opacity-0" 
            />
          </Link>
        </div>

        {/* ==================== قسم PT (الجديد) ==================== */}
        <div className='w-full py-9'>
          <div className="max-w-4xl mx-auto px-4">
            {/* الزر الأخضر */}
            <button
              onClick={() => setShowPT(!showPT)}
              className='w-full max-w-2xl mx-auto text-2xl md:text-3xl text-white font-bold gymfont bg-green-600 hover:bg-green-700 px-6 md:px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg'
            >
              <i className="fa-solid fa-dumbbell"></i>
              Personal Training (PT)
              <i className={`fas fa-chevron-${showPT ? 'up' : 'down'} transition-transform duration-300`}></i>
            </button>

            {/* محتوى PT عند الفتح */}
            {showPT && (
              <div className='pt-6 animate-fade-in'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {ptPackages.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <i className="text-3xl text-green-400 fa-solid fa-spinner fa-spin" />
                      <p className="text-white mt-4">Loading PT Packages...</p>
                    </div>
                  ) : (
                    ptPackages.map((pkg) => {
                      const hasDiscount = pkg.price_discount && parseFloat(pkg.price_discount) > 0;
                      const finalPrice = hasDiscount ? parseFloat(pkg.price_discount) : parseFloat(pkg.price);
                      const pricePerSession = calculatePricePerSession(finalPrice, pkg.sessions);

                      return (
                        <div key={pkg.id} className="glass w-full border-2 border-green-500/30 hover:border-green-500/50 transition-all">
                          <div className="bg-green-600 text-white p-3 rounded-t-lg">
                            <h3 className='font-bold text-2xl gymfont text-center'>
                              <i className="fa-solid fa-dumbbell pr-2"></i> 
                              {pkg.sessions} Sessions
                            </h3>
                          </div>

                          <div className='p-4'>
                            {/* السعر */}
                            <div className='mb-4'>
                              <p className='text-sm text-gray-400 mb-1'>Total Price:</p>
                              <div className='flex items-center justify-between'>
                                {hasDiscount ? (
                                  <>
                                    <span className="text-lg line-through text-gray-400">
                                      {pkg.price} EGP
                                    </span>
                                    <span className="text-2xl font-bold text-green-400">
                                      {pkg.price_discount} EGP
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-2xl font-bold text-white">
                                    {pkg.price} EGP
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* سعر الحصة الواحدة */}
                            <div className='bg-green-900/30 p-3 rounded-lg mb-4 border border-green-500/20'>
                              <p className='text-sm text-gray-300 mb-1 text-center'>Price per session:</p>
                              <div className='flex items-center justify-center gap-2'>
                                <i className="fa-solid fa-tag text-green-400"></i>
                                <span className='text-3xl font-bold text-green-400'>
                                  {pricePerSession} EGP
                                </span>
                              </div>
                            </div>

                            {/* تفاصيل إضافية */}
                            <ul className='text-start text-gray-300 space-y-2 mb-4'>
                              <li className='flex items-center gap-2'>
                                <i className='fa-solid fa-check text-green-400'></i>
                                <span>{pkg.sessions} Personal Training Sessions</span>
                              </li>
                              <li className='flex items-center gap-2'>
                                <i className='fa-solid fa-check text-green-400'></i>
                                <span>Professional Coach</span>
                              </li>
                              <li className='flex items-center gap-2'>
                                <i className='fa-solid fa-check text-green-400'></i>
                                <span>Customized Training Plan</span>
                              </li>
                            </ul>

                            {/* زر الحجز */}
                            <button
                              onClick={() => handlePTBook(pkg)}
                              className='w-full px-4 text-lg py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-bold'
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================== قسم العروض العادية ==================== */}
        <div className='w-full py-9'>
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={() => setShowOffers(!showOffers)}
              className='w-full max-w-2xl mx-auto text-2xl md:text-3xl text-white font-bold gymfont bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg'
            >
              Our Offers
              <i className={`fas fa-chevron-${showOffers ? 'up' : 'down'} transition-transform duration-300`}></i>
            </button>

            {showOffers && (
              <div className='pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in'>
                {offers.length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <i className="text-3xl text-blue-400 fa-solid fa-spinner fa-spin" />
                  </div>
                ) : (
                  offers.map((offer) => (
                    <div key={offer.id} className="glass">
                      <h3 className='p-1 font-bold text-xl gymfont text-blue-600'>
                        <i className="fa-solid fa-dumbbell pr-2"></i> {offer.duration}
                      </h3>

                      <div className='flex justify-between'>
                        {offer.price_new && offer.price_new !== "0" ? (
                          <>
                            <h3 className="p-1 font-bold text-lg line-through text-gray-400">
                              {offer.price} EGP
                            </h3>
                            <h3 className="p-1 font-bold text-lg text-blue-600">
                              {offer.price_new} EGP
                            </h3>
                          </>
                        ) : (
                          <h3 className="p-1 font-bold text-lg">
                            {offer.price} EGP
                          </h3>
                        )}
                      </div>

                      <ul className='p-1 text-start text-white-700'>
                        <li className='p-1 font-semibold'>
                          <i className='pr-1 fa-solid fa-check'></i> {offer.private} Sessions Personal Training
                        </li>
                        <li className='p-1 font-semibold'>
                          <i className='pr-1 fa-solid fa-check'></i> {offer.inbody} Sessions In Inbody
                        </li>
                        <li className='p-1 font-semibold'>
                          <i className='pr-1 fa-solid fa-check'></i> {offer.invite} Sessions Invitations
                        </li>
                        <li className='p-1 font-semibold'>
                          <i className='pr-1 fa-solid fa-check'></i> ALL Classes
                        </li>
                        <li className='p-1 font-semibold'>
                          <i className='pr-1 fa-solid fa-check'></i> SPA
                        </li>
                      </ul>

                      <button
                        onClick={() => handlebook(offer)}
                        className='px-4 text-lg py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-600'
                      >
                        book now
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ==================== قسم العروض بخصم 33% ==================== */}
        <div className='w-full py-9'>
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={() => setShowOffers33(!showOffers33)}
              className='w-full max-w-2xl mx-auto text-2xl md:text-3xl text-white font-bold gymfont bg-gray-700 hover:bg-gray-600 px-6 md:px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg'
            >
              33% OFF Offers
              <i className={`fas fa-chevron-${showOffers33 ? 'up' : 'down'} transition-transform duration-300`}></i>
            </button>
            
            {showOffers33 && (
              <>
                <p className='text-white text-xl mt-4 text-center'>The offer is valid only from 3 AM to 3 PM.</p>
                
                <div className='pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in'>
                  {offers33.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <i className="text-3xl text-white fa-solid fa-spinner fa-spin" />
                    </div>
                  ) : (
                    offers33.map((offer) => (
                      <div key={`33-${offer.id}`} className="glass">
                        <h3 className='p-1 font-bold text-xl gymfont text-white'>
                          <i className="fa-solid fa-dumbbell pr-2"></i> {offer.duration}
                        </h3>

                        <div className='flex justify-between'>
                          <h3 className="p-1 font-bold text-lg line-through text-gray-400">
                            {offer.price} EGP
                          </h3>
                          <h3 className="p-1 font-bold text-lg text-white-600">
                            {offer.price_new} EGP
                          </h3>
                        </div>

                        <ul className='p-1 text-start text-white-700'>
                          <li className='p-1 font-semibold'>
                            <i className='pr-1 fa-solid fa-check'></i> {offer.private} Sessions Personal Training
                          </li>
                          <li className='p-1 font-semibold'>
                            <i className='pr-1 fa-solid fa-check'></i> {offer.inbody} Sessions In Inbody
                          </li>
                          <li className='p-1 font-semibold'>
                            <i className='pr-1 fa-solid fa-check'></i> {offer.invite} Sessions Invitations
                          </li>
                          <li className='p-1 font-semibold'>
                            <i className='pr-1 fa-solid fa-check'></i> ALL Classes
                          </li>
                          <li className='p-1 font-semibold'>
                            <i className='pr-1 fa-solid fa-check'></i> SPA
                          </li>
                        </ul>

                        <button
                          onClick={() => handlebook(offer)}
                          className='px-4 text-lg py-1 bg-gray-700 text-white rounded-lg hover:bg-blue-600'
                        >
                          book now
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="marquee">
          <p className="ml-11">
            <span># INHALLE PASSION</span> &nbsp; &nbsp; 
            <span># INHALLE PASSION</span> &nbsp; &nbsp; 
            <span># INHALLE PASSION</span> &nbsp; &nbsp; 
            <span># INHALLE PASSION</span> &nbsp; &nbsp;
          </p>
        </div>

        <Coaches />

        <div className='flex justify-evenly'>
          <div className="w-1/3 rounded-xl p-3 text-center">
            <i className="fas fa-clock text-xl text-blue-400 mb-1"></i>
            <p className="text-white font-bold text-sm">24/7</p>
            <p className="text-gray-300 text-xs">Open</p>
          </div>

          <div className="w-1/3 rounded-xl p-3 text-center">
            <i className="fas fa-wifi text-xl text-blue-400 mb-1"></i>
            <p className="text-white font-bold text-sm">FREE</p>
            <p className="text-gray-300 text-xs">Wi-Fi</p>
          </div>
        </div>
      </div>
    </>
  );
}
