import React from 'react';

const MapComp = ({ src, alt, children }) => {
  return (
    <div className="flex flex-col items-center gap-5 pt-5">
      <img src={src} alt={alt} className="w-128 h-128 object-cover" />
      <h3 className='text-2xl font-bold text-center text-blue-600'>Details:</h3>
      <div className='text-l text-start font-bold pl-4  '>
        
      {children}
      </div>
    </div>
  );
};

export default MapComp;