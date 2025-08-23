import { motion } from 'framer-motion';
import ArrowRight from '../../assets/images/Arrow-right.svg?react';

export default function Button({ children, className }) {
  const BaseClassName =
    'flex justify-between items-center w-[161px] px-[24px] py-[10px] text-bn-40 bg-bn-10 rounded-[8px] border-bn-40 border text-[16px] hover:bg-gray-100';
  return (
    <motion.button
      className={`${BaseClassName} ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 4px 15px rgba(84, 47, 26, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <ArrowRight aria-label="ArrowRight" className="size-[18px]" />
    </motion.button>
  );
}
