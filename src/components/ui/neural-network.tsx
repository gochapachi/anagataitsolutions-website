import { useEffect, useRef, useState, useCallback } from "react";

interface NeuralNetworkProps {
  className?: string;
  width?: number;
  height?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  activation: number;
  baseX: number;
  baseY: number;
  pulsePhase: number;
  size: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  active: boolean;
}

export const NeuralNetwork = ({ className = "", width = 500, height = 400 }: NeuralNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      // Set canvas size with proper DPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Create brain-like neural network nodes
    const nodes: Node[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create layered brain structure
    for (let layer = 0; layer < 5; layer++) {
      const layerNodes = layer === 0 || layer === 4 ? 8 : 12 + layer * 2;
      const radius = 80 + layer * 30;
      
      for (let i = 0; i < layerNodes; i++) {
        const angle = (i / layerNodes) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
        const y = centerY + Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 40;
        
        nodes.push({
          x,
          y,
          vx: 0,
          vy: 0,
          active: false,
          activation: 0,
          baseX: x,
          baseY: y,
          pulsePhase: Math.random() * Math.PI * 2,
          size: 3 + Math.random() * 4
        });
      }
    }

    // Create brain-like connections between nearby nodes
    const connections: Connection[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        
        if (distance < 120) {
          connections.push({
            from: i,
            to: j,
            strength: Math.random(),
            active: false
          });
        }
      }
    }

    let animationFrame: number;
    let time = 0;
    const pulseWaves: { x: number; y: number; radius: number; time: number }[] = [];

    const animate = () => {
      time += 0.02;
      
      // Clear canvas with subtle background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, width, height);
      
      // Mouse interaction effects
      if (isHovered) {
        const mouseRadius = 100;
        nodes.forEach((node, index) => {
          const distance = Math.sqrt(
            Math.pow(node.x - mousePosition.x, 2) + 
            Math.pow(node.y - mousePosition.y, 2)
          );
          
          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            node.activation = Math.max(node.activation, force);
            
            // Create pulse wave when mouse is close
            if (Math.random() < 0.1 && distance < 50) {
              pulseWaves.push({
                x: node.x,
                y: node.y,
                radius: 0,
                time: time
              });
            }
          }
        });
      }

      // Update node physics and activation
      nodes.forEach((node, index) => {
        // Breathing motion
        node.pulsePhase += 0.05;
        const breathe = Math.sin(node.pulsePhase) * 2;
        node.x = node.baseX + breathe + (Math.sin(time + index * 0.1) * 1);
        node.y = node.baseY + breathe * 0.5 + (Math.cos(time + index * 0.1) * 1);
        
        // Natural activation waves
        const waveActivation = Math.sin(time * 2 + index * 0.3) * 0.5 + 0.5;
        const distanceActivation = Math.sin(time + Math.sqrt(Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)) * 0.01) * 0.5 + 0.5;
        
        node.activation = Math.max(
          node.activation * 0.95, // Decay
          waveActivation * 0.3 + distanceActivation * 0.3
        );
        
        node.active = node.activation > 0.4;
      });

      // Update connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        connection.active = fromNode.active && toNode.active && Math.random() > 0.7;
      });

      // Draw connections with synaptic effects
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        if (connection.active) {
          // Animated synaptic transmission
          const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
          gradient.addColorStop(0, `hsl(var(--primary) / ${fromNode.activation})`);
          gradient.addColorStop(0.5, `hsl(var(--accent) / ${Math.max(fromNode.activation, toNode.activation)})`);
          gradient.addColorStop(1, `hsl(var(--primary) / ${toNode.activation})`);
          
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 + connection.strength * 2;
          ctx.globalAlpha = Math.max(fromNode.activation, toNode.activation);
          ctx.stroke();
          
          // Synaptic pulse
          if (Math.random() < 0.1) {
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            ctx.beginPath();
            ctx.arc(midX, midY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(var(--accent))`;
            ctx.globalAlpha = 0.8;
            ctx.fill();
          }
        } else {
          // Dormant connections
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = `hsl(var(--muted-foreground) / 0.1)`;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.2;
          ctx.stroke();
        }
      });

      // Draw pulse waves
      pulseWaves.forEach((wave, index) => {
        wave.radius += 3;
        const alpha = Math.max(0, 1 - (time - wave.time) * 2);
        
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsl(var(--primary) / ${alpha * 0.5})`;
          ctx.lineWidth = 2;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        } else {
          pulseWaves.splice(index, 1);
        }
      });

      // Draw nodes with brain-like appearance
      nodes.forEach((node, index) => {
        const nodeSize = node.size * (1 + node.activation * 0.5);
        
        // Outer glow
        if (node.active) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 3);
          gradient.addColorStop(0, `hsl(var(--primary) / ${node.activation * 0.3})`);
          gradient.addColorStop(1, `hsl(var(--primary) / 0)`);
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = 1;
          ctx.fill();
        }
        
        // Main node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        
        if (node.active) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize);
          gradient.addColorStop(0, `hsl(var(--primary))`);
          gradient.addColorStop(1, `hsl(var(--primary) / 0.7)`);
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = `hsl(var(--muted-foreground) / 0.4)`;
        }
        
        ctx.globalAlpha = 0.8 + node.activation * 0.2;
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(var(--accent) / ${node.activation})`;
        ctx.globalAlpha = node.activation;
        ctx.fill();
      });

      // Draw central brain stem
      const stemGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      stemGradient.addColorStop(0, `hsl(var(--primary) / 0.3)`);
      stemGradient.addColorStop(1, `hsl(var(--primary) / 0)`);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = stemGradient;
      ctx.globalAlpha = 0.5 + Math.sin(time * 3) * 0.2;
      ctx.fill();

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
    } catch (error) {
      console.error('Neural network animation error:', error);
    }
  }, [width, height, mousePosition, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};