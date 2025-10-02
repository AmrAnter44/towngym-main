import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trans from '../comp/Trans';
import { supabase } from '../lib/supabaseClient';

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data) {
      setCoaches(data);
    }
    setLoading(false);
  };
  console.log(coaches);
  

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    threshold: 0.1,
    margin: "-30px 0px"
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    pauseOnHover: true,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <i className="text-3xl text-blue-700 fa-solid fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      className="py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-8 items-center justify-center">
          
          {/* قسم الكوتشيز */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={sectionVariants}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white gymfont mb-2">
                Our <span className="text-blue-400">Coaches</span>
              </h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-sm mx-auto">
              <div className="glass rounded-2xl p-4">
                <Slider {...settings}>
                  {coaches.length > 0 ? (
                    coaches.map((coach) => (
                      <div key={coach.id} className="focus:outline-none">
                        <div className="block group cursor-pointer">
                          <div className="bg-black rounded-xl p-4 text-center">
                            
                            <div className="mb-4">
                              <h3 className="text-lg md:text-xl font-bold text-white gymfont mb-1 group-hover:text-blue-400 transition-colors">
                                {coach.name}
                              </h3>
                              <p className="text-blue-400 text-sm md:text-base font-semibold">
                                {coach.title}
                              </p>
                            </div>

                            <div className="relative mb-4">
                              <div className="h-42 w-36 mx-auto relative overflow-hidden">
                                <img
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  src={coach.img}
                                  alt={`Coach ${coach.name}`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No coaches available</p>
                    </div>
                  )}
                </Slider>
              </div>
            </div>
          </motion.div>

          {/* قسم التحولات */}
          <motion.div 
            variants={sectionVariants}
            className="w-full lg:w-1/2"
          >
            <Trans />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}