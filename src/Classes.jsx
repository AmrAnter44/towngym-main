import React, { useState } from 'react';

export default function Home() {
  const [classes, setClasses] = useState([
    { id: 1, className: "Functional Training", day: "Saturday", time1: "8:00",coachName:"Zima",mix:"Mix" },
    { id: 2, className: "Aerobics", day: "Sunday", time1: "8:00",coachName:"Aimlia",mix:"Ladies" },
    { id: 3, className: "Flexibility", day: "Sunday", time1: "9:00",coachName:"Aimlia",mix:"Ladies" },
    { id: 4, className: "Superman Kids", day: "Monday", time1: "6:00",coachName:"Zima",mix:"Mix",Mem:true  },
    { id: 5, className: "Boxing", day: "Monday", time1: "7:00",coachName:"Saif",mix:"Mix" ,Mem:true },
    { id: 6, className: "Circuit", day: "Monday", time1: "8:00",coachName:"Menna",mix:"Ladies" },
    { id: 7, className: "Zumba", day: "Tuesday", time1: "8:00",coachName:"Menna",mix:"Ladies" },
    { id: 8, className: "Yoga", day: "Tuesday", time1: "9:00",coachName:"Aimlia",mix:"Mix" },
    { id: 9, className: "Core", day: "Wednesday", time1: "8:00",coachName:"Zima",mix:"Mix" },
    { id: 10, className: "Superman Kids", day: "Thursday", time1: "6:00",coachName:"Zima",mix:"Mix",Mem:true  },
    { id: 11, className: "Boxing", day: "Thursday", time1: "7:00",coachName:"Saif",mix:"Mix",Mem:true  },
    { id: 12, className: "Belly Dancing", day: "Sunday", time1: "8:00",coachName:"Samah",mix:"Ladies" },
  ]);

  return (
    <>
      <h2 className="text-xl font-semibold p-4 gymfont">Classes :</h2>
      <div className="w-50% flex flex-col lg:flex-row gap-2 flex-wrap justify-center">
        {classes.length ? (
          classes.map(({ id, className, day, time1 ,coachName, mix ,Mem}) => (
            <div
              key={id}
              style={
                Mem
                  ? { backgroundColor: "blue", color: "black", opacity: 1 }
                  : { backgroundColor: "white", color: "blue" }
              }
              className="min-w-28 border p-3 rounded-lg flex flex-col flex-wrap justify-center text-center"
            >
              <h3 className="p-2 font-bold  text-lg gymfont">
                {className}
              </h3>
              <h4 className="p-2 font-bold  text-lg">
                Day: {day}
              </h4>
              <h5 className='p-2 font-bold  text-lg'>
                
                <span className="text-xl text-black px-1"><span>C: </span>{coachName}</span>
              </h5>
              <p className="p-2 font-bold  text-lg">
                <i className="fa-regular fa-clock"></i> At:{" "}
                <span className="text-xl text-black px-1">{time1}</span> <span>pm</span>
              </p>
                  <p className="p-2 font-bold text-lg">
      {mix}
    </p>
    {Mem? <span className="text-sm text-black px-1">out of Membership</span> : null}
            </div>
          ))
        ) : (
          <i className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"></i>
        )}

      </div>
    </>
  );
}
