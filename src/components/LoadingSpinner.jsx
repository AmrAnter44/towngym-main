import { motion } from 'framer-motion';

/**
 * LoadingSpinner component for route transitions
 * Branded loading component with gym theme using Framer Motion
 */
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex flex-col items-center gap-6">
        {/* Animated dumbbell icon */}
        <motion.div
          className="flex items-center gap-4"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Left weight */}
          <motion.div
            className="w-6 h-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg"
            animate={{
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Bar */}
          <div className="w-16 h-2 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-full" />

          {/* Right weight */}
          <motion.div
            className="w-6 h-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg"
            animate={{
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="text-white text-xl font-bold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Gym name */}
        <motion.div
          className="text-blue-400 text-sm font-semibold tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          X GYM
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
