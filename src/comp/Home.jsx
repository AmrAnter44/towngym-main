import React, { useState } from 'react';
import logo from '../../public/assets/logo.png';

export default function Home() {
  const [offers, setOffers] = useState([
    {
      id: 2,
      duration: "1 Month",
      price: "0",
      priceNew: "800.00",
      private: "2",
      inbody: "1",
      invite: "2"
    },
    {
      id: 4,
      duration: "3 Months",
      price: "1800.00",
      priceNew: "1500.00",
      private: "3",
      inbody: "3",
      invite: "3"
    },
    {
      id: 5,
      duration: "6 Months",
      price: "2800.00",
      priceNew: "2200.00",
      private: "4",
      inbody: "6",
      invite: "6"
    },
    {
      id: 6,
      duration: "12 Months",
      price: "4500.00",
      priceNew: "3800.00",
      private: "6",
      inbody: "12",
      invite: "12"
    },
  ]);

  function handlebook(offer) {
    // your WhatsApp number (include country code, no "+" or spaces)
    const phone = "201028188900";  

    // message text
    const message = `Hello, I would like to book the ${offer.duration} package at ${offer.priceNew} EGP.`;

    // open WhatsApp link
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <div>
        <h2 className='text-xl pt-24 text-white font-semibold gymfont'>Special Offers</h2>
        <div>
          <p> We're open 24 hours</p>
          <p>Get free Wi-Fi with your membership <i className="fa-solid fa-wifi"></i></p>
        </div>

        <div className='md:flex md:flex-wrap flex-row-reverse gap-4 justify-center pt-3'>
          {offers.length > 0 ? (
            offers.map((offer) => {
              const offerClass =
                offer.id === 1
                  ? 'md:w-80 text-white offer mt-7 p-2 rounded-lg flex flex-col bg-blue-700 shadow-md border-b-8 border-white opacity-90'
                  : 'md:w-80 text-blue-700 offer mt-7 p-2 rounded-lg flex flex-col bg-white shadow-md border-b-8 border-blue-600 opacity-90';

              return (
                <div key={offer.id} className={offerClass}>
                  <h3 className='p-2 font-bold text-xl gymfont'>
                    <i className="fa-solid fa-dumbbell pr-2"></i> {offer.duration}
                  </h3>
                  <div className='flex justify-between'>
                    {offer.price == "0" ? null : (
                      <h3 className='p-2 font-bold text-lg line-through'>
                        <i className="fa-solid fa-tag pr-1"></i>{offer.price.split('.00')}EGP
                      </h3>
                    )}
                    {offer.priceNew == "0" ? null : (
                      <h3 className='p-2 font-bold text-lg'>{offer.priceNew.split('.00')} EGP</h3>
                    )}
                  </div>

                  <ul className={offer.id === 1 ? 'p-2 text-start text-white' : 'p-2 text-start text-blue-700'}>
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

                  <div>
                    <button
                      onClick={() => handlebook(offer)}
                      className='px-4 text-lg py-2 bg-blue-700 text-white rounded-lg'
                    >
                      book now
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i>
          )}
        </div>
      </div>
    </>
  );
}
