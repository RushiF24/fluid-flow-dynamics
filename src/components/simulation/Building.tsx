import { DoubleSide, BoxGeometry } from 'three';
import { Edges } from '@react-three/drei';
import { BUILDING_POSITION } from '@/simulation/constants';

const Building = () => {
  const floorYs = [0, 2.7, 5.4]; // relative to building base (y=0 of the group)

  return (
    <group position={[BUILDING_POSITION[0], 0, BUILDING_POSITION[2]]}>
      {/* Glass shell */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[3, 8, 3]} />
        <meshStandardMaterial
          color="#bbdefb"
          transparent
          opacity={0.1}
          side={DoubleSide}
          depthWrite={false}
        />
        <Edges color="#64b5f6" lineWidth={1} />
      </mesh>

      {/* Floor slabs */}
      {floorYs.map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[3.05, 0.12, 3.05]} />
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.45} />
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[3.15, 0.14, 3.15]} />
        <meshStandardMaterial color="#9e9e9e" transparent opacity={0.55} />
      </mesh>

      {/* Vertical columns (corners) */}
      {[[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].map(([x, z], i) => (
        <mesh key={`col-${i}`} position={[x, 4, z]}>
          <boxGeometry args={[0.1, 8, 0.1]} />
          <meshStandardMaterial color="#90a4ae" transparent opacity={0.5} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

export default Building;
