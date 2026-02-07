import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, Vector3, Color } from 'three';
import type { InstancedMesh } from 'three';
import { useSimulation } from '@/simulation/SimulationContext';
import { MAIN_PIPE_PATH, BYPASS_PIPE_PATH, MAX_FLOW } from '@/simulation/constants';

const PARTICLE_COUNT = 40;
const PARTICLE_SIZE = 0.032;

function getPositionOnPath(path: [number, number, number][], t: number): Vector3 {
  const ct = Math.max(0, Math.min(0.999, t));
  const totalSeg = path.length - 1;
  const seg = Math.floor(ct * totalSeg);
  const localT = ct * totalSeg - seg;
  const s = new Vector3(...path[seg]);
  const e = new Vector3(...path[Math.min(seg + 1, path.length - 1)]);
  return new Vector3().lerpVectors(s, e, localT);
}

interface ParticleFlowProps {
  path: [number, number, number][];
  flowRate: number;
  maxFlow: number;
  color?: string;
}

const ParticleFlow = ({ path, flowRate, maxFlow, color = '#4fc3f7' }: ParticleFlowProps) => {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const particlesT = useRef<number[]>(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => i / PARTICLE_COUNT)
  );
  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = (flowRate / maxFlow) * 0.25;

    particlesT.current.forEach((t, i) => {
      if (flowRate > 0.5) {
        particlesT.current[i] = (t + speed * delta) % 1;
      }
      const pos = getPositionOnPath(path, particlesT.current[i]);
      dummy.position.copy(pos);
      dummy.scale.setScalar(flowRate > 0.5 ? PARTICLE_SIZE : 0.0001);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={colorObj} transparent opacity={0.85} emissive={colorObj} emissiveIntensity={0.4} />
    </instancedMesh>
  );
};

const WaterParticles = () => {
  const { mainLineFlow, bypassFlow } = useSimulation();

  return (
    <group>
      <ParticleFlow path={MAIN_PIPE_PATH} flowRate={mainLineFlow} maxFlow={MAX_FLOW} />
      <ParticleFlow path={BYPASS_PIPE_PATH} flowRate={bypassFlow} maxFlow={MAX_FLOW * 0.3} color="#29b6f6" />
    </group>
  );
};

export default WaterParticles;
