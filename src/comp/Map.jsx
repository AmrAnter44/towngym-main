import React, { useState } from "react";
import { motion } from "framer-motion";
import gymMap from "../../public/map.png";
import { Link } from "react-router-dom";

function Map() {
  const [hoveredArea, setHoveredArea] = useState(null);

  const areas = [
    { id: "men", name: "Men's Area", style: "top-0 left-0 w-[50%] h-[12.5%]", route: "/men" },
    { id: "ladies", name: "Ladies Area", style: "top-[12.5%] left-0 w-[50%] h-[12.5%]", route: "/ladies" },
    { id: "spa", name: "SPA", style: "top-[25%] left-0 w-[50%] h-[12.5%]", route: "/spa" },
    { id: "bar", name: "Juice Bar", style: "top-[36.5%] left-0 w-[50%] h-[9%]", route: "/bar" },
    { id: "weight", name: "Weight Training", style: "top-[45%] left-0 w-[50%] h-[26%]", route: "/weight" },
    { id: "fitness", name: "Fitness Area", style: "bottom-0 left-0 w-[70%] h-[28%]", route: "/fitness" },
    { id: "cables", name: "Cable Machines", style: "top-0 left-[50%] w-[20%] h-[72%]", route: "/caples" },
    { id: "machines", name: "Machines", style: "top-[44.5%] right-0 w-[30%] h-[30%]", route: "/machines" },
    { id: "cardio", name: "Cardio", style: "top-0 right-0 w-[28.3%] h-[45%]", route: "/cardio" },
    { id: "leg", name: "Leg Training", style: "bottom-0 right-0 w-[29%] h-[25%]", route: "/leg" }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mapContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const mapImageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.5
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { duration: 0.3 }
    }
  };

  const areaVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      backgroundColor: "rgba(59, 130, 246, 0.3)",
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="text-2xl font-bold text-center mt-40"
        variants={titleVariants}
      >
        Tap any section on the map to discover more details!
      </motion.h3>

      <motion.div 
        className="relative w-full max-w-[768px] mx-auto p-6 m-12"
        variants={mapContainerVariants}
      >
        {/* الخريطة */}
        <motion.img 
          src={gymMap} 
          alt="Gym Map" 
          className="w-full opacity-80" 
          variants={mapImageVariants}
        />

        {/* اللوجو فوق الخريطة */}
        <motion.img
          src="./maplogo.png"
          alt="Map Logo"
          className="absolute center top-24 left-1/2 transform -translate-x-1/2 -z-20"
          variants={logoVariants}
          whileHover="hover"
        />

        {/* المناطق التفاعلية */}
        {areas.map((area, index) => (
          <motion.div
            key={area.id}
            className={`absolute ${area.style} z-10 cursor-pointer`}
            variants={areaVariants}
            custom={index}
            whileHover="hover"
            onHoverStart={() => setHoveredArea(area)}
            onHoverEnd={() => setHoveredArea(null)}
          >
            <Link
              to={area.route}
              className="w-full h-full block"
            >
              {/* Overlay للتفاعل البصري */}
              <motion.div
                className="w-full h-full rounded-lg border-2 border-transparent"
                whileHover={{
                  borderColor: "rgba(59, 130, 246, 0.8)",
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        ))}

        {/* Tooltip عند الـ hover */}
        {hoveredArea && (
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg z-20 pointer-events-none"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p className="font-bold text-center">{hoveredArea.name}</p>
            <motion.div
              className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          </motion.div>
        )}

        {/* تأثير Pulse على المناطق */}
        {areas.map((area, index) => (
          <motion.div
            key={`pulse-${area.id}`}
            className={`absolute ${area.style} z-5 pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-blue-400 rounded-lg" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Map;