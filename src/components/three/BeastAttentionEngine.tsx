import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface BeastAttentionEngineProps {
  scrollProgress: number; // 0 to 1 smooth scroll progress from Lenis/GSAP
  reducedMotion?: boolean;
}

// Procedural 3D Beast "Attention Engine" with 6 deconstructing components
function EngineAssembly({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftShellRef = useRef<THREE.Mesh>(null);
  const rightShellRef = useRef<THREE.Mesh>(null);
  const lightningSpineRef = useRef<THREE.Mesh>(null);
  const coreCrystalRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { mouse } = useThree();

  // 600 swirling atmospheric stardust particles
  const particleGeo = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00E5FF');
    const magenta = new THREE.Color('#FF1E66');
    const gold = new THREE.Color('#FFD000');
    const emerald = new THREE.Color('#00F076');

    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = i % 4 === 0 ? cyan : i % 4 === 1 ? magenta : i % 4 === 2 ? gold : emerald;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Organic mouse parallax
    const targetRotX = mouse.y * 0.25;
    const targetRotY = mouse.x * 0.35 + progress * Math.PI * 2.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

    // Dynamic exploded offsets calculated from scroll progress (0.0 -> 1.0)
    // Between 0.0 and 0.2: fully assembled
    // Between 0.2 and 0.6: explodes outward into component layers
    // Between 0.6 and 0.8: realigns into soundstage arena geometry
    // Between 0.8 and 1.0: dissolves into global emerald energy
    const explodeFactor = Math.sin(Math.min(1, Math.max(0, (progress - 0.1) / 0.7)) * Math.PI);

    // Left Shell: slides left and tilts open
    if (leftShellRef.current) {
      leftShellRef.current.position.x = THREE.MathUtils.lerp(leftShellRef.current.position.x, -1.8 * explodeFactor, 0.08);
      leftShellRef.current.position.z = THREE.MathUtils.lerp(leftShellRef.current.position.z, -0.6 * explodeFactor, 0.08);
      leftShellRef.current.rotation.y = THREE.MathUtils.lerp(leftShellRef.current.rotation.y, -0.4 * explodeFactor, 0.08);
    }

    // Right Shell: slides right and tilts open
    if (rightShellRef.current) {
      rightShellRef.current.position.x = THREE.MathUtils.lerp(rightShellRef.current.position.x, 1.8 * explodeFactor, 0.08);
      rightShellRef.current.position.z = THREE.MathUtils.lerp(rightShellRef.current.position.z, -0.6 * explodeFactor, 0.08);
      rightShellRef.current.rotation.y = THREE.MathUtils.lerp(rightShellRef.current.rotation.y, 0.4 * explodeFactor, 0.08);
    }

    // Central Lightning Bolt Spine: lifts upward and pulses
    if (lightningSpineRef.current) {
      lightningSpineRef.current.position.y = THREE.MathUtils.lerp(lightningSpineRef.current.position.y, 1.2 * explodeFactor, 0.08);
      lightningSpineRef.current.rotation.z += delta * 0.3;
    }

    // Core Crystal Heart: scales and exposes internal light
    if (coreCrystalRef.current) {
      const coreScale = 1.0 + explodeFactor * 0.4;
      coreCrystalRef.current.scale.lerp(new THREE.Vector3(coreScale, coreScale, coreScale), 0.08);
      coreCrystalRef.current.rotation.x += delta * 0.5;
      coreCrystalRef.current.rotation.y += delta * 0.7;
    }

    // Telemetry Rings: rotate and expand
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.25;
      ringsRef.current.rotation.x = Math.PI / 4 + explodeFactor * 0.5;
      const ringScale = 1.0 + explodeFactor * 0.6;
      ringsRef.current.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.08);
    }

    // Particle Swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
      particlesRef.current.rotation.x += delta * 0.04;
    }
  });

  // Color transitions based on level
  const isEmeraldPhase = progress > 0.85;

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-10, -5, -5]} intensity={1.8} color="#00E5FF" />
      <directionalLight position={[0, -10, 5]} intensity={1.5} color="#FF1E66" />
      <pointLight position={[0, 0, 0]} intensity={isEmeraldPhase ? 5.0 : 3.0} color={isEmeraldPhase ? '#00F076' : '#00E5FF'} distance={8} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Component 1: Left Faceted Panther Shell (Beast Cyan Chrome) */}
          <mesh ref={leftShellRef} position={[-0.45, 0, 0]}>
            <cylinderGeometry args={[0.9, 1.2, 2.0, 6, 1, false, 0, Math.PI]} />
            <meshStandardMaterial
              color="#00E5FF"
              metalness={0.92}
              roughness={0.12}
              emissive="#00E5FF"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Component 2: Right Faceted Panther Shell (Beast Cyan Chrome) */}
          <mesh ref={rightShellRef} position={[0.45, 0, 0]}>
            <cylinderGeometry args={[0.9, 1.2, 2.0, 6, 1, false, Math.PI, Math.PI]} />
            <meshStandardMaterial
              color="#00E5FF"
              metalness={0.92}
              roughness={0.12}
              emissive="#00E5FF"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Component 3: Iconic Signature Lightning Bolt Spine (Beast Laser Magenta) */}
          <mesh ref={lightningSpineRef} position={[0, 0, 0.4]}>
            <coneGeometry args={[0.35, 2.2, 4]} />
            <meshStandardMaterial
              color="#FF1E66"
              emissive="#FF1E66"
              emissiveIntensity={1.2}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>

          {/* Component 4: Core Crystal Heart (The Algorithm Engine) */}
          <mesh ref={coreCrystalRef} position={[0, 0, 0]}>
            <octahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial
              color={isEmeraldPhase ? '#00F076' : '#FFD000'}
              emissive={isEmeraldPhase ? '#00F076' : '#FFD000'}
              emissiveIntensity={1.4}
              wireframe
            />
          </mesh>

          {/* Component 5: Concentric Gyroscopic Rings */}
          <group ref={ringsRef}>
            <mesh>
              <torusGeometry args={[2.0, 0.025, 16, 100]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.8} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.3, 0.02, 16, 100]} />
              <meshStandardMaterial color="#FF1E66" emissive="#FF1E66" emissiveIntensity={0.8} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[2.6, 0.015, 16, 100]} />
              <meshStandardMaterial color="#FFFFFF" opacity={0.6} transparent />
            </mesh>
          </group>

          {/* Component 6: Swirling Stardust Particle Field */}
          <points ref={particlesRef} geometry={particleGeo}>
            <pointsMaterial
              size={0.035}
              vertexColors
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </Float>
    </>
  );
}

export const BeastAttentionEngine: React.FC<BeastAttentionEngineProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <EngineAssembly progress={scrollProgress} />
      </Canvas>
    </div>
  );
};
