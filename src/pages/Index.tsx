import { TimerDisplay } from "@/components/TimerDisplay";

interface IndexProps {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  roundsBeforeLongBreak: number;
}

const Index = ({ workDuration, shortBreak, longBreak, roundsBeforeLongBreak }: IndexProps) => {
  return (
    <TimerDisplay
      workDuration={workDuration}
      shortBreak={shortBreak}
      longBreak={longBreak}
      roundsBeforeLongBreak={roundsBeforeLongBreak}
    />
  );
};

export default Index;
