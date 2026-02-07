import { SimulationProvider } from '@/simulation/SimulationContext';
import { WindowAPIBridge } from '@/simulation/useWindowAPI';
import ControlPanel from '@/components/ControlPanel';
import Scene from '@/components/simulation/Scene';

const Index = () => {
  return (
    <SimulationProvider>
      <WindowAPIBridge />
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        {/* Control Panel — left sidebar */}
        <div className="w-80 min-w-[280px] flex-shrink-0 border-r border-border">
          <ControlPanel />
        </div>

        {/* 3D Scene — fills remaining space */}
        <div className="flex-1">
          <Scene />
        </div>
      </div>
    </SimulationProvider>
  );
};

export default Index;
