import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Materials (created once, shared) ────────────────────────────────────────
function useMaterials() {
  return useMemo(() => ({
    steel: new THREE.MeshStandardMaterial({
      color: "#9a9a9a", metalness: 0.98, roughness: 0.08,
      envMapIntensity: 1.2,
    }),
    steelBrushed: new THREE.MeshStandardMaterial({
      color: "#888", metalness: 0.95, roughness: 0.25,
    }),
    gold: new THREE.MeshStandardMaterial({
      color: "#C9A84C", metalness: 0.97, roughness: 0.08,
    }),
    goldDark: new THREE.MeshStandardMaterial({
      color: "#8B6914", metalness: 0.95, roughness: 0.12,
    }),
    dialWhite: new THREE.MeshStandardMaterial({
      color: "#e8e8e8", metalness: 0.1, roughness: 0.5,
    }),
    crystal: new THREE.MeshPhysicalMaterial({
      color: "#c8e8ff", metalness: 0, roughness: 0,
      transmission: 0.92, thickness: 0.08,
      transparent: true, opacity: 0.18,
      envMapIntensity: 2,
    }),
    movement: new THREE.MeshStandardMaterial({
      color: "#b87333", metalness: 0.9, roughness: 0.15,
    }),
    gearGold: new THREE.MeshStandardMaterial({
      color: "#D4A843", metalness: 0.95, roughness: 0.1,
    }),
    handSilver: new THREE.MeshStandardMaterial({
      color: "#d0d0d0", metalness: 0.98, roughness: 0.05,
    }),
    ruby: new THREE.MeshStandardMaterial({
      color: "#cc1111", metalness: 0.3, roughness: 0.1,
      emissive: "#440000", emissiveIntensity: 0.3,
    }),
    braceletLink: new THREE.MeshStandardMaterial({
      color: "#8c8c8c", metalness: 0.97, roughness: 0.1,
    }),
    braceletCenter: new THREE.MeshStandardMaterial({
      color: "#aaaaaa", metalness: 0.95, roughness: 0.22,
    }),
  }), []);
}

// ─── Octagonal Case ───────────────────────────────────────────────────────────
function OctagonalCase({ mat }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const r = 1.05, cut = 0.38;
    s.moveTo(r - cut, r);
    s.lineTo(-(r - cut), r);
    s.lineTo(-r, r - cut);
    s.lineTo(-r, -(r - cut));
    s.lineTo(-(r - cut), -r);
    s.lineTo(r - cut, -r);
    s.lineTo(r, -(r - cut));
    s.lineTo(r, r - cut);
    s.closePath();
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.32, bevelEnabled: true,
    bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4,
  }), []);

  return (
    <mesh castShadow receiveShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <primitive object={mat.steelBrushed} attach="material" />
    </mesh>
  );
}

// ─── Bezel ring ───────────────────────────────────────────────────────────────
function Bezel({ mat }) {
  const shape = useMemo(() => {
    const outer = new THREE.Shape();
    const r = 1.06, cut = 0.37;
    outer.moveTo(r - cut, r); outer.lineTo(-(r - cut), r);
    outer.lineTo(-r, r - cut); outer.lineTo(-r, -(r - cut));
    outer.lineTo(-(r - cut), -r); outer.lineTo(r - cut, -r);
    outer.lineTo(r, -(r - cut)); outer.lineTo(r, r - cut);
    outer.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.88, 0, Math.PI * 2, true);
    outer.holes.push(hole);
    return outer;
  }, []);

  return (
    <mesh position={[0, 0, 0.34]} castShadow>
      <extrudeGeometry args={[shape, { depth: 0.04, bevelEnabled: false }]} />
      <primitive object={mat.steel} attach="material" />
    </mesh>
  );
}

// ─── Dial ring (white) ────────────────────────────────────────────────────────
function DialRing({ mat }) {
  return (
    <mesh position={[0, 0, 0.31]}>
      <ringGeometry args={[0.72, 0.87, 64]} />
      <primitive object={mat.dialWhite} attach="material" />
    </mesh>
  );
}

