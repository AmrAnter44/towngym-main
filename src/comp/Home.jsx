import React, { useState, useEffect } from 'react';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [offers33, setOffers33] = useState([]);

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
            const priceAfterDiscount = originalPrice * 0.67; // خصم 33%
            const discountedPrice = Math.round(priceAfterDiscount / 10) * 10; // تقريب لأقرب 10
            
            return {
              ...offer,
              price: originalPrice,
              price_new: discountedPrice
            };
          });
          setOffers33(discountedOffers);
        }
      });
  }, []);

  function handlebook(offer) {
    const phone = "201028188900";  
    const message = `Hello, I would like to book the ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  return (
    <>
      <Nav2 />
      
      <div>
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

        {/* قسم العروض العادية */}
        <h2 className='text-3xl pt-9 text-white font-bold gymfont'>
          Our Offers
        </h2>

        <div className='md:flex md:flex-wrap flex-row-reverse gap-4 justify-center pt-3 m-4'>
          {offers.length === 0 ? (
            <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin" />
          ) : (
            offers.map((offer) => (
              <div key={offer.id} className="glass m-3">
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

        {/* قسم العروض بخصم 33% */}
        <h2 className='text-3xl pt-9 text-white font-bold gymfont'>
          33% OFF Offers
        </h2>
        <p className='text-white-600 text-xl'>The offer is valid only from 3 AM to 3 PM.</p>

        <div className='md:flex md:flex-wrap flex-row-reverse gap-4 justify-center pt-3 m-4'>
          {offers33.length === 0 ? (
            <i className="text-3xl text-white p-4 m-4 fa-solid fa-spinner fa-spin" />
          ) : (
            offers33.map((offer) => (
              <div key={`33-${offer.id}`} className="glass m-3">
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