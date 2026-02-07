import PipeSegment from './PipeSegment';
import { MAIN_PIPE_PATH, BYPASS_PIPE_PATH, PIPE_RADIUS } from '@/simulation/constants';

const PipeSystem = () => {
  return (
    <group>
      {/* Main discharge line */}
      {MAIN_PIPE_PATH.slice(0, -1).map((start, i) => (
        <PipeSegment key={`m-${i}`} start={start} end={MAIN_PIPE_PATH[i + 1]} />
      ))}

      {/* Main pipe joints */}
      {MAIN_PIPE_PATH.map((pt, i) => (
        <mesh key={`mj-${i}`} position={pt}>
          <sphereGeometry args={[PIPE_RADIUS * 1.35, 10, 10]} />
          <meshStandardMaterial color="#9e9e9e" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}

      {/* Bypass line */}
      {BYPASS_PIPE_PATH.slice(0, -1).map((start, i) => (
        <PipeSegment key={`b-${i}`} start={start} end={BYPASS_PIPE_PATH[i + 1]} color="#78909c" />
      ))}

      {/* Bypass joints */}
      {BYPASS_PIPE_PATH.map((pt, i) => (
        <mesh key={`bj-${i}`} position={pt}>
          <sphereGeometry args={[PIPE_RADIUS * 1.35, 10, 10]} />
          <meshStandardMaterial color="#78909c" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

export default PipeSystem;