// ─── Hour markers on dial ring ────────────────────────────────────────────────
function HourMarkers({ mat }) {
  return (
    <group position={[0, 0, 0.335]}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r = 0.795;
        const isMain = i % 3 === 0;
        return (
          <mesh key={i}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <boxGeometry args={[isMain ? 0.025 : 0.012, isMain ? 0.1 : 0.06, 0.008]} />
            <primitive object={mat.steel} attach="material" />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Skeleton bridges (the geometric cutout frame) ────────────────────────────
function SkeletonBridges({ mat }) {
  const bridges = useMemo(() => [
    // Main cross bridges
    { pos: [0, 0, 0.28], rot: [0, 0, 0],           size: [1.3, 0.055, 0.025] },
    { pos: [0, 0, 0.28], rot: [0, 0, Math.PI / 2], size: [1.3, 0.055, 0.025] },
    { pos: [0, 0, 0.28], rot: [0, 0, Math.PI / 4], size: [1.2, 0.045, 0.025] },
    { pos: [0, 0, 0.28], rot: [0, 0, -Math.PI / 4], size: [1.2, 0.045, 0.025] },
    // Outer ring segments
    { pos: [0.55, 0.3, 0.28],  rot: [0, 0, 0.5],  size: [0.38, 0.04, 0.02] },
    { pos: [-0.55, 0.3, 0.28], rot: [0, 0, -0.5], size: [0.38, 0.04, 0.02] },
    { pos: [0.55, -0.3, 0.28], rot: [0, 0, -0.5], size: [0.38, 0.04, 0.02] },
    { pos: [-0.55, -0.3, 0.28],rot: [0, 0, 0.5],  size: [0.38, 0.04, 0.02] },
    // Small accent bridges
    { pos: [0.3, 0.55, 0.28],  rot: [0, 0, 1.1],  size: [0.28, 0.035, 0.018] },
    { pos: [-0.3, 0.55, 0.28], rot: [0, 0, -1.1], size: [0.28, 0.035, 0.018] },
    { pos: [0.3, -0.55, 0.28], rot: [0, 0, -1.1], size: [0.28, 0.035, 0.018] },
    { pos: [-0.3, -0.55, 0.28],rot: [0, 0, 1.1],  size: [0.28, 0.035, 0.018] },
  ], []);

  return (
    <group>
      {bridges.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={b.rot}>
          <boxGeometry args={b.size} />
          <primitive object={mat.steelBrushed} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ─── Gears (visible movement) ─────────────────────────────────────────────────
function Gear({ position, radius, teeth, thickness, mat, rotSpeed }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * rotSpeed;
  });

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const toothH = radius * 0.18;
    const toothW = (Math.PI * 2) / teeth * 0.4;
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const a1 = a - toothW / 2;
      const a2 = a + toothW / 2;
      if (i === 0) shape.moveTo(Math.cos(a1) * radius, Math.sin(a1) * radius);
      else shape.lineTo(Math.cos(a1) * radius, Math.sin(a1) * radius);
      shape.lineTo(Math.cos(a1) * (radius + toothH), Math.sin(a1) * (radius + toothH));
      shape.lineTo(Math.cos(a2) * (radius + toothH), Math.sin(a2) * (radius + toothH));
      shape.lineTo(Math.cos(a2) * radius, Math.sin(a2) * radius);
    }
    shape.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, 0, radius * 0.3, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
  }, [radius, teeth, thickness]);

  return (
    <mesh ref={ref} position={position} geometry={geo}>
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ─── Movement plate (copper/bronze base) ─────────────────────────────────────
function MovementPlate({ mat }) {
  return (
    <mesh position={[0, 0, 0.22]}>
      <cylinderGeometry args={[0.68, 0.68, 0.018, 64]} rotation={[Math.PI / 2, 0, 0]} />
      <primitive object={mat.movement} attach="material" />
    </mesh>
  );
}

// ─── Ruby jewels ─────────────────────────────────────────────────────────────
function RubyJewels({ mat }) {
  const positions = [
    [0, 0, 0.26], [0.28, 0.18, 0.26], [-0.28, 0.18, 0.26],
    [0.28, -0.18, 0.26], [-0.28, -0.18, 0.26],
  ];
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.028, 0.028, 0.02, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <primitive object={mat.ruby} attach="material" />
        </mesh>
      ))}
    </>
  );
}

