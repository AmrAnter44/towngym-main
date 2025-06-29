import React from 'react';

export default function Footer() {
  return (
    <>

      <div className="flex m-0 p-0 bottom-0 mb-0 justify-between pt-2 lg:justify-center lg:p-4">
        <h3 className="text-start font-semibold  ">

        </h3>
      </div>
      <div className="flex justify-center gap-4 ">
        <a className="text-white p-2 lg:p-4" href="https://www.instagram.com/x_ggym?igsh=MWEwdjV0eXk0MnBseQ==">
          <i className="p-1 fa-brands fa-instagram text-2xl text-blue-500 mt-1"></i>
        </a>
        <a className="text-white p-2 lg:p-4" href="https://wa.link/zyhpxd">
          <i className="p-1 fa-brands fa-whatsapp text-2xl text-blue-500 mt-1"></i>
        </a>
        <a className="text-white p-2 lg:p-4" href="https://www.facebook.com/TOWN411">
          <i className="p-1 fa-brands fa-facebook text-2xl text-blue-500 mt-1"></i>
        </a>
        <a className="text-white p-2 lg:p-4" href="https://maps.app.goo.gl/goVtwSXvxrkmpzzPA">
          <i className="fa-solid fa-location-dot text-2xl text-blue-500 mt-1 p-1"></i>
        </a>
      </div>
      <div className=" text-center ">
        <p>
          Direct by <a href="https://tamyaz.online/" className="text-blue-600">Tamyaz</a>
        </p>
      </div>

    </>
  );
}

