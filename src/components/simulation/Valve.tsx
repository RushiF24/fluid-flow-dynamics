import { useSimulation } from '@/simulation/SimulationContext';
import { VALVE_POSITION, PIPE_RADIUS } from '@/simulation/constants';

const Valve = () => {
  const { valvePosition } = useSimulation();
  // 100 = fully open (disc parallel to flow, 0 rotation), 0 = closed (disc perpendicular, π/2)
  const discRotation = ((100 - valvePosition) / 100) * (Math.PI / 2);

  return (
    <group position={VALVE_POSITION}>
      {/* Valve body */}
      <mesh>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#ff9800" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Valve disc — rotates with position */}
      <mesh rotation={[0, 0, discRotation]}>
        <cylinderGeometry args={[PIPE_RADIUS + 0.015, PIPE_RADIUS + 0.015, 0.025, 16]} />
        <meshStandardMaterial color="#e65100" />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
        <meshStandardMaterial color="#bdbdbd" metalness={0.9} />
      </mesh>

      {/* Actuator box */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.22, 0.18, 0.22]} />
        <meshStandardMaterial color="#424242" metalness={0.75} roughness={0.25} />
      </mesh>

      {/* Actuator indicator LED */}
      <mesh position={[0.12, 0.55, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color={valvePosition === 100 ? '#4caf50' : valvePosition === 0 ? '#f44336' : '#ffb300'}
          emissive={valvePosition === 100 ? '#4caf50' : valvePosition === 0 ? '#f44336' : '#ffb300'}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

export default Valve;
