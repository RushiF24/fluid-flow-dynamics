import { useSimulation } from '@/simulation/SimulationContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReadingCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div className="rounded-md bg-secondary/60 p-2.5 text-center">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="mt-0.5 text-xl font-mono font-bold text-primary">{value}</div>
    <div className="text-[10px] text-muted-foreground">{unit}</div>
  </div>
);

const StatusDot = ({ status }: { status: 'active' | 'stopped' | 'partial' }) => {
  const cls =
    status === 'active'
      ? 'bg-success'
      : status === 'stopped'
        ? 'bg-destructive'
        : 'bg-warning';
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
};

const ControlPanel = () => {
  const {
    pumpRunning,
    pumpRPM,
    valvePosition,
    flowRate,
    dischargePressure,
    afterValvePressure,
    tankLevel,
    startPump,
    stopPump,
    setValvePosition,
    resetSimulation,
  } = useSimulation();

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-card p-4 space-y-3">
      {/* Header */}
      <div className="border-b border-border pb-3">
        <h1 className="text-base font-bold text-primary tracking-wide">Water Pumping System</h1>
        <p className="text-[11px] text-muted-foreground">Control Panel</p>
      </div>

      {/* Pump Control */}
      <Card className="border-border">
        <CardHeader className="px-3 pb-2 pt-3">
          <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider">
            Pump Control
            <Badge
              variant={pumpRunning ? 'default' : 'destructive'}
              className="text-[10px] px-1.5 py-0"
            >
              {pumpRunning ? 'Running' : 'Stopped'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={startPump}
              disabled={pumpRunning}
              className="flex-1 bg-success text-success-foreground hover:bg-success/90 disabled:opacity-40"
            >
              START
            </Button>
            <Button
              size="sm"
              onClick={stopPump}
              disabled={!pumpRunning}
              variant="destructive"
              className="flex-1"
            >
              STOP
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            RPM: <span className="font-mono text-foreground">{Math.round(pumpRPM)}</span>
          </p>
        </CardContent>
      </Card>

      {/* Valve Control */}
      <Card className="border-border">
        <CardHeader className="px-3 pb-2 pt-3">
          <CardTitle className="text-xs uppercase tracking-wider">Valve Control</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-3">
          <p className="text-xs text-muted-foreground">
            Position: <span className="font-mono text-foreground">{valvePosition}%</span>
          </p>
          <Slider
            value={[valvePosition]}
            onValueChange={([v]) => setValvePosition(v)}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex flex-wrap gap-1">
            {[
              { label: 'CLOSE', value: 0 },
              { label: '25%', value: 25 },
              { label: '50%', value: 50 },
              { label: '75%', value: 75 },
              { label: 'OPEN', value: 100 },
            ].map(({ label, value }) => (
              <Button
                key={value}
                size="sm"
                variant={valvePosition === value ? 'default' : 'outline'}
                className="h-7 px-2 text-[10px]"
                onClick={() => setValvePosition(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Readings */}
      <Card className="border-border">
        <CardHeader className="px-3 pb-2 pt-3">
          <CardTitle className="text-xs uppercase tracking-wider">Process Readings</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="grid grid-cols-2 gap-2">
            <ReadingCard label="Flow Rate" value={flowRate.toFixed(1)} unit="GPM" />
            <ReadingCard label="Disch. Press." value={dischargePressure.toFixed(1)} unit="PSI" />
            <ReadingCard label="After Valve" value={afterValvePressure.toFixed(1)} unit="PSI" />
            <ReadingCard label="Tank Level" value={tankLevel.toFixed(1)} unit="%" />
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="border-border">
        <CardHeader className="px-3 pb-2 pt-3">
          <CardTitle className="text-xs uppercase tracking-wider">System Status</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <StatusDot status={pumpRunning ? 'active' : 'stopped'} />
            <span className="text-muted-foreground">Pump:</span>
            <span className="text-foreground">{pumpRunning ? 'Running' : 'Stopped'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <StatusDot status={valvePosition > 0 ? (valvePosition === 100 ? 'active' : 'partial') : 'stopped'} />
            <span className="text-muted-foreground">Valve:</span>
            <span className="text-foreground">{valvePosition}% Open</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <StatusDot status={flowRate > 0.5 ? 'active' : 'stopped'} />
            <span className="text-muted-foreground">Flow:</span>
            <span className="text-foreground">{flowRate > 0.5 ? 'Active' : 'No Flow'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Reset */}
      <Button variant="outline" className="w-full mt-auto" onClick={resetSimulation}>
        Reset Simulation
      </Button>
    </div>
  );
};

export default ControlPanel;
