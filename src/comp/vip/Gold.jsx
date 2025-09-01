import React, { useState } from 'react';

export default function Gold() {
  const [offers] = useState([
        {
      id: 2,
      duration: "3 Month",
      price: "0",
      save: "14000",
      private: "60",
      invite: "20",
      Meals : "120",
      Shakes : "60",
      water: "60",
      boxing: "12",
      gifts: true

    },
    {
      id: 1,
      duration: "1 Month",
      price: "0",
      save: "6600",
      private: "20",
      invite: "10",
      Meals : "40",
      Shakes : "20",
      water: "20",
      boxing: false,
gifts: false
    },

    {
      id: 3,
      duration: "6 Month",
      price: "0",
      save: "35000",
      private: "120",
      invite: "30",
      Meals : "240",
      Shakes : "120",
      water: "120",
      boxing: "24",
      gifts: true
    },
  ]);

  const [selectedId, setSelectedId] = useState(1);

  const handlebook = (offer) => {
    const phone = "201028188900";  
    const message = `I would to book the Gold ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  };

  return (
    <>
      <h2 className="text-xl pt-9 font-semibold gymfont gold-text text-center">Golden X</h2>

      {/* Buttons */}
      <div className="flex flex-row-reverse gap-4 justify-center pt-5 m-4">
        {offers.map((offer) => (
          <button
            key={offer.id}
            onClick={() => setSelectedId(offer.id)}
            className={`group relative gold-text glass-button font-bold px-6 py-2 m-2 rounded-full flex flex-row justify-center items-center overflow-hidden transition-all duration-500
              ${selectedId === offer.id ? "bg-yellow-500 text-white shadow-lg scale-110" : "hover:bg-yellow-400 hover:text-white"}
            `}
          >
            <span className="m-auto">{offer.duration.split(" ")[0]}</span>
            <img
              src="./goldlogo.png"
              alt=""
              className={`ml-2 w-10 transform transition-all duration-500 
                ${selectedId === offer.id ? "-rotate-90 opacity-0 translate-x-10" : "group-hover:-rotate-90 group-hover:translate-x-10 group-hover:opacity-0"}
              `}
            />
          </button>
        ))}
      </div>

      {/* Offer Section */}
      {offers
        .filter((offer) => offer.id === selectedId)
        .map((offer) => (
          <div key={offer.id} className="m-4 text-start max-w-md  bg-gray-900/40 backdrop-blur-md rounded-2xl p-5 shadow-lg">
            
            {/* Title */}
            <div className="p-2 font-bold text-xl gymfont gold-text flex flex-row-reverse justify-between items-center">
              <img src="./goldlogo.png" alt="" className="ml-6 w-10" />
              <div>{offer.duration}</div>
            </div>

            {/* Features */}
            <ul className="p-2 text-white space-y-1">
              <li>- {offer.private} Sessions Personal Training</li>
              <li>- {offer.Meals} Meals</li>
              <li>- {offer.Shakes} Protein Shakes</li>
              <li>- {offer.invite} Sessions Invitations</li>
              <li>- {offer.water} Bottles of Water</li>
              <li>- ALL Classes</li>
              <li>- SPA</li>
             {offer.boxing && <li>- {offer.boxing} Boxing</li>}
              {offer.gifts && <li>- Free Coffe</li>}
             <li className='gold-text texl-lg'>- <i class="fa-solid fa-gift gold-text"></i> Mystery Box</li>
            </ul>
            <div>
              <ul className="p-2 text-xl gold-text space-y-1 font-bold">
                <li>You Will Save {offer.save} .LE</li>
              </ul>
            </div>

            {/* Book button */}
            <div className="justify-center mx-auto text-center">
              <button
                onClick={() => handlebook(offer)}
                className="px-6 py-2 text-lg bg-yellow-500 text-black rounded-full font-bold shadow-md hover:bg-yellow-600 transition"
              >
                Book now
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
