import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsPanelProps {
  workDuration: number;
  setWorkDuration: (value: number) => void;
  shortBreak: number;
  setShortBreak: (value: number) => void;
  longBreak: number;
  setLongBreak: (value: number) => void;
  roundsBeforeLongBreak: number;
  setRoundsBeforeLongBreak: (value: number) => void;
}

export const SettingsPanel = ({
  workDuration,
  setWorkDuration,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak,
  roundsBeforeLongBreak,
  setRoundsBeforeLongBreak,
}: SettingsPanelProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Timer Settings</CardTitle>
          <CardDescription>Customize your Pomodoro timer to fit your workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Work Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="work-duration" className="text-base">
                Work Duration
              </Label>
              <span className="text-2xl font-semibold text-primary">{workDuration} min</span>
            </div>
            <Slider
              id="work-duration"
              min={1}
              max={60}
              step={1}
              value={[workDuration]}
              onValueChange={(value) => setWorkDuration(value[0])}
              className="cursor-pointer"
            />
          </div>

          {/* Short Break */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="short-break" className="text-base">
                Short Break
              </Label>
              <span className="text-2xl font-semibold text-primary">{shortBreak} min</span>
            </div>
            <Slider
              id="short-break"
              min={1}
              max={30}
              step={1}
              value={[shortBreak]}
              onValueChange={(value) => setShortBreak(value[0])}
              className="cursor-pointer"
            />
          </div>

          {/* Long Break */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="long-break" className="text-base">
                Long Break
              </Label>
              <span className="text-2xl font-semibold text-primary">{longBreak} min</span>
            </div>
            <Slider
              id="long-break"
              min={5}
              max={60}
              step={1}
              value={[longBreak]}
              onValueChange={(value) => setLongBreak(value[0])}
              className="cursor-pointer"
            />
          </div>

          {/* Rounds Before Long Break */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="rounds" className="text-base">
                Rounds Before Long Break
              </Label>
              <span className="text-2xl font-semibold text-primary">{roundsBeforeLongBreak}</span>
            </div>
            <Slider
              id="rounds"
              min={2}
              max={10}
              step={1}
              value={[roundsBeforeLongBreak]}
              onValueChange={(value) => setRoundsBeforeLongBreak(value[0])}
              className="cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
