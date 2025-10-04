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
  background: string;
  setBackground: (value: string) => void;
  soundOption: string;
  setSoundOption: (value: string) => void;
  transparentCards: boolean;
  setTransparentCards: (value: boolean) => void;
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
  background,
  setBackground,
  soundOption,
  setSoundOption,
  transparentCards,
  setTransparentCards,
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
      background={background}
      setBackground={setBackground}
      soundOption={soundOption}
      setSoundOption={setSoundOption}
      transparentCards={transparentCards}
      setTransparentCards={setTransparentCards}
    />
  );
};

export default Settings;
