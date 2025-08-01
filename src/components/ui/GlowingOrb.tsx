import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent';
  intensity?: 'low' | 'medium' | 'high';
  animation?: 'float' | 'pulse' | 'rotate' | 'static';
  className?: string;
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({
  size = 'md',
  color = 'primary',
  intensity = 'medium',
  animation = 'float',
  className
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32';
      case 'xl': return 'w-48 h-48';
      default: return 'w-24 h-24';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'secondary': return 'bg-secondary';
      case 'accent': return 'bg-accent';
      default: return 'bg-primary';
    }
  };

  const getGlowIntensity = () => {
    const baseGlow = color === 'primary' ? 'shadow-primary/50' : 
                    color === 'secondary' ? 'shadow-secondary/50' : 'shadow-accent/50';
    
    switch (intensity) {
      case 'low': return `shadow-lg ${baseGlow}`;
      case 'high': return `shadow-2xl ${baseGlow}`;
      default: return `shadow-xl ${baseGlow}`;
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'pulse': return 'animate-pulse-glow';
      case 'rotate': return 'animate-spin';
      case 'static': return '';
      default: return 'animate-float';
    }
  };

  return (
    <div
      className={cn(
        'rounded-full blur-sm opacity-60',
        getSizeClass(),
        getColorClass(),
        getGlowIntensity(),
        getAnimationClass(),
        className
      )}
    />
  );
};