import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'dots' | 'waves' | 'gradient' | 'mesh';
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'dots',
  opacity = 0.1,
  speed = 'medium'
}) => {
  const getSpeedClass = () => {
    switch (speed) {
      case 'slow': return 'duration-[20s]';
      case 'fast': return 'duration-[5s]';
      default: return 'duration-[10s]';
    }
  };

  const renderDots = () => (
    <div className={`absolute inset-0 ${getSpeedClass()}`} style={{ opacity }}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-gradient-x" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        animation: 'float 6s ease-in-out infinite'
      }} />
    </div>
  );

  const renderWaves = () => (
    <div className={`absolute inset-0 ${getSpeedClass()}`} style={{ opacity }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-primary/20 animate-float" />
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-secondary/20 animate-swing" />
      </svg>
    </div>
  );

  const renderGradient = () => (
    <div className={`absolute inset-0 ${getSpeedClass()}`} style={{ opacity }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/30 animate-gradient-shift" />
    </div>
  );

  const renderMesh = () => (
    <div className={`absolute inset-0 ${getSpeedClass()}`} style={{ opacity }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(79, 172, 254, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79, 172, 254, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'float 8s ease-in-out infinite'
      }} />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'waves': return renderWaves();
      case 'gradient': return renderGradient();
      case 'mesh': return renderMesh();
      default: return renderDots();
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {renderVariant()}
    </div>
  );
};