// ─── Watch hands ─────────────────────────────────────────────────────────────
function WatchHands({ mat }) {
  const hourRef = useRef();
  const minRef = useRef();
  const secRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (hourRef.current) hourRef.current.rotation.z = -t * 0.008;
    if (minRef.current) minRef.current.rotation.z = -t * 0.05;
    if (secRef.current) secRef.current.rotation.z = -t * 0.6;
  });

  return (
    <group position={[0, 0, 0.36]}>
      {/* Hour hand */}
      <group ref={hourRef}>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.038, 0.36, 0.012]} />
          <primitive object={mat.handSilver} attach="material" />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.038, 0.12, 0.012]} />
          <primitive object={mat.handSilver} attach="material" />
        </mesh>
      </group>
      {/* Minute hand */}
      <group ref={minRef}>
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[0.025, 0.52, 0.01]} />
          <primitive object={mat.handSilver} attach="material" />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.025, 0.12, 0.01]} />
          <primitive object={mat.handSilver} attach="material" />
        </mesh>
      </group>
      {/* Second hand */}
      <group ref={secRef}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.01, 0.6, 0.008]} />
          <primitive object={mat.gold} attach="material" />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.01, 0.2, 0.008]} />
          <primitive object={mat.gold} attach="material" />
        </mesh>
      </group>
      {/* Center cap */}
      <mesh position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.038, 0.038, 0.022, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <primitive object={mat.steel} attach="material" />
      </mesh>
    </group>
  );
}

// ─── Crown ────────────────────────────────────────────────────────────────────
function Crown({ mat }) {
  return (
    <group position={[1.12, 0, 0.16]} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.065, 0.065, 0.22, 20]} />
        <primitive object={mat.steelBrushed} attach="material" />
      </mesh>
      {/* Knurling rings */}
      {[-0.06, 0, 0.06].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.065, 0.012, 8, 20]} />
          <primitive object={mat.steel} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ─── Pushers (chronograph) ────────────────────────────────────────────────────
function Pushers({ mat }) {
  return (
    <>
      <group position={[1.1, 0.45, 0.16]} rotation={[0, 0, Math.PI / 2]}>
        <mesh><cylinderGeometry args={[0.045, 0.045, 0.18, 16]} /><primitive object={mat.steel} attach="material" /></mesh>
      </group>
      <group position={[1.1, -0.45, 0.16]} rotation={[0, 0, Math.PI / 2]}>
        <mesh><cylinderGeometry args={[0.045, 0.045, 0.18, 16]} /><primitive object={mat.steel} attach="material" /></mesh>
      </group>
    </>
  );
}

// ─── Steel Bracelet ───────────────────────────────────────────────────────────
function BraceletLink({ mat, position, rotation, scale = [1, 1, 1] }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Center brushed link */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.58, 0.22, 0.09]} />
        <primitive object={mat.braceletCenter} attach="material" />
      </mesh>
      {/* Side polished links */}
      <mesh position={[0.22, 0, 0.01]}>
        <boxGeometry args={[0.14, 0.22, 0.07]} />
        <primitive object={mat.braceletLink} attach="material" />
      </mesh>
      <mesh position={[-0.22, 0, 0.01]}>
        <boxGeometry args={[0.14, 0.22, 0.07]} />
        <primitive object={mat.braceletLink} attach="material" />
      </mesh>
    </group>
  );
}

function Bracelet({ mat }) {
  const topLinks = [];
  const botLinks = [];
  const linkCount = 6;
  const linkSpacing = 0.24;
  const startZ = 1.08;

  for (let i = 0; i < linkCount; i++) {
    const z = startZ + i * linkSpacing;
    const taper = Math.max(0.7, 1 - i * 0.04);
    topLinks.push(
      <BraceletLink key={`t${i}`} mat={mat} position={[0, 0, z]} rotation={[0, 0, 0]} scale={[taper, taper, 1]} />
    );
    botLinks.push(
      <BraceletLink key={`b${i}`} mat={mat} position={[0, 0, -z]} rotation={[0, 0, 0]} scale={[taper, taper, 1]} />
    );
  }

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {topLinks}
      {botLinks}
      {/* Clasp */}
      <mesh position={[0, 0, startZ + linkCount * linkSpacing]}>
        <boxGeometry args={[0.55, 0.2, 0.12]} />
        <primitive object={mat.steelBrushed} attach="material" />
      </mesh>
    </group>
  );
}

