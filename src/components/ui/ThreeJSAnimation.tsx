import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedPointsProps {
  count: number;
  mousePosition: THREE.Vector2;
}

const AnimatedPoints: React.FC<AnimatedPointsProps> = ({ count, mousePosition }) => {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Mouse interaction
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        const mouseX = (mousePosition.x / viewport.width) * 2 - 1;
        const mouseY = -(mousePosition.y / viewport.height) * 2 + 1;
        
        const distance = Math.sqrt((x - mouseX * 8) ** 2 + (y - mouseY * 8) ** 2);
        const repelForce = Math.max(0, 1 - distance / 3);
        
        positions[i3] += (mouseX * 8 - x) * repelForce * 0.01;
        positions[i3 + 1] += (mouseY * 8 - y) * repelForce * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="hsl(var(--primary))"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

interface FloatingGeometryProps {
  position: [number, number, number];
  speed: number;
  mousePosition: THREE.Vector2;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ position, speed, mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.8;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      
      // Mouse attraction effect
      const mouseX = (mousePosition.x / viewport.width) * 2 - 1;
      const mouseY = -(mousePosition.y / viewport.height) * 2 + 1;
      
      meshRef.current.position.x = position[0] + (mouseX * 2 - position[0]) * 0.1;
      meshRef.current.position.z = position[2] + (mouseY * 2 - position[2]) * 0.1;
      
      // Scale on hover
      const distance = Math.sqrt((meshRef.current.position.x - mouseX * 2) ** 2 + (meshRef.current.position.z - mouseY * 2) ** 2);
      const scale = 1 + Math.max(0, 1 - distance / 2) * 0.5;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color="hsl(var(--accent))"
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
};

interface ThreeJSAnimationProps {
  className?: string;
}

export const ThreeJSAnimation: React.FC<ThreeJSAnimationProps> = ({ className }) => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0));

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePosition(new THREE.Vector2(
      event.clientX - rect.left,
      event.clientY - rect.top
    ));
  };

  return (
    <div 
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="hsl(var(--accent))" />
        
        <AnimatedPoints count={1000} mousePosition={mousePosition} />
        
        <FloatingGeometry position={[-3, 0, 0]} speed={0.3} mousePosition={mousePosition} />
        <FloatingGeometry position={[3, 1, -1]} speed={0.5} mousePosition={mousePosition} />
        <FloatingGeometry position={[0, -2, 1]} speed={0.4} mousePosition={mousePosition} />
        <FloatingGeometry position={[-1, 2, -2]} speed={0.6} mousePosition={mousePosition} />
        <FloatingGeometry position={[2, -1, 2]} speed={0.35} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};