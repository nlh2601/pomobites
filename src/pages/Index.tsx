import { TimerDisplay } from "@/components/TimerDisplay";

interface IndexProps {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  roundsBeforeLongBreak: number;
  background: string;
  soundOption: string;
}

const Index = ({ workDuration, shortBreak, longBreak, roundsBeforeLongBreak, background, soundOption }: IndexProps) => {
  return (
    <TimerDisplay
      workDuration={workDuration}
      shortBreak={shortBreak}
      longBreak={longBreak}
      roundsBeforeLongBreak={roundsBeforeLongBreak}
      background={background}
      soundOption={soundOption}
    />
  );
};

export default Index;
