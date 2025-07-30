'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionWrapper;
