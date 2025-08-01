import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  animation?: 'typewriter' | 'fade-in-words' | 'slide-up-words' | 'reveal';
  delay?: number;
  className?: string;
  speed?: number;
}

export const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  animation = 'typewriter',
  delay = 0,
  className,
  speed = 100
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible || animation !== 'typewriter') return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, isVisible, speed, animation]);

  const renderTypewriter = () => (
    <span className={cn('typewriter-text', className)}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );

  const renderFadeInWords = () => {
    const words = text.split(' ');
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              'inline-block opacity-0 animate-fade-in',
              isVisible && 'opacity-100'
            )}
            style={{ 
              animationDelay: `${delay + index * 200}ms`,
              animationFillMode: 'forwards'
            }}
          >
            {word}{index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    );
  };

  const renderSlideUpWords = () => {
    const words = text.split(' ');
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              'inline-block transform translate-y-8 opacity-0 animate-slide-in',
              isVisible && 'translate-y-0 opacity-100'
            )}
            style={{ 
              animationDelay: `${delay + index * 150}ms`,
              animationFillMode: 'forwards'
            }}
          >
            {word}{index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    );
  };

  const renderReveal = () => (
    <span
      className={cn(
        'inline-block overflow-hidden whitespace-nowrap border-r-2 border-primary',
        'animate-typewriter',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isVisible ? text : ''}
    </span>
  );

  const renderAnimation = () => {
    switch (animation) {
      case 'fade-in-words': return renderFadeInWords();
      case 'slide-up-words': return renderSlideUpWords();
      case 'reveal': return renderReveal();
      default: return renderTypewriter();
    }
  };

  return renderAnimation();
};