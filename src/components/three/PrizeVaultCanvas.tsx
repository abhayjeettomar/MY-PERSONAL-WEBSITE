import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { fireCashCannon } from '@/components/ui/CashCannon';

interface PrizeVaultCanvasProps {
  onBreach?: () => void;
  reducedMotion?: boolean;
}

function ModernVaultScene({ onBreach }: { onBreach?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  // Floating golden satellite gems
  const satellites = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.4;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 2) * 0.4,
        z: Math.sin(angle) * radius,
      };
    });
  }, []);

  // Swirling luxury stardust particles
  const particleGeo = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse tilt parallax
    groupRef.current.rotation.y += delta * (hovered ? 0.7 : 0.35);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.35,
      0.06
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mouse.x * 0.35,
      0.06
    );

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x += delta * 0.15;
    }

    if (coreRef.current) {
      const targetScale = hovered ? 1.08 : 1.0;
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    fireCashCannon();
    onBreach?.();
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 8]} intensity={2.2} color="#FFFFFF" />
      <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#00F5FF" />
      <pointLight position={[0, 0, 4]} intensity={hovered ? 4.5 : 2.5} color="#FFD000" distance={10} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <group ref={groupRef}>
          {/* Main Sleek Glossy Diamond Vault Cube */}
          <mesh
            ref={coreRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
          >
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color={hovered ? '#1E2330' : '#0E1118'}
              roughness={0.08}
              metalness={0.95}
            />
          </mesh>

          {/* Golden Wireframe Facet Casing */}
          <mesh scale={[1.52, 1.52, 1.52]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#FFD000"
              wireframe
              emissive="#FFD000"
              emissiveIntensity={hovered ? 0.8 : 0.3}
            />
          </mesh>

          {/* Cyan Energy Core */}
          <mesh scale={[0.7, 0.7, 0.7]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#00F5FF"
              emissive="#00F5FF"
              emissiveIntensity={hovered ? 1.6 : 0.9}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Orbiting Halo Ring */}
          <group ref={ringRef}>
            <mesh>
              <torusGeometry args={[2.5, 0.02, 16, 100]} />
              <meshBasicMaterial color={hovered ? '#FFD000' : '#00F5FF'} opacity={0.7} transparent />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[2.8, 0.015, 16, 100]} />
              <meshBasicMaterial color="#FF1E66" opacity={0.4} transparent />
            </mesh>
          </group>

          {/* Orbiting Golden Mystery Satellite Boxes */}
          {satellites.map((sat, i) => (
            <mesh key={i} position={[sat.x, sat.y, sat.z]} rotation={[0.4 * i, 0.6 * i, 0]}>
              <boxGeometry args={[0.26, 0.18, 0.1]} />
              <meshStandardMaterial color="#FFD000" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}

          {/* Swirling Golden Stardust */}
          <points geometry={particleGeo}>
            <pointsMaterial
              size={0.04}
              color="#FFD000"
              transparent
              opacity={hovered ? 0.85 : 0.55}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </Float>
    </>
  );
}

function FallbackCard({ onBreach }: { onBreach?: () => void }) {
  return (
    <div
      onClick={onBreach}
      className="w-full h-full flex items-center justify-center cursor-pointer p-8 select-none"
    >
      <div className="relative w-64 h-64 rounded-3xl bg-gradient-to-br from-[#00F5FF]/10 via-[#FFD000]/10 to-transparent border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:border-[#00F5FF]/50 transition-all">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFD000] to-[#FF9900] flex items-center justify-center shadow-[0_0_40px_rgba(255,208,0,0.4)]">
          <span className="text-3xl font-black text-[#07080C]">$5M</span>
        </div>
        <div className="mt-4 text-xs font-bold text-white tracking-widest uppercase">
          CLICK TO BREACH VAULT
        </div>
      </div>
    </div>
  );
}

export const PrizeVaultCanvas: React.FC<PrizeVaultCanvasProps> = ({
  onBreach,
  reducedMotion = false,
}) => {
  const [webGlFailed, setWebGlFailed] = useState(false);

  if (reducedMotion || webGlFailed) {
    return <FallbackCard onBreach={onBreach} />;
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] relative select-none">
      <Suspense fallback={<FallbackCard onBreach={onBreach} />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            if (!gl) setWebGlFailed(true);
          }}
          className="cursor-pointer"
        >
          <ModernVaultScene onBreach={onBreach} />
        </Canvas>
      </Suspense>

      {/* Floating Modern Pill Callout */}
      <div className="absolute bottom-4 right-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs font-medium text-white/80">
        <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
        <span>INTERACTIVE 3D VAULT // CLICK TO EXPLODE</span>
      </div>
    </div>
  );
};