// ─── Full Watch Model ─────────────────────────────────────────────────────────
function SkeletonWatch({ scrollProgress }) {
  const groupRef = useRef();
  const mat = useMaterials();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.07;
    groupRef.current.rotation.y = scrollProgress.current * Math.PI * 2 + Math.sin(t * 0.12) * 0.15;
    groupRef.current.rotation.x = -0.15 + Math.sin(t * 0.25) * 0.04;
  });

  return (
    <group ref={groupRef} scale={1.3} rotation={[Math.PI / 2, 0, 0]}>
      {/* Bracelet (behind case) */}
      <Bracelet mat={mat} />

      {/* Case body */}
      <OctagonalCase mat={mat} />

      {/* Bezel */}
      <Bezel mat={mat} />

      {/* Dial ring */}
      <DialRing mat={mat} />

      {/* Hour markers */}
      <HourMarkers mat={mat} />

      {/* Movement plate */}
      <MovementPlate mat={mat} />

      {/* Skeleton bridges */}
      <SkeletonBridges mat={mat} />

      {/* Gears — visible through skeleton */}
      <Gear position={[0.18, 0.12, 0.25]}   radius={0.14} teeth={18} thickness={0.018} mat={mat.gearGold}  rotSpeed={0.4} />
      <Gear position={[-0.22, 0.08, 0.25]}  radius={0.10} teeth={14} thickness={0.016} mat={mat.gearGold}  rotSpeed={-0.7} />
      <Gear position={[0.05, -0.22, 0.25]}  radius={0.12} teeth={16} thickness={0.016} mat={mat.gearGold}  rotSpeed={0.55} />
      <Gear position={[-0.15, -0.15, 0.25]} radius={0.08} teeth={12} thickness={0.014} mat={mat.goldDark}  rotSpeed={-1.1} />
      <Gear position={[0.28, -0.1, 0.25]}   radius={0.07} teeth={10} thickness={0.014} mat={mat.gearGold}  rotSpeed={1.4} />
      <Gear position={[-0.28, 0.22, 0.25]}  radius={0.09} teeth={13} thickness={0.014} mat={mat.goldDark}  rotSpeed={-0.9} />

      {/* Ruby jewels */}
      <RubyJewels mat={mat} />

      {/* Watch hands */}
      <WatchHands mat={mat} />

      {/* Crystal glass */}
      <mesh position={[0, 0, 0.38]}>
        <cylinderGeometry args={[0.86, 0.86, 0.04, 64]} rotation={[Math.PI / 2, 0, 0]} />
        <primitive object={mat.crystal} attach="material" />
      </mesh>

      {/* Crown & pushers */}
      <Crown mat={mat} />
      <Pushers mat={mat} />
    </group>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────
export default function WatchCanvas() {
  const scrollProgress = useRef(0);

  const handleScroll = () => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    scrollProgress.current = Math.max(0, Math.min(1, -rect.top / rect.height));
  };

  return (
    <div
      className="w-full h-[440px] sm:h-[560px] relative"
      aria-label="3D skeleton watch model"
      onMouseEnter={() => window.addEventListener("scroll", handleScroll, { passive: true })}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(168,169,173,0.07) 0%, transparent 70%)" }}
      />
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 38 }}
        shadows
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          window.addEventListener("scroll", handleScroll, { passive: true });
        }}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 4]}   intensity={1.8} castShadow color="#fff5e0" shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#c8d8ff" />
        <pointLight       position={[0, 5, 2]}   intensity={1.0} color="#ffffff" />
        <pointLight       position={[2, -2, 3]}  intensity={0.4} color="#E8C97A" />
        <spotLight        position={[0, 8, 0]}   intensity={0.6} angle={0.4} penumbra={0.8} color="#ffffff" castShadow />

        <Environment preset="studio" />

        <SkeletonWatch scrollProgress={scrollProgress} />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.55} scale={10} blur={2.5} far={5} color="#000000"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  );
}