import React from 'react';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  className
}) => {
  const { ref, count } = useCountUp(end, duration, start);

  return (
    <span ref={ref} className={cn('counter', className)}>
      {prefix}{count}{suffix}
    </span>
  );
};