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
