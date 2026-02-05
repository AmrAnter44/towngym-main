import React from 'react'
import MapComp from '../Func/MapComp'

export default function Machines() {
  return (
        <MapComp src={[ '/assets/map/machines1.jpg','/assets/map/machines2.jpg','/assets/map/machines3.jpg']}   alt="#">
  <ul className='list-disc '>
    
<li>3 Seated Cable Row Machines (Multi-Grip)</li>
<li>Lat Pulldown Machine (Multi-Grip)</li>
<li>T-Bar Row Machine</li>
<li>Pec Deck / Fly Machine</li>
<li>Seated Horse Bench</li>
<li>Back Extension Machine</li>
<li>Chest Press Machine (Dual Grip)</li>
<li>Shoulder Press Machine (Dual Grip)</li>

  </ul>
</MapComp>
  )
}
