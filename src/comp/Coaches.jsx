import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trans from './Trans';

export default function Coaches() {
  const [coaches, setCoaches] = useState([
    { id: 1, name: "Mostafa", img: "/coaches/mostafa.jpg", title: "Leader", link: "https://www.instagram.com/mustafa.saeid1?igsh=dmMxc2QxMjV2cnpj" },
    { id: 2, name: "Zima", img: "/coaches/zema.jpg", title: "Fitness Manager", link: "https://www.instagram.com/c.zemaa?igsh=eXpoNTJvMHVlaGt4&utm_source=qr" },
    { id: 3, name: "Aimlia", img: "/coaches/aimlia.jpg", title: " Coach", link: "https://www.instagram.com/coach_amelia_abualyzid111?igsh=N3R6Z3M3NW1ldmt2" },
    { id: 4, name: "Haitham", img: "/coaches/haitham.jpg", title: " Coach", link: "https://www.instagram.com/m_haithamm?igsh=MW0yYmh6Z2NxODQxZA==" },
    { id: 5, name: "Saif", img: "/coaches/saif.jpg", title: " Coach", link: "https://www.instagram.com/coach.radwann?igsh=OHdjcmtsYWlmb3c0" },
    { id: 6, name: "Amr", img: "/coaches/amr.jpg", title: " Trainer", link: "https://www.instagram.com/amr_tamer_22/" },
    { id: 7, name: "Ali", img: "/coaches/ali.jpg", title: " Coach", link: "https://www.instagram.com/_aliiayman_?igsh=OHlyMjdlazB2cGZh" },
    { id: 8, name: "Bogy", img: "/coaches/bogy.jpg", title: " Coach", link: "https://www.instagram.com/abdo_boogie?igsh=d3poMmRka3luNnpq" },
    { id: 9, name: "Mohamed", img: "/coaches/mohamed.jpg", title: "Nutritionist", link: "" },
  ]);

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
                            
                            {/* Coach Info - في الأعلى */}
                            <div className="mb-4">
                              <h3 className="text-lg md:text-xl font-bold text-white gymfont mb-1 group-hover:text-blue-400 transition-colors">
                                {coach.name}
                              </h3>
                              <p className="text-blue-400 text-sm md:text-base font-semibold">
                                {coach.title}
                              </p>
                            </div>

                            {/* Coach Image - في الوسط */}
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
                        
                        {/* Social Icon - خارج الديف */}

                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <i className="text-2xl text-blue-400 fa-solid fa-spinner fa-spin" />
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