import React from 'react';
import MapComp from '../Func/MapComp';

export default function Cables() {
  return (
    <MapComp src={'/assets/map/cables.jpg'} alt="#">
      <ul className="list-disc">
        <li>Wide-Grip Cable Attachment</li>
        <li>Close-Grip Cable Attachment</li>
      </ul>
    </MapComp>
  );
}

