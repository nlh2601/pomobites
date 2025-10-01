import { SettingsPanel } from "@/components/SettingsPanel";

interface SettingsProps {
  workDuration: number;
  setWorkDuration: (value: number) => void;
  shortBreak: number;
  setShortBreak: (value: number) => void;
  longBreak: number;
  setLongBreak: (value: number) => void;
  roundsBeforeLongBreak: number;
  setRoundsBeforeLongBreak: (value: number) => void;
}

const Settings = ({
  workDuration,
  setWorkDuration,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak,
  roundsBeforeLongBreak,
  setRoundsBeforeLongBreak,
}: SettingsProps) => {
  return (
    <SettingsPanel
      workDuration={workDuration}
      setWorkDuration={setWorkDuration}
      shortBreak={shortBreak}
      setShortBreak={setShortBreak}
      longBreak={longBreak}
      setLongBreak={setLongBreak}
      roundsBeforeLongBreak={roundsBeforeLongBreak}
      setRoundsBeforeLongBreak={setRoundsBeforeLongBreak}
    />
  );
};

export default Settings;
