import { useEffect, useRef } from 'react';
import { useSimulation } from './SimulationContext';

export const useWindowAPI = () => {
  const sim = useSimulation();
  const simRef = useRef(sim);
  simRef.current = sim;

  useEffect(() => {
    (window as any).WaterPumpingSystem = {
      startPump: () => simRef.current.startPump(),
      stopPump: () => simRef.current.stopPump(),
      setValvePosition: (pos: number) => simRef.current.setValvePosition(pos),
      getFlowValue: () => simRef.current.flowRate,
      getPressureValue: () => simRef.current.dischargePressure,
      getSystemState: () => ({
        pumpRunning: simRef.current.pumpRunning,
        pumpRPM: simRef.current.pumpRPM,
        valvePosition: simRef.current.valvePosition,
        flowRate: simRef.current.flowRate,
        mainLineFlow: simRef.current.mainLineFlow,
        bypassFlow: simRef.current.bypassFlow,
        dischargePressure: simRef.current.dischargePressure,
        afterValvePressure: simRef.current.afterValvePressure,
        tankLevel: simRef.current.tankLevel,
      }),
      resetSimulation: () => simRef.current.resetSimulation(),
    };

    return () => {
      delete (window as any).WaterPumpingSystem;
    };
  }, []);
};

/** Drop this component anywhere inside SimulationProvider to expose window.WaterPumpingSystem */
export const WindowAPIBridge = () => {
  useWindowAPI();
  return null;
};
