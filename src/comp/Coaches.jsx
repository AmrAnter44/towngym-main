import React, { useState, useEffect } from 'react';
import Trans from '../comp/Trans';
import { dataService } from '../data/dataService';
import { supabase } from '../lib/supabase';


export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [current, setCurrent] = useState(0);

  // Helper function لتحويل relative path لـ full Supabase Storage URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/default-coach.jpg';

    // لو الصورة full URL خلاص، استخدمها زي ما هي
    if (imagePath.startsWith('http')) return imagePath;

    // لو relative path، احصل على الـ public URL من Supabase Storage
    const { data } = supabase.storage
      .from('gym-media') // اسم الـ bucket في Supabase
      .getPublicUrl(imagePath);

    console.log('🖼️ Image URL:', imagePath, '→', data.publicUrl);
    return data.publicUrl;
  };

  useEffect(() => {
    // fetch الداتا
    dataService.getCoaches().then(({ data, error }) => {
      if (error) {
        console.error('Error loading coaches:', error);
      }
      if (data && data.length > 0) {
        console.log('🔍 Raw coaches data from Supabase:', data);

        // تحويل البيانات من Supabase format
        const formattedCoaches = data.map(coach => {
          return {
            ...coach,
            name: coach.name || 'Coach',
            title: coach.role || 'Fitness Trainer',
            img: getImageUrl(coach.image_url)
          };
        });

        setCoaches(formattedCoaches);
      }
    });
  }, []);

  // Auto slide كل 3.5 ثانية
  useEffect(() => {
    if (coaches.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coaches.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [coaches.length]);

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-8 items-center justify-center">
          
          {/* قسم الكوتشيز */}
          <div className="w-full lg:w-1/2">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white gymfont mb-2">
                Our <span className="text-blue-400">Coaches</span>
              </h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-sm mx-auto">
              <div className="glass rounded-2xl p-4">
                   
                {coaches.length === 0 ? (
                  
                  <div className="text-center py-8">
                    <i className="text-3xl text-blue-700 fa-solid fa-spinner fa-spin" />
                  </div>
                ) :  (
                  <div className="bg-black rounded-xl p-4 text-center">
                    <div className="mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-white gymfont mb-1">
                        {coaches[current].name}
                      </h3>
                      <p className="text-blue-400 text-sm md:text-base font-semibold">
                        {coaches[current].title}
                      </p>
                    </div>

                    <div className="relative mb-4">
                      <div className="h-42 w-36 mx-auto relative overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={coaches[current].img}
                          alt={`Coach ${coaches[current].name}`}
                        />
                      </div>
                    </div>  

                    {/* Dots للتنقل */}
                    <div className="flex justify-center gap-2 mt-4">
                      {coaches.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrent(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === current ? 'bg-blue-500 w-4' : 'bg-gray-500'
                          }`}
                        />
                      ))}
                        
                    </div>
                  </div>
                  
                )}
              </div>
            </div>
          </div>

          {/* قسم التحولات */}
          <div className="w-full lg:w-1/2">
            <Trans />
          </div>

        </div>
      </div>
    </section>
   
  );
}
