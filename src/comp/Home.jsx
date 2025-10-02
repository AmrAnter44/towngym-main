import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import logo from '../../public/assets/logo.png';
import Coaches from './Coaches';
import { Link, useNavigate } from 'react-router-dom';
import Nav2 from '../Nav2';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const navigate = useNavigate(); 
  const offersRef = useRef(null);
  const isOffersInView = useInView(offersRef, { 
    once: true, 
    threshold: 0.2,
    margin: "-100px 0px"
  }); 
  
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('offers')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) {
        console.error('Error fetching offers:', fetchError);
        setError('Failed to load offers');
        return;
      }

      console.log('Offers loaded successfully:', data);
      setOffers(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  function handlebook(offer) {
    const phone = "201028188900";  
    const message = `Hello, I would like to book the ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const offersContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const offerCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      <Nav2 />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 
          className='text-xl pt-9 text-white font-semibold gymfont'
          variants={itemVariants}
        >
          VIP Body Package
        </motion.h2>

        <motion.div 
          className="flex flex-wrap flex-row-reverse gap-4 justify-center pt-3 m-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
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
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.h2 
            className='text-3xl pt-9 text-white font-bold gymfont'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Our Offers
          </motion.h2>

          <motion.div
            ref={offersRef}
            className='md:flex md:flex-wrap flex-row-reverse gap-4 justify-center pt-3 m-4'
            variants={offersContainerVariants}
            initial="hidden"
            animate={isOffersInView ? "visible" : "hidden"}
          >
            {offers.length > 0 ? (
              offers.map((offer, index) => (
                <motion.div 
                  key={offer.id} 
                  className="glass m-3"
                  variants={offerCardVariants}
                  custom={index}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.h3 
                    className='p-1 font-bold text-xl gymfont text-blue-600'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <i className="fa-solid fa-dumbbell pr-2"></i> {offer.duration}
                  </motion.h3>

                  <motion.div 
                    className='flex justify-between'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
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


                  </motion.div>

                  <motion.ul 
                    className='p-1 text-start text-white-700'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
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
                  </motion.ul>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => handlebook(offer)}
                      className='px-4 text-lg py-1 bg-blue-700 text-white rounded-lg'
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      book now
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.i 
                className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>

          <motion.div 
            className="marquee"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            <p className="ml-11">
              <span># INHALLE PASSION</span> &nbsp; &nbsp; 
              <span># INHALLE PASSION</span> &nbsp; &nbsp; 
              <span># INHALLE PASSION</span> &nbsp; &nbsp; 
              <span># INHALLE PASSION</span> &nbsp; &nbsp;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Coaches />
          </motion.div>
        </motion.div>
<div className='flex justify-evenly'>
          <motion.div 
          className=" w-1/3 rounded-xl p-3 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <i className="fas fa-clock text-xl text-blue-400 mb-1"></i>
          <p className="text-white font-bold text-sm">24/7</p>
          <p className="text-gray-300 text-xs">Open</p>
        </motion.div>

        <motion.div 
          className=" w-1/3 rounded-xl p-3 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <i className="fas fa-wifi text-xl text-blue-400 mb-1"></i>
          <p className="text-white font-bold text-sm">FREE</p>
          <p className="text-gray-300 text-xs">Wi-Fi</p>
        </motion.div>
</div>
      </motion.div>
    </>
  );
}