import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { SimulationState, SimulationContextType } from './types';
import { INITIAL_STATE, MAX_RPM, MAX_FLOW, MAX_PRESSURE, RPM_RAMP_SPEED, TANK_DRAIN_RATE } from './constants';

const SimulationContext = createContext<SimulationContextType | null>(null);

export const useSimulation = (): SimulationContextType => {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider');
  return ctx;
};

function updateSimulation(state: SimulationState, delta: number): SimulationState {
  const dt = Math.min(delta, 0.1);

  // RPM ramping
  let pumpRPM = state.pumpRPM;
  if (state.pumpRunning) {
    pumpRPM = Math.min(MAX_RPM, pumpRPM + RPM_RAMP_SPEED * dt);
  } else {
    pumpRPM = Math.max(0, pumpRPM - RPM_RAMP_SPEED * dt);
  }

  // Flow calculations
  const pumpOutput = (pumpRPM / MAX_RPM) * MAX_FLOW;
  const valveFactor = state.valvePosition / 100;
  const mainLineFlow = pumpOutput * valveFactor;
  const bypassFlow = pumpOutput * (1 - valveFactor) * 0.3;
  const flowRate = mainLineFlow + bypassFlow;

  // Pressure
  const dischargePressure = (pumpRPM / MAX_RPM) * MAX_PRESSURE;
  const afterValvePressure = dischargePressure * valveFactor;

  // Tank level
  let tankLevel = state.tankLevel;
  if (flowRate > 0) {
    tankLevel = Math.max(5, tankLevel - (flowRate / MAX_FLOW) * TANK_DRAIN_RATE * dt);
  }

  return {
    ...state,
    pumpRPM,
    flowRate,
    mainLineFlow,
    bypassFlow,
    dischargePressure,
    afterValvePressure,
    tankLevel,
  };
}

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SimulationState>({ ...INITIAL_STATE });
  const stateRef = useRef<SimulationState>(state);

  // Keep ref in sync with latest state (including user actions)
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    let lastTime = performance.now();
    let animId: number;

    const tick = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const updated = updateSimulation(stateRef.current, delta);
      stateRef.current = updated;
      setState(updated);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const startPump = useCallback(() => {
    setState(s => {
      const next = { ...s, pumpRunning: true };
      stateRef.current = next;
      return next;
    });
  }, []);

  const stopPump = useCallback(() => {
    setState(s => {
      const next = { ...s, pumpRunning: false };
      stateRef.current = next;
      return next;
    });
  }, []);

  const setValvePosition = useCallback((pos: number) => {
    setState(s => {
      const next = { ...s, valvePosition: Math.max(0, Math.min(100, pos)) };
      stateRef.current = next;
      return next;
    });
  }, []);

  const resetSimulation = useCallback(() => {
    const fresh = { ...INITIAL_STATE };
    stateRef.current = fresh;
    setState(fresh);
  }, []);

  const contextValue: SimulationContextType = {
    ...state,
    startPump,
    stopPump,
    setValvePosition,
    resetSimulation,
  };

  return (
    <SimulationContext.Provider value={contextValue}>
      {children}
    </SimulationContext.Provider>
  );
};
