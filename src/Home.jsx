import React, { useState } from 'react';
import Coaches from './Coaches';
import Classes from './Classes';
import { Link } from 'react-router-dom';
import logo from '../public/assets/logo.png';
import { motion } from "framer-motion"; // مكتبة framer-motion تم استيرادها بشكل صحيح
import Img from './Img';
import CalorieCalculator from './CalorieCalculator';


export default function Home() {
  const [offers, setOffers] = useState([
    {
      id: 1,
      duration: "One Package Total Transformation",
      price: "3500.00",
      priceNew: "2500.00",
      private: "10",
      inbody: "1",
      invite: "1"
    },
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
      price: "2200.00",
      priceNew: "1800.00",
      private: "3",
      inbody: "3",
      invite: "3"
    },
    {
      id: 5,
      duration: "6 Months + 1 Free",
      price: "2800.00",
      priceNew: "2500.00",
      private: "4",
      inbody: "6",
      invite: "6"
    },
    {
      id: 6,
      duration: "12 Months + 2 Free",
      price: "4500.00",
      priceNew: "4000.00",
      private: "6",
      inbody: "12",
      invite: "12"
    },
  ]);

  return (
    <>
      {/* <Link className='text-black' to="/manage">manage</Link> */}
      <div className=''>
        <div className='flex justify-center'>
          <div className='sm:max-w-32 lg:justify-center lg:flex'>
            <motion.img 
              animate={{ rotate: 360 }} 
              transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
              className='justify-center m-auto object-cover' 
              src={logo} 
              alt="logo" 
            />
          </div>
        </div>

        <div className='flex justify-center p-4'>
          <div className='w-96 lg:hidden'><Img /></div>
        </div>

        <h2 className='text-xl p-4 text-white font-semibold gymfont'>Special Offers For You :</h2>
        <div className='pt-4 md:flex md:flex-wrap flex-row-reverse gap-4 justify-center'>
          {offers.length > 0 ? (
            offers.map((offer) => {
              const offerClass = offer.id === 1
                ? 'md:w-80 text-white offer mt-7 p-2 rounded-lg flex flex-col bg-blue-700 shadow-md border-b-8 border-white opacity-90'
                : 'md:w-80 text-blue-700 offer mt-7 p-2 rounded-lg flex flex-col bg-white shadow-md border-b-8 border-blue-600 opacity-90';
              return (
                <div key={offer.id} className={offerClass}>
                  <h3 className='p-2 font-bold text-xl gymfont'>
                    <i className="fa-solid fa-dumbbell pr-2"></i> {offer.duration}
                  </h3>
                  <div className='flex justify-between'>
              {offer.price == "0" ? null :     <h3 className='p-2 font-bold text-lg line-through'>    <i className="fa-solid fa-tag pr-1"></i>{offer.price.split('.00')}EGP </h3>}
                    {offer.priceNew == "0" ? null :   <h3 className='p-2 font-bold text-lg'>{offer.priceNew.split('.00')} EGP</h3>}
                  
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
                </div>
              );
            })
          ) : (
            <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i>
          )}
        </div>

        <div className='gap-3'>
          <div>
            <Coaches />
          </div>
          <div>
            <Classes />
          </div>
          <div>
            <CalorieCalculator></CalorieCalculator>
          </div>
        </div>

        <div className='flex mt-9 bottom-0 mb-0 justify-between p-2 lg:justify-center lg:p-4'>
          <h3 className='text-start font-semibold pt-3'>Our Pages <i className="fa-solid fa-arrow-right"></i></h3>
          <div>
            <a className='text-white p-2 lg:p-4' href="https://www.instagram.com/x_ggym?igsh=MWEwdjV0eXk0MnBseQ==">
              <i className="p-1 fa-brands fa-instagram text-2xl text-blue-500 mt-1"></i>
            </a>
          </div>
          <div>
            <a className='text-white p-2 lg:p-4' href="https://wa.link/zyhpxd">
              <i className="p-1 fa-brands fa-whatsapp text-2xl text-blue-500 mt-1"></i>
            </a>
          </div>
          <div>
            <a className='text-white p-2 lg:p-4' href="https://www.facebook.com/TOWN411">
              <i className="p-1 fa-brands fa-facebook text-2xl text-blue-500 mt-1"></i>
            </a>
          </div>
          <div>
            <a className='text-white p-2 lg:p-4' href="https://maps.app.goo.gl/goVtwSXvxrkmpzzPA">
              <i className="fa-solid fa-location-dot text-2xl text-blue-500 mt-1 p-1"></i>
            </a>
          </div>
        </div>
      </div>
      <div>
        <p>Direct by <a href="https://tamyaz.online/" className='text-blue-600'>Tamyaz</a></p>
      </div>
    </>
  );
}
