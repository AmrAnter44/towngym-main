import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const navVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
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

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      backgroundColor: "rgba(75, 85, 99, 0.8)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const cartIconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 10,
      color: "#3b82f6",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-full z-50"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between glass-nav text-white lg:m-2 mb-5">
          
          <div className="lg:ml-4 flex justify-between w-full lg:w-auto px-4 lg:px-0">
            <Link to={"/"}>
              <motion.img 
                src="/assets/bigLogo.png" 
                alt="logo" 
                className="w-28" 
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              />
            </Link>

            <div className="flex items-center lg:hidden">
              <Link to={"/shop"}>
                <motion.i 
                  className="fa-solid fa-cart-shopping text-2xl mr-4 mb-2 mt-3"
                  variants={cartIconVariants}
                  initial="rest"
                  whileHover="hover"
                />
              </Link>

              <motion.button
                className="text-white text-3xl"
                onClick={() => setOpen(!open)}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {open ? "✕" : "☰"}
              </motion.button>
            </div>
          </div>

          {/* استخدام الكود الأصلي بدون تعديل للـ desktop */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out flex-col lg:flex lg:flex-row justify-between items-center font-bold text-center w-full lg:w-auto ${
              open
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
            }`}
          >
            <Link
              to="/"
              className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Home
              </motion.span>
            </Link>

            <Link
              to="/classes"
              className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Classes
              </motion.span>
            </Link>

            <Link
              to="/map"
              className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Map
              </motion.span>
            </Link>

            <Link
              to={"/shop"}
              className="hidden lg:block ml-4"
              onClick={() => setOpen(false)}
            >
              <motion.i 
                className="fa-solid fa-cart-shopping text-2xl"
                variants={cartIconVariants}
                initial="rest"
                whileHover="hover"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}