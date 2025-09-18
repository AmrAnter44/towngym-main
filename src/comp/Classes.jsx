import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Classes() {
  const [classes, setClasses] = useState([
    { id: 1, className: "Functional Training", day: "Saturday", time1: "8:30", coachName: "Zima", mix: "Mix" },
    { id: 2, className: "Aerobics", day: "Sunday", time1: "8:30", coachName: "Aimlia", mix: "Ladies", ladies: true },
    { id: 3, className: "Flexibility", day: "Sunday", time1: "9:30", coachName: "Aimlia", mix: "Ladies", ladies: true },
    { id: 4, className: "Superman Kids", day: "Monday", time1: "6:00", coachName: "Zima", mix: "Mix", Mem: true },
    { id: 5, className: "Boxing", day: "Monday", time1: "7:00", coachName: "Saif", mix: "Mix", Mem: true },
    { id: 6, className: "Circuit", day: "Monday", time1: "8:30", coachName: "Menna", mix: "Ladies", ladies: true },
    { id: 7, className: "Zumba", day: "Tuesday", time1: "8:30", coachName: "Menna", mix: "Ladies", ladies: true },
    { id: 8, className: "Yoga", day: "Tuesday", time1: "9:30", coachName: "Aimlia", mix: "Mix" },
    { id: 9, className: "belly dance", day: "Wednesday", time1: "8:30", coachName: "Samah", mix: "Ladies", ladies: true },
    { id: 10, className: "Superman Kids", day: "Thursday", time1: "6:00", coachName: "Zima", mix: "Mix", Mem: true },
    { id: 11, className: "core", day: "Thursday", time1: "8:30", coachName: "zima", mix: "Mix" },
  ]);

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

  return (
    <>
      <motion.div 
        ref={classesRef}
        className="w-50% flex flex-col lg:flex-row gap-2 flex-wrap justify-center m-4 my-3 mt-40"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {classes.length ? (
          classes.map(({ id, className, day, time1, coachName, mix, Mem, ladies }) => (
            <motion.div
              key={id}
              className={`
                min-w-28 border p-3 rounded-lg flex flex-col flex-wrap justify-center text-center
                ${Mem ? "glass-class-mem" : "glass-class"} 
              `}
              variants={classCardVariants}
            >
              <h3 className="p-2 font-bold text-lg gymfont">
                {className}
              </h3>

              <h4 className="p-2 font-bold text-lg">
                Day: {day}
              </h4>

              <h5 className='p-2 font-bold text-lg'>
                <span className="text-xl px-1">
                  <span>C: </span>{coachName}
                </span>
              </h5>

              <p className="p-2 font-bold text-lg">
                <i className="fa-regular fa-clock" />
                {" "}At:{" "}
                <span className="text-xl px-1">{time1}</span> 
                <span>pm</span>
              </p>

              <p className={`p-2 font-bold text-lg ${ladies ? "text-fuchsia-400" : "."}`}>
                {mix}
              </p>

              {Mem && (
                <span className="text-sm px-1">
                  out of Membership
                </span>
              )}
            </motion.div>
          ))
        ) : (
          <motion.i 
            className="text-3xl text-blue-700 p-4 m-4 fa-solid fa-spinner fa-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>
    </>
  );
}