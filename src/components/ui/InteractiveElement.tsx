import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveElementProps {
  children: React.ReactNode;
  effect?: 'glow' | 'scale' | 'tilt' | 'magnetic' | 'ripple' | 'pulse' | 'shake';
  className?: string;
  delay?: number;
  intensity?: 'low' | 'medium' | 'high';
}

export const InteractiveElement: React.FC<InteractiveElementProps> = ({
  children,
  effect = 'scale',
  className,
  delay = 0,
  intensity = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const getEffectClass = () => {
    const intensityMap = {
      low: { scale: 'hover:scale-105', tilt: 'hover:rotate-1', glow: 'hover:shadow-md' },
      medium: { scale: 'hover:scale-110', tilt: 'hover:rotate-2', glow: 'hover:shadow-lg' },
      high: { scale: 'hover:scale-125', tilt: 'hover:rotate-3', glow: 'hover:shadow-xl' }
    };

    switch (effect) {
      case 'glow':
        return `transition-all duration-300 ${intensityMap[intensity].glow} hover:shadow-primary/20`;
      case 'scale':
        return `transition-transform duration-300 ${intensityMap[intensity].scale}`;
      case 'tilt':
        return `transition-transform duration-300 ${intensityMap[intensity].tilt}`;
      case 'magnetic':
        return 'magnetic-effect transition-transform duration-200';
      case 'pulse':
        return 'hover:animate-pulse';
      case 'shake':
        return 'hover:animate-wiggle';
      case 'ripple':
        return 'relative overflow-hidden';
      default:
        return 'hover:scale-105 transition-transform duration-300';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (effect === 'ripple') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
  };

  return (
    <div
      className={cn(getEffectClass(), className)}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
      {effect === 'ripple' && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </div>
  );
};