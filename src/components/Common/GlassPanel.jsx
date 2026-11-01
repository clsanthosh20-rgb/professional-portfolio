import React from 'react';
import { motion } from 'framer-motion';

export function GlassPanel({ children, className = '', elevated = false, ...props }) {
  return (
    <motion.div
      className={`${elevated ? 'glass-panel-elevated' : 'glass-panel'} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
