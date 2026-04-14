'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SectionWrapper({ children, className }: {
  children: React.ReactNode; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn('container mx-auto px-4 py-8', className)}
    >
      {children}
    </motion.div>
  );
}
