import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useMagneticEffect } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const magneticRef = useMagneticEffect();

  return (
    <Button
      ref={magneticRef as any}
      className={cn('magnetic', className)}
      {...props}
    >
      {children}
    </Button>
  );
};