import { motion } from 'framer-motion';

import { LineChartIcon, SparklesIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <LineChartIcon size={32} />
          <span>+</span>
          <SparklesIcon size={32} />
        </p>
        <p>
          Ready to crush your fitness goals? This AI assistant is your personal
          guide for gym workouts and nutrition planning. Let's build healthier
          habits together!
        </p>
        <p>
          Track your progress, get personalized tips, and stay motivated on your
          journey to a stronger, healthier you.
        </p>
      </div>
    </motion.div>
  );
};
