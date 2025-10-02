import { useState } from "react";
import { TimerDisplay } from "@/components/TimerDisplay";
import { TodoList } from "@/components/TodoList";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SessionLogger } from "@/components/SessionLogger";

interface IndexProps {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  roundsBeforeLongBreak: number;
  background: string;
  soundOption: string;
}

const Index = ({ workDuration, shortBreak, longBreak, roundsBeforeLongBreak, background, soundOption }: IndexProps) => {
  const [timerRunning, setTimerRunning] = useState(false);

  return (
    <div className="relative min-h-screen">
      <TimerDisplay
        workDuration={workDuration}
        shortBreak={shortBreak}
        longBreak={longBreak}
        roundsBeforeLongBreak={roundsBeforeLongBreak}
        background={background}
        soundOption={soundOption}
        onTimerStateChange={setTimerRunning}
      />
      
      <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-10">
        <MusicPlayer autoPlayOnTimer={false} timerRunning={timerRunning} />
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-10">
        <SessionLogger />
        <TodoList />
      </div>
    </div>
  );
};

export default Index;
