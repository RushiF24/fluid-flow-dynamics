import type { SimulationState } from './types';

export const PIPE_RADIUS = 0.06;
export const MAX_RPM = 3000;
export const MAX_FLOW = 150; // GPM
export const MAX_PRESSURE = 65; // PSI
export const RPM_RAMP_SPEED = 1500; // RPM per second
export const TANK_DRAIN_RATE = 0.5; // % per second at max flow

export const INITIAL_STATE: SimulationState = {
  pumpRunning: false,
  pumpRPM: 0,
  valvePosition: 100,
  flowRate: 0,
  mainLineFlow: 0,
  bypassFlow: 0,
  dischargePressure: 0,
  afterValvePressure: 0,
  tankLevel: 85,
};

// Pipe path waypoints [x, y, z]
export const MAIN_PIPE_PATH: [number, number, number][] = [
  [-5, -2.8, 0],    // pump outlet (inside tank)
  [-5, 0, 0],       // tank top
  [-5, 0.7, 0],     // above ground
  [-3, 0.7, 0],     // flow meter position
  [-1, 0.7, 0],     // pressure transmitter position
  [0, 0.7, 0],      // bypass branch point
  [1.5, 0.7, 0],    // valve center
  [3, 0.7, 0],      // bypass merge point
  [6, 0.7, 0],      // building base
  [6, 3, 0],        // floor 1
  [6, 5.5, 0],      // floor 2
  [6, 8, 0],        // floor 3 / top
];

export const BYPASS_PIPE_PATH: [number, number, number][] = [
  [0, 0.7, 0],      // branch from main
  [0, 1.8, 0],      // up
  [3, 1.8, 0],      // across
  [3, 0.7, 0],      // down to merge
];

// Component positions
export const TANK_POSITION: [number, number, number] = [-5, -1.75, 0];
export const TANK_RADIUS = 1.3;
export const TANK_HEIGHT = 3.5;

export const PUMP_POSITION: [number, number, number] = [-5, -2.8, 0];
export const FLOW_METER_POSITION: [number, number, number] = [-3, 0.7, 0];
export const PRESSURE_TX_POSITION: [number, number, number] = [-1, 0.7, 0];
export const VALVE_POSITION: [number, number, number] = [1.5, 0.7, 0];
export const BUILDING_POSITION: [number, number, number] = [6, 4, 0];
