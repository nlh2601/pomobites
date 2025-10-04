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

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <SessionLogger transparent={transparent} />
        </div>
        <div className="pointer-events-auto">
          <TodoList transparent={transparent} />
        </div>
      </div>
    </div>
  );
};

export default Index;
