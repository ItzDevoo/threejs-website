import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export default function NexisParticles({ isMobile }) {
  const particlesRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const originalPositions = useRef(null); // Store each particle's original position
  const texture = useLoader(THREE.TextureLoader, '/assets/nexis.png');
  const { camera } = useThree();
  
  // Create particle positions from image
  const { positions, colors, initialPositions } = useMemo(() => {
    if (!texture.image) return { positions: new Float32Array(0), colors: new Float32Array(0), initialPositions: new Float32Array(0) };
    
    // Create canvas to read pixel data
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 512; // Ultra high resolution for extremely detailed sampling
    canvas.width = size;
    canvas.height = size;
    
    // Draw image to canvas
    ctx.drawImage(texture.image, 0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    
    const positions = [];
    const colors = [];
    
    // Sample pixels and create particles for non-transparent pixels
    const step = 6; // Sample every 6th pixel for 25% more density (8→6 = ~78% more particles)
    for (let y = 0; y < size; y += step) {
      for (let x = 0; x < size; x += step) {
        const index = (y * size + x) * 4;
        const alpha = data[index + 3];
        
        if (alpha > 128) { // Only create particle if pixel is mostly opaque
          // Position in 3D space (centered) - much smaller spacing for ultra high resolution
          positions.push(
            (x - size / 2) * 0.0125,
            -(y - size / 2) * 0.0125,
            (Math.random() - 0.5) * 0.5
          );
          
          // Color from pixel
          colors.push(
            data[index] / 255,
            data[index + 1] / 255,
            data[index + 2] / 255
          );
        }
      }
    }
    
    // Create a copy for initial positions (for animation)
    const initialPositions = new Float32Array(positions);
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      initialPositions: initialPositions
    };
  }, [texture]);
  
  // Random target positions for dispersion
  const randomPositions = useMemo(() => {
    const count = positions.length / 3;
    const randoms = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      randoms[i] = (Math.random() - 0.5) * 20;
    }
    return randoms;
  }, [positions]);
  
  // Handle scroll and wheel events
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      console.log('Scroll position:', scrollRef.current);
    };
    
    const handleWheel = (e) => {
      scrollRef.current += e.deltaY * 0.5;
      console.log('Wheel delta:', e.deltaY, 'Total scroll:', scrollRef.current);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  // Initialize positions when component mounts
  useEffect(() => {
    if (particlesRef.current && initialPositions.length > 0 && !isInitialized) {
      const geometry = particlesRef.current.geometry;
      const positionAttribute = geometry.attributes.position;
      
      // Store original positions for each particle
      originalPositions.current = new Float32Array(initialPositions.length);
      for (let i = 0; i < initialPositions.length; i++) {
        originalPositions.current[i] = initialPositions[i];
        positionAttribute.array[i] = initialPositions[i];
      }
      
      positionAttribute.needsUpdate = true;
      setIsInitialized(true);
      console.log('Particles initialized with', positionAttribute.count, 'particles');
    }
  }, [initialPositions, isInitialized]);

  // Animation - simple mouse repulsion
  useFrame((state) => {
    if (!groupRef.current || !particlesRef.current || !isInitialized || !originalPositions.current) return;
    
    const time = state.clock.getElapsedTime();
    const geometry = particlesRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    
    // Rotation based on scroll
    const rotationSpeed = scrollRef.current * 0.01;
    groupRef.current.rotation.y = rotationSpeed;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + rotationSpeed * 0.2;
    groupRef.current.rotation.z = Math.sin(rotationSpeed * 0.1) * 0.3;
    
    // Only apply particle movement if hovering
    if (hovered) {
      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        
        // Get original positions from stored array
        const originalX = originalPositions.current[i3];
        const originalY = originalPositions.current[i3 + 1];
        const originalZ = originalPositions.current[i3 + 2];
        
        // Calculate distance from mouse
        const dx = originalX - mouseRef.current.x;
        const dy = originalY - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Push particles away from mouse - 25% more separation
        const force = Math.max(0, 1 - distance / 0.5);
        const pushX = dx * force * 0.375; // Increased from 0.3 to 0.375 (25% more)
        const pushY = dy * force * 0.375;
        
        // Apply position with faster interpolation for more reactivity
        positionAttribute.array[i3] = THREE.MathUtils.lerp(
          positionAttribute.array[i3],
          originalX + pushX,
          0.2
        );
        positionAttribute.array[i3 + 1] = THREE.MathUtils.lerp(
          positionAttribute.array[i3 + 1],
          originalY + pushY,
          0.2
        );
        positionAttribute.array[i3 + 2] = originalZ;
      }
    } else {
      // Return to exact original positions when not hovering
      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        positionAttribute.array[i3] = originalPositions.current[i3];
        positionAttribute.array[i3 + 1] = originalPositions.current[i3 + 1];
        positionAttribute.array[i3 + 2] = originalPositions.current[i3 + 2];
      }
    }
    
    positionAttribute.needsUpdate = true;
  });
  
  if (positions.length === 0) return null;
  
  return (
    <group
      ref={groupRef}
      position={[0, isMobile ? 0 : 1, -2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={(e) => {
        // Convert pointer position to local coordinates
        const vec = new THREE.Vector3(e.point.x, e.point.y, e.point.z);
        groupRef.current.worldToLocal(vec);
        mouseRef.current.x = vec.x;
        mouseRef.current.y = vec.y;
      }}
    >
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={initialPositions.length / 3}
            array={initialPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.02 : 0.025}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}