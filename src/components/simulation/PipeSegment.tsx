import { useMemo } from 'react';
import { Vector3, Quaternion } from 'three';
import { PIPE_RADIUS } from '@/simulation/constants';

interface PipeSegmentProps {
  start: [number, number, number];
  end: [number, number, number];
  radius?: number;
  color?: string;
}

const PipeSegment = ({ start, end, radius = PIPE_RADIUS, color = '#9e9e9e' }: PipeSegmentProps) => {
  const { position, quaternion, length } = useMemo(() => {
    const s = new Vector3(...start);
    const e = new Vector3(...end);
    const mid = new Vector3().lerpVectors(s, e, 0.5);
    const dir = new Vector3().subVectors(e, s);
    const len = dir.length();
    const q = new Quaternion();
    if (len > 0.001) {
      q.setFromUnitVectors(new Vector3(0, 1, 0), dir.clone().normalize());
    }
    return { position: [mid.x, mid.y, mid.z] as [number, number, number], quaternion: q, length: len };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

export default PipeSegment;
