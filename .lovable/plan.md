

# 3D Water Pumping System Simulation – POC Plan

## Overview
An interactive, browser-based 3D simulation of an underground water pumping and distribution system. The simulation will feature a cross-section cutaway view showing an underground UGR tank with a submersible pump inside, piping with animated particle-based water flow, an actuated valve, bypass line, flow meter, pressure transmitter, and a discharge line rising into a transparent 3-story building.

Built with **React Three Fiber** (Three.js for React) for 3D rendering, using the uploaded `.glb` model as a visual reference for component styling and layout.

---

## Page 1: Main Simulation View (Full Screen)

### 3D Scene (Right ~75% of screen)
- **Cross-section cutaway ground plane** — flat terrain with a clean cut showing underground vs. above-ground, using distinct earth/soil coloring for the underground section and a lighter surface for above ground
- **UGR Tank (Underground)** — fully below ground, visible through the cutaway. Semi-transparent cylindrical tank showing water level inside. No stands. Top rim sits at or slightly below ground level
- **Submersible Pump** — positioned INSIDE the tank, submerged in the water. Visually distinct with a glowing indicator when running
- **Discharge line** — pipe exits tank upward through ground, travels above ground, and rises vertically into the building
- **Transparent 3-story building** — glass-like building structure where you can see the discharge pipe routing through each floor level
- **Actuated valve** — on the main discharge line, with visual open/close animation
- **Bypass line** — branching off the main line before the valve, reconnecting after it
- **Flow meter** — placed on the main line, with a visual indicator/readout
- **Pressure transmitter** — placed at a measurement point, displaying live pressure values
- **Pipe labels** — floating text labels identifying each component
- **Animated water flow** — small blue particles moving through pipes, speed tied to flow rate, direction showing flow path. Particles stop when pump is off or valve is closed
- **Camera controls** — orbit, zoom, pan for full scene exploration
- **Basic lighting** — ambient + directional light for clarity and depth

### Control Panel (Left sidebar ~25% of screen)
- **Header**: "Water Pumping System – Control Panel"
- **Pump Control Section**:
  - Status indicator (Running / Stopped) with color coding
  - START / STOP buttons
  - RPM display
- **Valve Control Section**:
  - Position slider (0% closed → 100% open)
  - Quick-set buttons: CLOSE, 25%, 50%, 75%, OPEN
  - Visual valve position indicator
- **Process Readings Section** (live updating cards):
  - Flow Rate (GPM)
  - Pump Discharge Pressure (PSI)
  - After-Valve Pressure (PSI)
  - Tank Water Level (%)
- **System Status Section**:
  - Pump state, Valve state, Flow state indicators
- **Reset Simulation** button

---

## Simulation Logic (Behind the Scenes)

### Pump Behavior
- When started: generates flow, particles begin moving, RPM ramps up
- When stopped: flow drops to zero, particles stop, RPM drops to zero
- Flow rate depends on pump state

### Valve Behavior
- Valve position (0–100%) controls flow restriction
- At 0%: no flow passes through main line (bypass still available)
- At 100%: full unrestricted flow
- Partial positions: proportional flow reduction
- Visual valve disc rotates to match position

### Flow & Pressure Logic
- Flow rate = pump output × valve restriction factor
- Discharge pressure responds to pump state
- After-valve pressure responds to valve position
- Tank level slowly decreases when pump is running (water being pumped out)
- All values update in real-time on the control panel

### Bypass Line Logic
- When main valve is closed/restricted, flow can be visually shown going through bypass
- Bypass provides alternative flow path

---

## JavaScript Control API

Exposed on `window.WaterPumpingSystem` for external control and testing:
- `startPump()` / `stopPump()`
- `setValvePosition(0–100)`
- `getFlowValue()` / `getPressureValue()`
- `getSystemState()` — returns full simulation state
- `resetSimulation()` — resets to default state

All simulation state is readable and writable, no hard-coded sequences.

---

## Visual Feedback Summary
- **Flow animation**: Blue particles moving through pipes, speed proportional to flow value
- **Pump glow**: Subtle glow/animation when pump is running
- **Valve rotation**: Valve disc visually rotates with position changes
- **Color-coded states**: Green = flowing, Red = stopped, Yellow = partial/throttled
- **Real-time numeric overlays**: Values update on control panel cards

---

## Architecture (Modular & Scalable)
- **Rendering layer**: React Three Fiber components for each 3D element (tank, pump, pipes, valve, building)
- **Simulation layer**: Custom React hooks managing physics/flow logic, state management via React context
- **Control/API layer**: JavaScript API exposed on window object, control panel connected via shared state
- Clean separation allows scaling to full plant model with multiple pumps, valves, and meters

---

## Technical Notes
- Uses `@react-three/fiber` v8 + `@react-three/drei` v9 for 3D rendering
- The uploaded `.glb` file will be used as visual reference for component proportions and styling
- Optimized for smooth real-time performance in standard desktop browsers
- All 3D components are procedurally generated (not dependent on external model files) for maximum flexibility and control

