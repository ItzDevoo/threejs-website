import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Text, Float, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

const NexisParticlesComponent = dynamic(() => import('./NexisParticles'), {
  ssr: false
});

// Modern floating particles system
function ModernParticles() {
  const particlesRef = useRef();
  const particleCount = 500;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Interactive navigation spheres
function NavigationSphere({ position, color, label, onClick, isActive }) {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = isActive ? 1.2 : hovered ? 1.05 : 1;
      
      // Smooth bounce-like easing for scale transitions
      const currentScale = meshRef.current.scale.x;
      const diff = targetScale - currentScale;
      const easeSpeed = 0.15;
      
      // Add elastic bounce effect when scaling up
      if (diff > 0 && Math.abs(diff) > 0.01) {
        const bounce = 1 + Math.sin(state.clock.getElapsedTime() * 20) * 0.02 * Math.min(diff, 0.1);
        meshRef.current.scale.setScalar(currentScale + diff * easeSpeed * bounce);
      } else {
        meshRef.current.scale.setScalar(currentScale + diff * easeSpeed);
      }
      
      // Subtle rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : hovered ? 0.4 : 0.2}
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      <Text
        ref={textRef}
        position={[position[0], position[1] - 1.5, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </Float>
  );
}

// GitHub button with icon
function GitHubButton({ isMobile }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/assets/github.png');

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1
      );
      
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      const baseY = isMobile ? 0 : -2.5;
      meshRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  const handleClick = () => {
    window.open('https://github.com/ItzDevoo', '_blank');
  };

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh 
        ref={meshRef} 
        position={[isMobile ? -1.5 : -2, isMobile ? 0 : -2.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <circleGeometry args={[isMobile ? 0.5 : 0.6, 32]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </mesh>
    </Float>
  );
}

// YouTube button with icon
function YouTubeButton({ isMobile }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/assets/youtube.png');

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1
      );
      
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      const baseY = isMobile ? 0 : -2.5;
      meshRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  const handleClick = () => {
    window.open('https://www.youtube.com/@ItzDevoo', '_blank');
  };

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh 
        ref={meshRef} 
        position={[isMobile ? 1.5 : 2, isMobile ? 0 : -2.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <circleGeometry args={[isMobile ? 0.5 : 0.6, 32]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </mesh>
    </Float>
  );
}

// Discord button with icon
function DiscordButton({ isMobile }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/assets/discord.png');

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1
      );
      
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      const baseY = isMobile ? 0 : -2.5;
      meshRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  const handleClick = () => {
    window.open('https://discord.gg/4uPhuXpqwy', '_blank');
  };

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh 
        ref={meshRef} 
        position={[0, isMobile ? 0 : -2.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <circleGeometry args={[isMobile ? 0.5 : 0.6, 32]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </mesh>
    </Float>
  );
}

// Nexis app preview
function NexisPreview({ isMobile, onNexisClick }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/assets/nexis.png');

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1
      );
      
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
    
    if (groupRef.current) {
      const baseY = isMobile ? 4.3 : 4.9;
      groupRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, isMobile ? 4.3 : 4.9, 0]}>
        <mesh 
          ref={meshRef} 
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onNexisClick}
        >
          <circleGeometry args={[isMobile ? 0.8 : 1, 32]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={hovered ? 1 : 0.9}
          />
        </mesh>

        <Text
          fontSize={isMobile ? 0.25 : 0.35}
          color="#84cc16"
          anchorX="center"
          anchorY="middle"
          position={[0, isMobile ? -0.9 : -1.3, 0]}
          font="/fonts/consolas.woff"
        >
          COMING SOON!
          <meshStandardMaterial
            attach="material"
            emissive="#84cc16"
            emissiveIntensity={0.4}
          />
        </Text>

      </group>
    </Float>
  );
}

// Projects header
function ProjectsHeader({ isMobile }) {
  return (
    <Text
      fontSize={isMobile ? 0.3 : 0.4}
      color="#6b7280"
      anchorX="center"
      anchorY="middle"
      position={[0, isMobile ? 5.5 : 6, 0]}
      font="/fonts/consolas.woff"
    >
      Projects:
      <meshStandardMaterial
        attach="material"
        emissive="#6b7280"
        emissiveIntensity={0.2}
      />
    </Text>
  );
}

// Interactive profile picture button
function ProfileButton({ onHomeClick, isNexisPage }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/assets/profile.png');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1
      );
      
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      const baseY = isMobile ? -1.8 : -4.5;
      meshRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  const handleClick = () => {
    if (isNexisPage && onHomeClick) {
      onHomeClick();
    } else {
      console.log('Profile button clicked on home page');
    }
  };

  return (
    <group>
      {/* Main profile picture */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef} 
          position={[0, isMobile ? -1.8 : -4.5, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          <circleGeometry args={[isMobile ? 0.8 : 1, 32]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={hovered ? 1 : 0.9}
          />
        </mesh>
      </Float>

      {/* Social media buttons - only show on home page */}
      {!isNexisPage && (
        <>
          {/* GitHub button */}
          <GitHubButton isMobile={isMobile} />

          {/* YouTube button */}
          <YouTubeButton isMobile={isMobile} />

          {/* Discord button */}
          <DiscordButton isMobile={isMobile} />
        </>
      )}
    </group>
  );
}

// Dynamic background geometry
function BackgroundGeometry() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
    </group>
  );
}

// Central hero content
function HeroContent({ currentSection }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = currentSection === 'home' ? 0 : -20;
      const targetScale = currentSection === 'home' ? 1 : 0.5;
      
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
      groupRef.current.scale.setScalar(
        groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.05
      );
      
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Responsive scaling based on viewport and device type
  const getResponsiveSize = (baseSize) => {
    const scale = Math.min(viewport.width / 10, viewport.height / 10);
    return isMobile ? baseSize * scale * 0.7 : baseSize * scale;
  };

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text
          fontSize={getResponsiveSize(2.2)}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, isMobile ? 2.5 : 2, 0]}
          font="/fonts/consolas.woff"
        >
          ItzDevoo's
          <meshStandardMaterial
            attach="material"
            emissive="#14b8a6"
            emissiveIntensity={0.3}
          />
        </Text>
      </Float>

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          fontSize={getResponsiveSize(1.6)}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, isMobile ? 1.5 : -0.2, 0]}
          font="/fonts/consolas.woff"
        >
          Portfolio
          <meshStandardMaterial
            attach="material"
            emissive="#84cc16"
            emissiveIntensity={0.2}
          />
        </Text>
      </Float>

    </group>
  );
}

