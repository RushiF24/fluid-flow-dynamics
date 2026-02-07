import { Text } from '@react-three/drei';
import { useSimulation } from '@/simulation/SimulationContext';
import { FLOW_METER_POSITION, PRESSURE_TX_POSITION } from '@/simulation/constants';

const FlowMeter = () => {
  const { flowRate } = useSimulation();

  return (
    <group position={FLOW_METER_POSITION}>
      {/* Meter body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.28, 12]} />
        <meshStandardMaterial color="#1565c0" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Display screen */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.12]} />
        <meshStandardMaterial color="#0d1117" />
      </mesh>

      {/* Value readout */}
      <Text position={[0, 0.18, 0.07]} fontSize={0.06} color="#4fc3f7" anchorX="center" anchorY="middle">
        {flowRate.toFixed(1)} GPM
      </Text>
    </group>
  );
};

const PressureTransmitter = () => {
  const { dischargePressure } = useSimulation();

  return (
    <group position={PRESSURE_TX_POSITION}>
      {/* Transmitter body */}
      <mesh>
        <boxGeometry args={[0.15, 0.22, 0.15]} />
        <meshStandardMaterial color="#6a1b9a" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Gauge face */}
      <mesh position={[0, 0.05, 0.08]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#0d1117" />
      </mesh>

      {/* Readout */}
      <Text position={[0, 0.22, 0]} fontSize={0.055} color="#ce93d8" anchorX="center" anchorY="bottom">
        {dischargePressure.toFixed(1)} PSI
      </Text>

      {/* Connection to pipe */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#bdbdbd" metalness={0.8} />
      </mesh>
    </group>
  );
};

const Instruments = () => (
  <group>
    <FlowMeter />
    <PressureTransmitter />
  </group>
);

export default Instruments;
