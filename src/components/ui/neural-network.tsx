import { useEffect, useRef } from "react";

interface NeuralNetworkProps {
  className?: string;
  width?: number;
  height?: number;
}

export const NeuralNetwork = ({ className = "", width = 400, height = 300 }: NeuralNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Network nodes
    const nodes = [
      // Input layer
      { x: 50, y: height * 0.2, active: false },
      { x: 50, y: height * 0.4, active: false },
      { x: 50, y: height * 0.6, active: false },
      { x: 50, y: height * 0.8, active: false },
      
      // Hidden layer 1
      { x: width * 0.4, y: height * 0.15, active: false },
      { x: width * 0.4, y: height * 0.35, active: false },
      { x: width * 0.4, y: height * 0.55, active: false },
      { x: width * 0.4, y: height * 0.75, active: false },
      { x: width * 0.4, y: height * 0.85, active: false },
      
      // Hidden layer 2
      { x: width * 0.7, y: height * 0.25, active: false },
      { x: width * 0.7, y: height * 0.45, active: false },
      { x: width * 0.7, y: height * 0.65, active: false },
      
      // Output layer
      { x: width - 50, y: height * 0.4, active: false },
      { x: width - 50, y: height * 0.6, active: false },
    ];

    // Connections
    const connections = [
      // Input to hidden 1
      [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
      [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
      [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
      [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
      
      // Hidden 1 to hidden 2
      [4, 9], [4, 10], [4, 11],
      [5, 9], [5, 10], [5, 11],
      [6, 9], [6, 10], [6, 11],
      [7, 9], [7, 10], [7, 11],
      [8, 9], [8, 10], [8, 11],
      
      // Hidden 2 to output
      [9, 12], [9, 13],
      [10, 12], [10, 13],
      [11, 12], [11, 13],
    ];

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.02;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update node activation (wave-like pattern)
      nodes.forEach((node, index) => {
        const activation = Math.sin(time + index * 0.5) * 0.5 + 0.5;
        node.active = activation > 0.7;
      });

      // Draw connections
      connections.forEach(([fromIndex, toIndex]) => {
        const from = nodes[fromIndex];
        const to = nodes[toIndex];
        
        const alpha = (from.active && to.active) ? 0.8 : 0.2;
        const color = from.active && to.active ? '#3b82f6' : '#94a3b8';
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = from.active && to.active ? 2 : 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 8 : 6, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? '#3b82f6' : '#64748b';
        ctx.globalAlpha = node.active ? 1 : 0.6;
        ctx.fill();
        
        // Add glow effect for active nodes
        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.globalAlpha = 0.3;
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};