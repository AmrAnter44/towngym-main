import React, { useState } from "react";

export default function Gold() {
  // 📌 العروض (Offers)
  const [offers] = useState([
    {
      id: 1,
      duration: "1 Month",
      days: "20",
      price: "0",
      save: "6600",
      private: "20",
      invite: "10",
      Meals: "40",
      Shakes: "20",
      water: "20",
      boxing: false,
      gifts: false,
      Freezing: "2 Weeks",
      expiration: "2 Months",
    },
    {
      id: 2,
      duration: "3 Months",
      days: "60",
      price: "0",
      save: "14000",
      private: "60",
      invite: "20",
      Meals: "120",
      Shakes: "60",
      water: "60",
      boxing: "12",
      gifts: true,
      Freezing: "Unlimited",
      expiration: "6 Months",
    },
    {
      id: 3,
      duration: "6 Months",
      days: "120",
      price: "0",
      save: "35000",
      private: "120",
      invite: "30",
      Meals: "240",
      Shakes: "120",
      water: "120",
      boxing: "24",
      gifts: true,
      Freezing: "Unlimited",
      expiration: "12 Months",
    },
  ]);

  const [selectedId, setSelectedId] = useState(1); // 📌 الافتراضي: شهر واحد
  const [showPopup, setShowPopup] = useState(false);

  // 📌 دالة الحجز
  const handlebook = (offer) => {
    const phone = "201028188900";
    const message = `I would like to book the Gold ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <h2 className="text-xl pt-9 font-semibold gymfont gold-text text-center">
        Golden X
      </h2>

      {/* 📱 أزرار اختيار الباقة - للموبايل فقط */}
      <div className="flex flex-row-reverse gap-4 justify-center pt-5 m-4 lg:hidden">
        {offers.map((offer) => (
          <button
            key={offer.id}
            onClick={() => setSelectedId(offer.id)}
            className={`group relative gold-text glass-button font-bold px-6 py-2 m-2 rounded-full flex flex-row justify-center items-center overflow-hidden transition-all duration-500
              ${
                selectedId === offer.id
                  ? "bg-yellow-500 text-white shadow-lg scale-110"
                  : "hover:bg-yellow-400 hover:text-white"
              }
            `}
          >
            <span className="m-auto">{offer.duration.split(" ")[0]}</span>
            <img
              src="./goldlogo.png"
              alt=""
              className={`ml-2 w-10 transform transition-all duration-500 
                ${
                  selectedId === offer.id
                    ? "-rotate-90 opacity-0 translate-x-10"
                    : "group-hover:-rotate-90 group-hover:translate-x-10 group-hover:opacity-0"
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* 📱 عرض الباقة المختارة فقط - للموبايل */}
      <div className="block lg:hidden">
        {offers
          .filter((offer) => offer.id === selectedId)
          .map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onBook={handlebook}
              onGift={() => setShowPopup(true)}
            />
          ))}
      </div>

      {/* 💻 عرض كل الباقات - للديسكتوب */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center m-6">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onBook={handlebook}
            onGift={() => setShowPopup(true)}
          />
        ))}
      </div>

      {/* 🎁 Popup المربع الذهبي */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black p-4 rounded-2xl shadow-lg max-w-sm w-full">
            <button
              className="absolute -top-8 right-2 text-white text-2xl font-bold"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>

            <img
              src="./box.png"
              alt="Mystery Box"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}

// ✅ Component خاص بالكارد عشان يبقى موحد بين الموبايل والديسكتوب
function OfferCard({ offer, onBook, onGift }) {
  return (
    <div className="m-4 text-start max-w-md bg-gray-900/40 backdrop-blur-md rounded-2xl p-5 shadow-lg flex flex-col">
      <div className="p-2 font-bold text-lg gymfont gold-text flex flex-row-reverse justify-between items-center">
        <img src="./goldlogo.png" alt="" className="ml-6 w-10" />
        <div>
          {offer.duration}{" "}
          <span className="text-xs text-white font-normal w-8">
            {offer.days} days
          </span>
        </div>
      </div>

      <ul className="p-2 text-white space-y-1">
        <li>- {offer.private} Sessions Personal Training</li>
        <li>- {offer.Meals} Meals</li>
        <li>- {offer.Shakes} Protein Shakes</li>
        <li>- {offer.invite} Sessions Invitations</li>
        <li>- {offer.water} Bottles of Water</li>
        <li>- Freezing: {offer.Freezing}</li>
        <li>- Expiration: {offer.expiration}</li>
        <li>- ALL Classes</li>
        <li>- SPA</li>
        {offer.boxing && <li>- Free {offer.boxing} Boxing Sessions</li>}
        {offer.gifts && <li>- Free Coffee</li>}
        <li
          className="gold-text text-lg cursor-pointer hover:underline"
          onClick={onGift}
        >
          <i className="fa-solid fa-gift gold-text ml-2"></i> Open Golden Box
        </li>
      </ul>

      <ul className="p-2 text-xl gold-text space-y-1 font-bold">
        <li>You Will Save {offer.save} LE</li>
      </ul>

      <div className="justify-center mx-auto text-center mt-auto">
        <button
          onClick={() => onBook(offer)}
          className="px-6 py-2 text-lg bg-yellow-500 text-black rounded-full font-bold shadow-md hover:bg-yellow-600 transition"
        >
          Book now
        </button>
      </div>
    </div>
  );
}
