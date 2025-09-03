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
        Direct by{" "}
        <a href="https://tamyaz.online/" className="text-blue-600">
          Tamyaz
        </a>
      </p>
    </>
  );
}
