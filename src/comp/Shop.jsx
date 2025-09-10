import React, { useState } from "react";

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
    { id: 1, name: "WOLVERINE",  price: 60, img: "/store/shakes/1.png" ,in:['banana','benna butter' ,'milk' , 'oats' , 'honey'] },
    { id: 2, name: "THING", price: 40, img: "/store/shakes/2.png" ,in:['orange','Lemon','honey'] },
    { id: 3, name: "HULK",  price: 100, img: "/store/shakes/3.png" ,in:['Avocado','Dates','Honey' ,'milk' , 'oats'] },
    { id: 4, name: "CAT WOMAN", price: 70, img: "/store/shakes/4.png" , in:['Dark chocolate ','Honey' ,'milk' , 'oats'] },
    { id: 5, name: "SCARLET WITCH",  price: 60, img: "/store/shakes/5.png" ,in:['watermelon ','Honey' ,'milk' , 'oats'] },
    { id: 6, name: "X POWER", price: 75, img: "/store/shakes/6.png" , in:['Ginger ','beet' ,'milk' , 'oats']  },
  ];

  // Accessories Array
  const accessories = [
    { id: 1, name: "Shaker Bottle", img: "/images/shaker.png", price: 150 },
    { id: 2, name: "Gym Gloves", img: "/images/gloves.jpg", price: 250 },
    { id: 3, name: "Resistance Band", img: "/images/band.jpg", price: 180 },
  ];

  // Whatsapp Order Function
  const orderNow = (itemName) => {
    const phone = "201028518754"; // رقمك بصيغة دولية
    const message = `Hello, I want to order: ${itemName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Function to render items based on tab
  const renderItems = () => {
    if (activeTab === "meals") {
      return meals.map((meal) => (
        <div key={meal.id} className="p-4 border rounded shadow glass flex flex-col justify-between h-full">
          <h3 className="font-bold text-xl mb-2">{meal.name}</h3>
          <div>
            <p>Protein: {meal.protein}g</p>
            <p>Carbs: {meal.carbs}g</p>
            <p>Calories: {meal.calories} kcal</p>
            <p className="mb-3">Price: {meal.price} EGP</p>
          </div>
          <button
            onClick={() => orderNow(meal.name)}
            className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Order Now
          </button>
        </div>
      ));
    }

if (activeTab === "shakes") {
  return shakes.map((shake) => (
    <div key={shake.id} className="p-4 border rounded shadow glass flex flex-col justify-between h-full">
      <img src={shake.img} alt={shake.name} className="w-32 h-32 mx-auto object-cover rounded mb-3" />
      <h3 className="font-bold text-xl mb-2 text-center">{shake.name}</h3>

      <div className="text-center mb-3">
        <p className="font-semibold">Ingredients:</p>
        <ul className="text-sm text-white flex text-center justify-center">
          {shake.in.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <p className="mb-3 text-center font-medium">Price: {shake.price} EGP</p>

      <button
        onClick={() => orderNow(shake.name)}
        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Order Now
      </button>
    </div>
  ));
}

    if (activeTab === "accessories") {
      return accessories.map((acc) => (
        <div key={acc.id} className="p-4 border rounded shadow glass flex flex-col justify-between h-full">
          <img src={acc.img} alt={acc.name} className="w-24 h-24 mx-auto object-cover rounded mb-3" />
          <h3 className="font-bold text-xl mb-2 text-center">{acc.name}</h3>
          <p className="mb-3 text-center">Price: {acc.price} EGP</p>
          <button
            onClick={() => orderNow(acc.name)}
            className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Order Now
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="p-5 mt-40">
      {/* Tabs */}
      <div className="flex gap-3 mb-5 justify-center">
        <button
          onClick={() => setActiveTab("meals")}
          className={`px-4 py-2 rounded ${activeTab === "meals" ? "bg-blue-500 text-white" : "glass"}`}
        >
          Meals
        </button>
        <button
          onClick={() => setActiveTab("shakes")}
          className={`px-4 py-2 rounded ${activeTab === "shakes" ? "bg-blue-500 text-white" : "glass"}`}
        >
          Shakes
        </button>
        {/* <button
          onClick={() => setActiveTab("accessories")}
          className={`px-4 py-2 rounded ${activeTab === "accessories" ? "bg-blue-500 text-white" : "glass"}`}
        >
          Accessories
        </button> */}
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {renderItems()}
      </div>
    </div>
  );
}
