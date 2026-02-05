import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Shop() {
  const [activeTab, setActiveTab] = useState("meals");

  // Meals Array
  const meals = [
    { 
      id: 1, 
      name: "Chicken breasts + Rice + Vegetable",
      name_ar: "صدور دجاج + رز + خضار",
      protein: 50, 
      carbs: 57, 
      calories: 560, 
      price: 160 
    },
    { 
      id: 2, 
      name: "Chicken breasts + Rice + Sweet corn",
      name_ar: "صدور دجاج + رز + ذره حلوه",
      protein: 50, 
      carbs: 75, 
      calories: 580, 
      price: 160 
    },
    { 
      id: 3, 
      name: "Steak + Rice + BBQ (Diet)",
      name_ar: "ستيك + رز + باربكيو دايت",
      protein: 44, 
      carbs: 57, 
      calories: 586, 
      price: 250 
    },
    { 
      id: 4, 
      name: "Tuna + Pasta + Vegetables",
      name_ar: "تونة + مكرونة + خضار",
      protein: 42, 
      carbs: 52, 
      calories: 420, 
      price: 140 
    },
  ];

  // Shakes Array
  const shakes = [
    { id: 1, name: "WOLVERINE", price: 60, img: "/store/shakes/1.png", in: ['banana', 'benna butter', 'milk', 'oats', 'honey'] },
    { id: 2, name: "THING", price: 40, img: "/store/shakes/2.png", in: ['orange', 'Lemon', 'honey'] },
    { id: 3, name: "HULK", price: 100, img: "/store/shakes/3.png", in: ['Avocado', 'Dates', 'Honey', 'milk', 'oats'] },
    { id: 4, name: "CAT WOMAN", price: 70, img: "/store/shakes/4.png", in: ['Dark chocolate', 'Honey', 'milk', 'oats'] },
    { id: 5, name: "SCARLET WITCH", price: 60, img: "/store/shakes/5.png", in: ['watermelon', 'Honey', 'milk', 'oats'] },
    { id: 6, name: "X POWER", price: 75, img: "/store/shakes/6.png", in: ['Ginger', 'beet', 'milk', 'oats'] },
  ];

  // Whatsapp Order Function
  const orderNow = (itemName) => {
    const phone = "201028518754";
    const message = `Hello, I want to order: ${itemName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

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

  const tabVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    active: { 
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 1)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(37, 99, 235, 1)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  // Function to render items based on tab
  const renderItems = () => {
    if (activeTab === "meals") {
      return meals.map((meal, index) => (
        <motion.div 
          key={meal.id} 
          className="p-4 border rounded shadow glass flex flex-col justify-between h-full"
          variants={itemVariants}
          whileHover="hover"
          custom={index}
        >
          <motion.h3 
            className="font-bold text-xl mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            {meal.name}
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <p>Protein: {meal.protein}g</p>
            <p>Carbs: {meal.carbs}g</p>
            <p>Calories: {meal.calories} kcal</p>
            <p className="mb-3">Price: {meal.price} EGP</p>
          </motion.div>
          
          <motion.button
            onClick={() => orderNow(meal.name)}
            className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Order Now
          </motion.button>
        </motion.div>
      ));
    }

    if (activeTab === "shakes") {
      return shakes.map((shake, index) => (
        <motion.div 
          key={shake.id} 
          className="p-4 border rounded shadow glass flex flex-col justify-between h-full"
          variants={itemVariants}
          whileHover="hover"
          custom={index}
        >
          <motion.img 
            src={shake.img} 
            alt={shake.name} 
            className="w-32 h-32 mx-auto object-cover rounded mb-3"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
          />
          
          <motion.h3 
            className="font-bold text-xl mb-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            {shake.name}
          </motion.h3>

          <motion.div 
            className="text-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <p className="font-semibold">Ingredients:</p>
            <ul className="text-sm text-white flex text-center justify-center">
              {shake.in.map((ingredient, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  {ingredient}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.p 
            className="mb-3 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
          >
            Price: {shake.price} EGP
          </motion.p>

          <motion.button
            onClick={() => orderNow(shake.name)}
            className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Order Now
          </motion.button>
        </motion.div>
      ));
    }
  };

  return (
    <motion.div 
      className="p-5 mt-40"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tabs */}
      <motion.div 
        className="flex gap-3 mb-5 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => setActiveTab("meals")}
          className={`px-4 py-2 rounded ${activeTab === "meals" ? "bg-blue-500 text-white" : "glass"}`}
          variants={tabVariants}
          animate={activeTab === "meals" ? "active" : "inactive"}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          Meals
        </motion.button>
        
        <motion.button
          onClick={() => setActiveTab("shakes")}
          className={`px-4 py-2 rounded ${activeTab === "shakes" ? "bg-blue-500 text-white" : "glass"}`}
          variants={tabVariants}
          animate={activeTab === "shakes" ? "active" : "inactive"}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          Shakes
        </motion.button>
      </motion.div>

      {/* Items */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {renderItems()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}