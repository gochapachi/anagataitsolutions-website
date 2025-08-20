import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  animationSpeed?: number;
  connectionDistance?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  className,
  particleCount = 80,
  particleColor = 'rgba(79, 172, 254, 0.2)',
  particleSize = 2,
  animationSpeed = 0.5,
  connectionDistance = 120,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = containerRef.current.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        size: Math.random() * particleSize + 1
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < connectionDistance) {
            ctx.globalAlpha = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleColor, particleSize, animationSpeed, connectionDistance]);

  useEffect(() => {
    const cleanup = init();

    const resizeObserver = new ResizeObserver(() => {
      const newCleanup = init();
      if (typeof newCleanup === 'function') {
        newCleanup();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [init]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none z-0", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
};