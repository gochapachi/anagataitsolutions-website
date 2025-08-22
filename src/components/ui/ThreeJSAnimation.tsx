import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedPointsProps {
  count: number;
}

const AnimatedPoints: React.FC<AnimatedPointsProps> = ({ count }) => {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="hsl(var(--primary))"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

interface FloatingGeometryProps {
  position: [number, number, number];
  speed: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ position, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.8;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="hsl(var(--accent))"
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
};

interface ThreeJSAnimationProps {
  className?: string;
}

export const ThreeJSAnimation: React.FC<ThreeJSAnimationProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <AnimatedPoints count={800} />
        
        <FloatingGeometry position={[-2, 0, 0]} speed={0.3} />
        <FloatingGeometry position={[2, 1, -1]} speed={0.5} />
        <FloatingGeometry position={[0, -2, 1]} speed={0.4} />
        <FloatingGeometry position={[-1, 2, -2]} speed={0.6} />
      </Canvas>
    </div>
  );
};