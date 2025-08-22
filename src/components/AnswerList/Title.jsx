import { motion } from 'framer-motion';
import { memo } from 'react';
function Title({ children }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center text-[24px] md:text-[40px] md:pt-10 md:pb-3"
    >
      {children}
    </motion.h1>
  );
}

export default memo(Title);