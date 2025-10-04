import { TimerDisplay } from "@/components/TimerDisplay";
import { TodoList } from "@/components/TodoList";
import { SessionLogger } from "@/components/SessionLogger";

interface IndexProps {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  roundsBeforeLongBreak: number;
  background: string;
  soundOption: string;
  onTimerStateChange: (isRunning: boolean) => void;
  transparent?: boolean;
}

const Index = ({ workDuration, shortBreak, longBreak, roundsBeforeLongBreak, background, soundOption, onTimerStateChange, transparent = false }: IndexProps) => {
  return (
    <div className="relative min-h-screen">
      <TimerDisplay
        workDuration={workDuration}
        shortBreak={shortBreak}
        longBreak={longBreak}
        roundsBeforeLongBreak={roundsBeforeLongBreak}
        background={background}
        soundOption={soundOption}
        onTimerStateChange={onTimerStateChange}
      />

      <div className="pointer-events-auto fixed right-6 bottom-[20rem] z-10">
        <SessionLogger transparent={transparent} />
      </div>
      <div className="pointer-events-auto fixed right-6 bottom-6 z-10">
        <TodoList transparent={transparent} />
      </div>
    </div>
  );
};

export default Index;
