import { DoubleSide } from 'three';
import { useSimulation } from '@/simulation/SimulationContext';
import { TANK_POSITION, TANK_RADIUS, TANK_HEIGHT } from '@/simulation/constants';

const Tank = () => {
  const { tankLevel } = useSimulation();
  const waterHeight = (tankLevel / 100) * TANK_HEIGHT * 0.85;

  return (
    <group position={TANK_POSITION}>
      {/* Tank shell — semi-transparent */}
      <mesh>
        <cylinderGeometry args={[TANK_RADIUS, TANK_RADIUS, TANK_HEIGHT, 32, 1, true]} />
        <meshStandardMaterial color="#607d8b" transparent opacity={0.25} side={DoubleSide} />
      </mesh>

      {/* Tank bottom */}
      <mesh position={[0, -TANK_HEIGHT / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[TANK_RADIUS, 32]} />
        <meshStandardMaterial color="#455a64" />
      </mesh>

      {/* Tank top rim */}
      <mesh position={[0, TANK_HEIGHT / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[TANK_RADIUS - 0.08, TANK_RADIUS + 0.08, 32]} />
        <meshStandardMaterial color="#78909c" metalness={0.8} />
      </mesh>

      {/* Water inside tank */}
      <mesh position={[0, -TANK_HEIGHT / 2 + waterHeight / 2 + 0.02, 0]}>
        <cylinderGeometry args={[TANK_RADIUS - 0.03, TANK_RADIUS - 0.03, waterHeight, 32]} />
        <meshStandardMaterial color="#1e88e5" transparent opacity={0.55} />
      </mesh>
    </group>
  );
};

export default Tank;
