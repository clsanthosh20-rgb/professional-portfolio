import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', hoverGlow = true, ...props }) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hoverGlow ? { y: -4, transition: { duration: 0.25 } } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
