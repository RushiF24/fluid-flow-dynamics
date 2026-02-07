import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Ground from './Ground';
import Tank from './Tank';
import Pump from './Pump';
import PipeSystem from './PipeSystem';
import Valve from './Valve';
import Instruments from './Instruments';
import Building from './Building';
import WaterParticles from './WaterParticles';
import Labels from './Labels';

const Scene = () => {
  return (
    <Canvas
      camera={{ position: [2, 8, 16], fov: 45, near: 0.1, far: 100 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a0e1a']} />
      <fog attach="fog" args={['#0a0e1a', 25, 55]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 15, 10]} intensity={1.1} />
      <directionalLight position={[-8, 8, -6]} intensity={0.25} />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        target={[0, 1.5, 0]}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={5}
        maxDistance={35}
      />

      <Ground />
      <Tank />
      <Pump />
      <PipeSystem />
      <Valve />
      <Instruments />
      <Building />
      <WaterParticles />
      <Labels />
    </Canvas>
  );
};

export default Scene;
