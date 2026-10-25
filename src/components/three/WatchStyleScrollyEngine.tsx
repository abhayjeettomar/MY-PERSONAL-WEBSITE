import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface WatchStyleScrollyEngineProps {
  progress: number; // 0.0 to 1.0 (local scrub progress through the 550vh track)
  interactiveRotation?: { x: number; y: number };
}

// 3D Extruded Lightning Bolt Geometry for the MrBeast Tourbillon Spine
function createLightningShape() {
  const shape = new THREE.Shape();
  // Classic sharp lightning zigzag
  shape.moveTo(0, 1.4);
  shape.lineTo(0.45, 0.2);
  shape.lineTo(0.08, 0.2);
  shape.lineTo(0.55, -1.4);
  shape.lineTo(-0.15, -0.15);
  shape.lineTo(0.18, -0.15);
  shape.closePath();
  return shape;
}

// The Luxury Deconstructible Attention Calibre Assembly
function CalibreAssembly({ progress, manualRot }: { progress: number; manualRot: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftCasingRef = useRef<THREE.Group>(null);
  const rightCasingRef = useRef<THREE.Group>(null);
  const sapphireRingRef = useRef<THREE.Mesh>(null);
  const lightningCoreRef = useRef<THREE.Mesh>(null);
  const gyroRing1Ref = useRef<THREE.Mesh>(null);
  const gyroRing2Ref = useRef<THREE.Mesh>(null);
  const gyroRing3Ref = useRef<THREE.Mesh>(null);
  const heartRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { mouse } = useThree();

  // Lightning Bolt Extruded Geometry
  const lightningGeo = useMemo(() => {
    const shape = createLightningShape();
    const extrudeSettings = {
      steps: 1,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 3,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  // Swirling luxury metallic stardust particles
  const particleGeo = useMemo(() => {
    const count = 650;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00E5FF');
    const pink = new THREE.Color('#FF1E66');
    const white = new THREE.Color('#FFFFFF');
    const emerald = new THREE.Color('#00F076');

    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = i % 4 === 0 ? cyan : i % 4 === 1 ? pink : i % 4 === 2 ? white : emerald;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth base rotation driven by scroll progress + gentle mouse orbit parallax
    const targetY = progress * Math.PI * 3.8 + manualRot.y * 0.4 + mouse.x * 0.35;
    const targetX = Math.sin(progress * Math.PI) * 0.4 + manualRot.x * 0.3 - mouse.y * 0.25;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);

    // Exploded View Physics:
    // Act 1 (0 to 0.18): Closed Assembled Monolith
    // Act 2 (0.18 to 0.45): Deep Deconstruction - Casings separate outward on X by 2.5 units
    // Act 3 (0.45 to 0.70): Core Exposure & Gyroscope Alignment
    // Act 4 (0.70 to 0.88): Lightning Tourbillon Elevation & Arena Spotlight
    // Act 5 (0.88 to 1.0): Full Calibre Expansion & Emerald Energy Bloom
    const explodeFactor = Math.sin(Math.min(1, Math.max(0, (progress - 0.12) / 0.76)) * Math.PI);

    // 1. Left Casing Half (Beast Cyan Titanium Shell): Moves left & tilts outward
    if (leftCasingRef.current) {
      leftCasingRef.current.position.x = THREE.MathUtils.lerp(leftCasingRef.current.position.x, -2.4 * explodeFactor, 0.09);
      leftCasingRef.current.position.z = THREE.MathUtils.lerp(leftCasingRef.current.position.z, -0.9 * explodeFactor, 0.09);
      leftCasingRef.current.rotation.y = THREE.MathUtils.lerp(leftCasingRef.current.rotation.y, -0.45 * explodeFactor, 0.09);
    }

    // 2. Right Casing Half (Beast Cyan Titanium Shell): Moves right & tilts outward
    if (rightCasingRef.current) {
      rightCasingRef.current.position.x = THREE.MathUtils.lerp(rightCasingRef.current.position.x, 2.4 * explodeFactor, 0.09);
      rightCasingRef.current.position.z = THREE.MathUtils.lerp(rightCasingRef.current.position.z, -0.9 * explodeFactor, 0.09);
      rightCasingRef.current.rotation.y = THREE.MathUtils.lerp(rightCasingRef.current.rotation.y, 0.45 * explodeFactor, 0.09);
    }

    // 3. Sapphire Crystal Glass Bezel Ring: Slides forward
    if (sapphireRingRef.current) {
      sapphireRingRef.current.position.z = THREE.MathUtils.lerp(sapphireRingRef.current.position.z, 1.4 * explodeFactor, 0.09);
      sapphireRingRef.current.rotation.z += delta * 0.2;
    }

    // 4. Central Lightning Bolt Tourbillon Core: Lifts upward and spins
    if (lightningCoreRef.current) {
      lightningCoreRef.current.position.y = THREE.MathUtils.lerp(lightningCoreRef.current.position.y, 1.6 * explodeFactor, 0.09);
      lightningCoreRef.current.rotation.y += delta * 1.2;
      lightningCoreRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    // 5. Gyroscopic Balance Rings: Independent counter-rotations
    if (gyroRing1Ref.current) gyroRing1Ref.current.rotation.z += delta * 0.45;
    if (gyroRing2Ref.current) gyroRing2Ref.current.rotation.x += delta * 0.35;
    if (gyroRing3Ref.current) gyroRing3Ref.current.rotation.y += delta * 0.28;

    // 6. Algorithmic Silicon Heart: Pulses and expands in Act 5
    if (heartRef.current) {
      const heartScale = 1.0 + explodeFactor * 0.6;
      heartRef.current.scale.lerp(new THREE.Vector3(heartScale, heartScale, heartScale), 0.1);
      heartRef.current.rotation.x += delta * 0.7;
      heartRef.current.rotation.y += delta * 0.5;
    }

    // Metallic Stardust Constellation swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.06;
      particlesRef.current.rotation.x += delta * 0.02;
    }
  });

  const isEmerald = progress > 0.85;

  return (
    <>
      {/* Precision Studio Spotlights (Luxury Supercar / Watch Style) */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 15]} intensity={2.8} color="#FFFFFF" />
      <directionalLight position={[-14, -8, -10]} intensity={2.2} color="#00E5FF" />
      <directionalLight position={[12, -10, 10]} intensity={2.2} color="#FF1E66" />
      <pointLight
        position={[0, 0, 0]}
        intensity={isEmerald ? 7.0 : 4.0}
        color={isEmerald ? '#00F076' : '#00E5FF'}
        distance={12}
      />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
        <group ref={groupRef}>
          {/* Part 1: Left Outer Titanium Casing Half (Beast Cyan) */}
          <group ref={leftCasingRef} position={[-0.45, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[1.15, 1.45, 2.3, 8, 1, false, 0, Math.PI]} />
              <meshStandardMaterial
                color="#00E5FF"
                metalness={0.94}
                roughness={0.12}
                emissive="#00E5FF"
                emissiveIntensity={0.22}
              />
            </mesh>
            {/* Outer Accent Rim */}
            <mesh position={[0, 1.15, 0]}>
              <torusGeometry args={[1.15, 0.05, 16, 40, Math.PI]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
            </mesh>
          </group>

          {/* Part 2: Right Outer Titanium Casing Half (Beast Cyan) */}
          <group ref={rightCasingRef} position={[0.45, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[1.15, 1.45, 2.3, 8, 1, false, Math.PI, Math.PI]} />
              <meshStandardMaterial
                color="#00E5FF"
                metalness={0.94}
                roughness={0.12}
                emissive="#00E5FF"
                emissiveIntensity={0.22}
              />
            </mesh>
            {/* Outer Accent Rim */}
            <mesh position={[0, 1.15, 0]} rotation={[0, Math.PI, 0]}>
              <torusGeometry args={[1.15, 0.05, 16, 40, Math.PI]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.08} />
            </mesh>
          </group>

          {/* Part 3: Sapphire Crystal Glass Bezel Ring */}
          <mesh ref={sapphireRingRef} position={[0, 0, 0.2]}>
            <torusGeometry args={[1.9, 0.07, 24, 90]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.94}
              opacity={1}
              transparent
              roughness={0.04}
              ior={1.77} // Sapphire crystal refractive index
              metalness={0.05}
              thickness={0.5}
            />
          </mesh>

          {/* Part 4: Central Lightning Bolt Tourbillon Core (Hot Laser Magenta) */}
          <mesh ref={lightningCoreRef} geometry={lightningGeo} position={[0, 0, 0.35]}>
            <meshStandardMaterial
              color="#FF1E66"
              emissive="#FF1E66"
              emissiveIntensity={2.2}
              metalness={0.85}
              roughness={0.1}
            />
          </mesh>

          {/* Part 5: Triple Gyroscopic Calibre Balance Rings */}
          <group>
            {/* Ring 1 - Cyan Outer Gyro */}
            <mesh ref={gyroRing1Ref}>
              <torusGeometry args={[2.3, 0.035, 16, 120]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.95} />
            </mesh>

            {/* Ring 2 - Hot Magenta Mid Gyro */}
            <mesh ref={gyroRing2Ref} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.6, 0.03, 16, 120]} />
              <meshStandardMaterial color="#FF1E66" emissive="#FF1E66" emissiveIntensity={0.95} />
            </mesh>

            {/* Ring 3 - Platinum Inner Track */}
            <mesh ref={gyroRing3Ref} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[2.9, 0.025, 16, 120]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.96} roughness={0.08} />
            </mesh>
          </group>

          {/* Part 6: Algorithmic Heart (Glowing Silicon Crystal Core) */}
          <mesh ref={heartRef}>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color={isEmerald ? '#00F076' : '#FF1E66'}
              emissive={isEmerald ? '#00F076' : '#FF1E66'}
              emissiveIntensity={2.0}
              wireframe
            />
          </mesh>

          {/* Metallic Atmospheric Particles */}
          <points ref={particlesRef} geometry={particleGeo}>
            <pointsMaterial
              size={0.04}
              vertexColors
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </Float>
    </>
  );
}

export const WatchStyleScrollyEngine: React.FC<WatchStyleScrollyEngineProps> = ({
  progress,
  interactiveRotation = { x: 0, y: 0 },
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <CalibreAssembly progress={progress} manualRot={interactiveRotation} />
      </Canvas>
    </div>
  );
};
