import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching classes:', error);
    }
    
    if (data) {
      console.log('Classes data:', data);
      setClasses(data);
    }
    setLoading(false);
  };

  const classesRef = useRef(null);
  const isInView = useInView(classesRef, { 
    once: true, 
    threshold: 0.1,
    margin: "-50px 0px"
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const classCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 mt-40">
        <i className="text-3xl text-blue-700 fa-solid fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      ref={classesRef}
      className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 flex-wrap justify-center px-4 my-8 mt-40"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {classes.length > 0 ? (
        classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            className={`
              min-w-[280px] border-2 p-6 rounded-xl flex flex-col justify-center text-center shadow-lg
              ${classItem.mem 
                ? "bg-blue-500/10 border-blue-500/30 backdrop-blur-md" 
                : classItem.ladies 
                ? "bg-gray-500/10 border-gray-500/30 backdrop-blur-md" 
                : "bg-slate-500/10 border-slate-500/20 backdrop-blur-md"
              } 
            `}
            variants={classCardVariants}
          >
            <h3 className="p-2 font-bold text-xl gymfont">
              {classItem.className}
            </h3>

            <h4 className="p-2 font-semibold text-lg">
              Day: {classItem.day}
            </h4>

            <h5 className='p-2 font-semibold text-lg'>
              <span className="text-xl px-1">
                <span>Coach: </span>{classItem.coachName}
              </span>
            </h5>

            <p className="p-2 font-semibold text-lg">
              <i className="fa-regular fa-clock" />
              {" "}At:{" "}
              <span className="text-xl px-1">{classItem.time1}</span> 
              <span>pm</span>
            </p>

            <p className="p-2 font-semibold text-lg text-gray-400">
              {classItem.mix}
            </p>

            {classItem.mem && (
              <span className="text-sm px-1 text-blue-400">
                Out of Membership
              </span>
            )}
          </motion.div>
        ))
      ) : (
        <p className="text-center py-8 mt-40">No classes available.</p>
      )}
    </motion.div>
  );
}