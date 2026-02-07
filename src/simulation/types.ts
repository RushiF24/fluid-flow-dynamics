export interface SimulationState {
  pumpRunning: boolean;
  pumpRPM: number;
  valvePosition: number;
  flowRate: number;
  mainLineFlow: number;
  bypassFlow: number;
  dischargePressure: number;
  afterValvePressure: number;
  tankLevel: number;
}

export interface SimulationActions {
  startPump: () => void;
  stopPump: () => void;
  setValvePosition: (position: number) => void;
  resetSimulation: () => void;
}

export type SimulationContextType = SimulationState & SimulationActions;
