import React from 'react';

export default function Footer() {
  return (
    <footer className=" text-white p-4">
      <div className="flex flex-row justify-center gap-4">
        <a href="https://www.instagram.com/x_ggym?igsh=MWEwdjV0eXk0MnBseQ==" className="text-white p-2 lg:p-4">
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
      <p className="text-center">
        Direct by <a href="https://tamyaz.online/" className="text-blue-600">Tamyaz</a>
      </p>
    </footer>
  );
}

