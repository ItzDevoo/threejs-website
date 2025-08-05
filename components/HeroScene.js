import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial, Sphere, Torus, Octahedron, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';

function InteractiveParticles() {
  const particlesRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particleCount = 2000;
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3] = 0.5;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 1;
    }
    return [positions, colors];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
      
      const scale = 1 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          itemSize={3}
          array={positions}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          itemSize={3}
          array={colors}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        vertexColors 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Torus
        ref={meshRef}
        args={[1.2, 0.5, 16, 100]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#60a5fa" : "#3b82f6"}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </Torus>
    </Float>
  );
}

function MinimalText() {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={textRef}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        position={[0, -2, 0]}
      >
        DEVELOPER
        <meshStandardMaterial 
          attach="material" 
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </Text>
    </Float>
  );
}

function BackgroundSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Sphere ref={meshRef} args={[20, 32, 32]} position={[0, 0, -30]}>
      <meshBasicMaterial 
        attach="material" 
        color="#0a0a0a"
        wireframe
        transparent
        opacity={0.1}
      />
    </Sphere>
  );
}

export default function HeroScene() {
  return (
    <div className="h-screen w-full fixed top-0 left-0 -z-10">
      <Canvas
        style={{ background: '#0a0a0a' }}
        gl={{ antialias: true, alpha: false }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#60a5fa" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#3b82f6"
        />
        
        <InteractiveParticles />
        <FloatingGeometry />
        <MinimalText />
        <BackgroundSphere />
        
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
      </Canvas>
    </div>
  );
}