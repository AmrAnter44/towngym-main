import React, { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';
import { supabase } from '../lib/supabase';

export default function Classes() {
  const [classes, setClasses] = useState([]);

  // Helper function لتحويل relative path لـ full Supabase Storage URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    const { data } = supabase.storage
      .from('gym-media')
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  // Helper function لتحويل الوقت من نظام 24 ساعة إلى 12 ساعة
  const convertTo12Hour = (time24) => {
    if (!time24 || time24 === 'N/A') return time24;

    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';

    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour - 12;
    }

    return `${hour}:${minutes} ${period}`;
  };

  useEffect(() => {
    // fetch الداتا من Supabase
    dataService.getClasses().then(({ data, error }) => {
      if (error) {
        console.error('Error loading classes:', error);
      }
      if (data && data.length > 0) {
        console.log('🔍 Raw classes data:', data);

        // تحويل البيانات من Supabase format للـ component format
        const formattedClasses = data.map((classItem) => {
          return {
            ...classItem,
            classname: classItem.name || 'Class',
            day: classItem.day_of_week || 'N/A',
            coachname: classItem.coach_name || 'Coach',
            time1: classItem.time || 'N/A',
            mix: classItem.class_type || '',
            mem: classItem.booking_required || false,
            img: getImageUrl(classItem.image_url)
          };
        });

        console.log('✅ Formatted classes:', formattedClasses);
        setClasses(formattedClasses);
      }
    });
  }, []);

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
              {classItem.classname}
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
              <span className="text-xl px-1">{convertTo12Hour(classItem.time1)}</span>
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
