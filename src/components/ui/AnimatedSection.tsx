import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'blur' | 'stagger';
  delay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  className,
  threshold = 0.1,
  once = true
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold, once });

  const getAnimationClass = () => {
    switch (animation) {
      case 'slide-left':
        return 'scroll-slide-left';
      case 'slide-right':
        return 'scroll-slide-right';
      case 'scale':
        return 'scroll-scale';
      case 'rotate':
        return 'scroll-rotate';
      case 'blur':
        return 'scroll-blur';
      case 'stagger':
        return 'stagger-children';
      default:
        return 'scroll-animate';
    }
  };

  return (
    <div
      ref={ref as any}
      className={cn(
        getAnimationClass(),
        isInView && 'in-view',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};