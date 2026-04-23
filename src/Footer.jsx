import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="text-white flex flex-row justify-between bg-black p-0 m-0 mt-auto">
        <div className="flex flex-row">
          <a
            href="https://www.instagram.com/x_ggym?igsh=MWEwdjV0eXk0MnBseQ=="
            className="text-white p-2 lg:p-4"
          >
            <i className="p-1 fa-brands fa-instagram text-2xl text-blue-500 mt-1"></i>
          </a>
          <a href="https://wa.link/zyhpxd" className="text-white p-2 lg:p-4">
            <i className="p-1 fa-brands fa-whatsapp text-2xl text-blue-500 mt-1"></i>
          </a>
          <a href="https://www.facebook.com/TOWN411" className="text-white p-2 lg:p-4">
            <i className="p-1 fa-brands fa-facebook text-2xl text-blue-500 mt-1"></i>
          </a>
          <a href="https://maps.app.goo.gl/goVtwSXvxrkmpzzPA" className="text-white p-2 lg:p-4">
            <i className="fa-solid fa-location-dot text-2xl text-blue-500 mt-1 p-1"></i>
          </a>
        </div>
        <div>
          <img src="/pay.png" alt="" className="w-44 mr-8 mt-4" />
        </div>
      </footer>

      <div className="bg-black text-white text-center py-6 px-4 border-t border-gray-800">
        <h3 className="text-lg lg:text-xl font-semibold mb-2">
          Our Gym App is now available on Android & iPhone
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Download the FitBoost app and take your training to the next level
        </p>
        <div className="flex flex-row justify-center items-center gap-4 flex-wrap">
          <a
            href="https://play.google.com/store/apps/details?id=com.fitboost.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors px-5 py-2 rounded-lg text-white font-medium"
          >
            <i className="fa-brands fa-google-play text-xl"></i>
            <span>Android</span>
          </a>
          <a
            href="https://apps.apple.com/eg/app/fit-boost/id6760668273"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-lg text-white font-medium"
          >
            <i className="fa-brands fa-apple text-xl"></i>
            <span>iPhone</span>
          </a>
        </div>
      </div>

      <p className="text-center bg-black">
          Powered by{" "}
        <a href="https://fitboost.website/" className="text-blue-600">
         FitBoost           {" "}© {new Date().getFullYear()}
        </a>
      </p>




<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55268.9852979517!2d31.184628664368432!3d30.027917688996002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847fba96bcafb%3A0x470868e04054808c!2sX-GYM!5e0!3m2!1sen!2seg!4v1757829847394!5m2!1sen!2seg" 
  width="100%" 
  height="450" 
  style={{ border: 0 }} 
  allowFullScreen="" 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
    </>
  );
}