// Content sections
function ContentSection({ currentSection }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      const targetY = currentSection !== 'home' ? 0 : 50;
      const targetOpacity = currentSection !== 'home' ? 1 : 0;
      
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
      
      if (groupRef.current.material) {
        groupRef.current.material.opacity += (targetOpacity - groupRef.current.material.opacity) * 0.05;
      }
    }
  });

  const getSectionContent = () => {
    switch (currentSection) {
      case 'about':
        return (
          <group>
            <Text fontSize={1.5} color="#14b8a6" anchorX="center" position={[0, 3, 0]}>
              ABOUT
            </Text>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Torus args={[2, 0.3, 16, 100]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.3} />
              </Torus>
            </Float>
            {['React', 'Three.js', 'Next.js', 'Node.js'].map((skill, index) => (
              <Float key={skill} speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
                <group position={[
                  Math.cos((index / 4) * Math.PI * 2) * 4,
                  Math.sin((index / 4) * Math.PI * 2) * 2,
                  0
                ]}>
                  <Sphere args={[0.3]}>
                    <meshStandardMaterial color={`hsl(${index * 90}, 70%, 60%)`} />
                  </Sphere>
                  <Text fontSize={0.2} color="white" anchorX="center" position={[0, -0.8, 0]}>
                    {skill}
                  </Text>
                </group>
              </Float>
            ))}
          </group>
        );
      
      case 'work':
        return (
          <group>
            <Text fontSize={1.5} color="#84cc16" anchorX="center" position={[0, 3, 0]}>
              PROJECTS
            </Text>
            {[
              { color: '#14b8a6', emissive: '#0f766e' }, // Teal
              { color: '#84cc16', emissive: '#65a30d' }, // Lime Green  
              { color: '#6b7280', emissive: '#4b5563' }, // Grey
              { color: '#14b8a6', emissive: '#0f766e' }  // Teal again
            ].map((project, index) => (
              <Float key={index} speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
                <Box
                  args={[1.5, 1, 0.2]}
                  position={[
                    (index - 1.5) * 3,
                    Math.sin(index) * 0.5,
                    0
                  ]}
                >
                  <meshStandardMaterial
                    color={project.color}
                    emissive={project.emissive}
                    emissiveIntensity={0.2}
                  />
                </Box>
              </Float>
            ))}
          </group>
        );
      
      case 'contact':
        return (
          <group>
            <Text fontSize={1.5} color="#6b7280" anchorX="center" position={[0, 3, 0]}>
              CONTACT
            </Text>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
              <Octahedron args={[1.5]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#6b7280"
                  emissive="#6b7280"
                  emissiveIntensity={0.4}
                  roughness={0.2}
                  metalness={0.8}
                />
              </Octahedron>
            </Float>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
              <Sphere args={[0.4]} position={[-2, -1, 0]}>
                <meshStandardMaterial color="#ffffff" emissive="#14b8a6" emissiveIntensity={0.3} />
              </Sphere>
            </Float>
            <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
              <Box args={[0.6, 0.6, 0.6]} position={[2, -1, 0]}>
                <meshStandardMaterial color="#ffffff" emissive="#84cc16" emissiveIntensity={0.3} />
              </Box>
            </Float>
          </group>
        );
      
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef}>
      {getSectionContent()}
    </group>
  );
}

