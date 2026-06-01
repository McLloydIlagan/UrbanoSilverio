import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WatchModel({ scrollProgress }) {
  const groupRef = useRef();
  const caseRef = useRef();
  const dialRef = useRef();
  const bezelRef = useRef();
  const crownRef = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Idle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;

    // Scroll-driven rotation
    groupRef.current.rotation.y = scrollProgress.current * Math.PI * 2 + t * 0.05;

    // Subtle tilt
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.04 - 0.1;

    // Hands tick
    if (hourRef.current) hourRef.current.rotation.z = -t * 0.01;
    if (minuteRef.current) minuteRef.current.rotation.z = -t * 0.06;
  });

  const goldMat = new THREE.MeshStandardMaterial({ color: "#C9A84C", metalness: 0.95, roughness: 0.1 });
  const caseMat = new THREE.MeshStandardMaterial({ color: "#8a8a8a", metalness: 0.98, roughness: 0.05 });
  const dialMat = new THREE.MeshStandardMaterial({ color: "#0a0a0a", metalness: 0.3, roughness: 0.6 });
  const crystalMat = new THREE.MeshStandardMaterial({ color: "#aaddff", metalness: 0, roughness: 0, transparent: true, opacity: 0.15 });
  const strapMat = new THREE.MeshStandardMaterial({ color: "#1a0a00", metalness: 0, roughness: 0.9 });
  const handMat = new THREE.MeshStandardMaterial({ color: "#E8C97A", metalness: 0.9, roughness: 0.1 });

  return (
    <group ref={groupRef} scale={1.4}>
      {/* Case */}
      <mesh ref={caseRef} castShadow>
        <cylinderGeometry args={[1, 1, 0.28, 64]} />
        <primitive object={caseMat} attach="material" />
      </mesh>

      {/* Bezel */}
      <mesh ref={bezelRef} position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[1.02, 0.06, 16, 64]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Dial */}
      <mesh ref={dialRef} position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.02, 64]} />
        <primitive object={dialMat} attach="material" />
      </mesh>

      {/* Crystal */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.04, 64]} />
        <primitive object={crystalMat} attach="material" />
      </mesh>

      {/* Hour markers (12 dots) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.72;
        return (
          <mesh key={i} position={[Math.sin(angle) * r, 0.15, Math.cos(angle) * r]}>
            <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
        );
      })}

      {/* Hour hand */}
      <group ref={hourRef} position={[0, 0.17, 0]}>
        <mesh position={[0, 0, 0.22]}>
          <boxGeometry args={[0.04, 0.02, 0.44]} />
          <primitive object={handMat} attach="material" />
        </mesh>
      </group>

      {/* Minute hand */}
      <group ref={minuteRef} position={[0, 0.18, 0]}>
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[0.025, 0.02, 0.6]} />
          <primitive object={handMat} attach="material" />
        </mesh>
      </group>

      {/* Center cap */}
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Crown */}
      <mesh ref={crownRef} position={[1.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.18, 16]} />
        <primitive object={caseMat} attach="material" />
      </mesh>

      {/* Strap top */}
      <mesh position={[0, -0.02, 0.85]} castShadow>
        <boxGeometry args={[0.7, 0.22, 1.4]} />
        <primitive object={strapMat} attach="material" />
      </mesh>

      {/* Strap bottom */}
      <mesh position={[0, -0.02, -0.85]} castShadow>
        <boxGeometry args={[0.7, 0.22, 1.4]} />
        <primitive object={strapMat} attach="material" />
      </mesh>
    </group>
  );
}

export default function WatchCanvas() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      scrollProgress.current = progress;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full h-[420px] sm:h-[520px] relative" aria-label="3D watch model">
      {/* Glow behind canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
      />
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 40 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow color="#fff8e7" />
        <directionalLight position={[-4, 2, -4]} intensity={0.4} color="#C9A84C" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#E8C97A" />
        <Environment preset="studio" />
        <WatchModel scrollProgress={scrollProgress} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={8} blur={2} far={4} color="#000" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
