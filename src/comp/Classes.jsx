import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // مباشر وبسيط - fetch لما الصفحة تفتح
    supabase
      .from('classes')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data }) => {
        if (data) setClasses(data);
      });
  }, []);
  console.log(classes);
  

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 flex-wrap justify-center px-4 my-8 mt-40">
      {classes.length === 0 ? (
        <div className="text-center py-8 mt-40">
          <i className="text-3xl text-blue-700 fa-solid fa-spinner fa-spin" />
        </div>
      ) : (
        classes.map((classItem) => (
          <div
            key={classItem.id}
            className={`
              min-w-[280px] border-2 p-6 rounded-xl flex flex-col justify-center text-center shadow-lg
              ${classItem.mem 
                ? "bg-blue-500/10 border-blue-500/30 backdrop-blur-md" 
                : classItem.mix === "Ladies" 
                ? "bg-gray-500/10 border-gray-500/30 backdrop-blur-md " 
                : "bg-slate-500/10 border-slate-500/20 backdrop-blur-md"
              } 
            `}
          >
            <h3 className="p-2 font-bold text-xl gymfont">
              {classItem.className}
            </h3>

            <h4 className="p-2 font-semibold text-lg">
              Day: {classItem.day}
            </h4>

            <h5 className='p-2 font-semibold text-lg'>
              <span className="text-xl px-1">
                <span>Coach: </span>{classItem.coachname}
              </span>
            </h5>

            <p className="p-2 font-semibold text-lg">
              <i className="fa-regular fa-clock" />
              {" "}At:{" "}
              <span className="text-xl px-1">{classItem.time1}</span> 
              <span>pm</span>
            </p>

            <p className={`p-2 font-semibold text-lg 
                          ${classItem.mix == "Ladies" ? "text-fuchsia-400" : ""}
            `}>
              {classItem.mix}
            </p>

            {classItem.mem && (
              <span className="text-sm px-1 text-blue-400">
                Out of Membership
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}