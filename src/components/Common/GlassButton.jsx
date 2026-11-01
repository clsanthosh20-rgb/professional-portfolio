import React from 'react';
import { motion } from 'framer-motion';

export function GlassButton({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  icon: Icon,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) {
  const variantClass =
    variant === 'primary'
      ? 'glass-btn-primary'
      : variant === 'danger'
      ? 'glass-btn-danger'
      : '';

  return (
    <motion.button
      type={type}
      className={`glass-btn ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.15 }}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      {...props}
    >
      {Icon && <Icon size={16} />}
      <span>{children}</span>
    </motion.button>
  );
}
