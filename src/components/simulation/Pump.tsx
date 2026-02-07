import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { useSimulation } from '@/simulation/SimulationContext';
import { PUMP_POSITION } from '@/simulation/constants';

const Pump = () => {
  const { pumpRunning, pumpRPM } = useSimulation();
  const impellerRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (impellerRef.current && pumpRPM > 0) {
      impellerRef.current.rotation.y += (pumpRPM / 3000) * delta * 15;
    }
  });

  return (
    <group position={PUMP_POSITION}>
      {/* Pump body */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 12]} />
        <meshStandardMaterial color="#37474f" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Motor housing */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.35, 12]} />
        <meshStandardMaterial color="#263238" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Spinning impeller indicator */}
      <mesh ref={impellerRef} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 6, 16]} />
        <meshStandardMaterial color="#90a4ae" metalness={0.9} />
      </mesh>

      {/* Glow when running */}
      {pumpRunning && (
        <pointLight position={[0, 0, 0]} color="#4fc3f7" intensity={2} distance={2.5} />
      )}

      {/* Status LED */}
      <mesh position={[0.28, 0.4, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color={pumpRunning ? '#4caf50' : '#f44336'}
          emissive={pumpRunning ? '#4caf50' : '#f44336'}
          emissiveIntensity={0.9}
        />
      </mesh>
    </group>
  );
};

export default Pump;