// Main scene component
export default function ModernScene({ currentSection, setCurrentSection, onHomeClick, onNexisClick }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isNexisPage = currentSection === 'nexis';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, 0, 10]} intensity={0.7} color="#ffffff" />
        <spotLight position={[5, 5, 5]} angle={0.6} penumbra={1} intensity={0.8} color="#ffffff" />

        <ModernParticles />
        <BackgroundGeometry />
        
        {!isNexisPage && (
          <>
            <ProjectsHeader isMobile={isMobile} />
            <NexisPreview isMobile={isMobile} onNexisClick={onNexisClick} />
            <HeroContent currentSection={currentSection} />
            <ContentSection currentSection={currentSection} />
          </>
        )}
        
        {isNexisPage && (
          <>
            <NexisParticlesComponent isMobile={isMobile} />
            <Text
              fontSize={isMobile ? 0.4 : 0.6}
              color="#84cc16"
              anchorX="center"
              anchorY="middle"
              position={[0, isMobile ? -2 : -2.5, 0]}
              font="/fonts/consolas.woff"
            >
              NEXIS
              <meshStandardMaterial
                attach="material"
                emissive="#84cc16"
                emissiveIntensity={0.3}
              />
            </Text>
            <Text
              fontSize={isMobile ? 0.25 : 0.35}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              position={[0, isMobile ? -2.5 : -3.2, 0]}
              font="/fonts/consolas.woff"
            >
              COMING SOON!
              <meshStandardMaterial
                attach="material"
                emissive="#ffffff"
                emissiveIntensity={0.1}
              />
            </Text>
          </>
        )}
        
        <ProfileButton onHomeClick={onHomeClick} isNexisPage={isNexisPage} />


        <fog attach="fog" args={['#000000', 10, 50]} />
      </Canvas>
    </div>
  );
}