import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Trans() {
  const transRef = useRef(null);
  const isInView = useInView(transRef, { 
    once: true, 
    threshold: 0.2,
    margin: "-30px 0px"
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  const images = [
    "/trans/1.png",
    "/trans/2.png",
    "/trans/3.png",
    "/trans/4.png",
    "/trans/5.png",
    "/trans/6.png",
    "/trans/7.png",
    "/trans/8.png",
    "/trans/9.png",
    "/trans/10.png",
  ];

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
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={transRef}
      className="w-full"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* العنوان */}
      <motion.div 
        className="text-center mb-6"
        variants={itemVariants}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white gymfont mb-2">
          <span className="text-blue-400">Transformations</span>
        </h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* السلايدر */}
      <motion.div 
        className="max-w-sm mx-auto mb-6"
        variants={itemVariants}
      >
        <div className="glass rounded-2xl p-4">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index} className="focus:outline-none">
                <div className="relative group">
                  <div className="bg-black/50 rounded-xl p-2">
                    <img
                      src={img}
                      alt={`transformation-${index + 1}`}
                      className="w-38  h-62 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

      {/* المعلومات */}
      <motion.div 
        className="grid grid-cols-2 gap-3 max-w-sm mx-auto"
        variants={itemVariants}
      >

      </motion.div>
    </motion.div>
  );
}