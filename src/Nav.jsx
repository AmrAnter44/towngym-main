import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-2xl' : 'bg-black/40 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src="/assets/bigLogo.png"
              alt="X-GYM Logo"
              className=" w-28 object-contain p-0 m-0"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { path: "/", label: "Home", icon: "fa-home" },
              { path: "/classes", label: "Classes", icon: "fa-dumbbell" },
              { path: "/map", label: "Map", icon: "fa-map-marked-alt" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`fas ${item.icon} mr-2`}></i>
                  {item.label}
                </motion.div>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-nav overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {[
                { path: "/", label: "Home", icon: "fa-home" },
                { path: "/classes", label: "Classes", icon: "fa-dumbbell" },
                { path: "/map", label: "Map", icon: "fa-map-marked-alt" },
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <i className={`fas ${item.icon} text-lg`}></i>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
