import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logSession } from "@/components/SessionLogger";

interface TimerDisplayProps {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  roundsBeforeLongBreak: number;
  background: string;
  soundOption: string;
  onTimerStateChange?: (isRunning: boolean) => void;
}

export const TimerDisplay = ({
  workDuration,
  shortBreak,
  longBreak,
  roundsBeforeLongBreak,
  background,
  soundOption,
  onTimerStateChange,
}: TimerDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("pomobites-timer-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.timeLeft || workDuration * 60;
    }
    return workDuration * 60;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(() => {
    const saved = localStorage.getItem("pomobites-timer-state");
    if (saved) {
      return JSON.parse(saved).isBreak || false;
    }
    return false;
  });
  const [currentRound, setCurrentRound] = useState(() => {
    const saved = localStorage.getItem("pomobites-timer-state");
    if (saved) {
      return JSON.parse(saved).currentRound || 0;
    }
    return 0;
  });
  const [totalTime, setTotalTime] = useState(workDuration * 60);
  const [sessionStartTime, setSessionStartTime] = useState(workDuration * 60);

  useEffect(() => {
    localStorage.setItem("pomobites-timer-state", JSON.stringify({
      timeLeft,
      isBreak,
      currentRound
    }));
  }, [timeLeft, isBreak, currentRound]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed - play notification sound
      const playCompletionSound = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        let notes: number[] = [];
        
        if (soundOption === "chime") {
          notes = [523.25, 659.25, 783.99]; // C-E-G major chord
        } else if (soundOption === "bell") {
          notes = [659.25, 783.99, 1046.50]; // E-G-C high
        } else if (soundOption === "ding") {
          notes = [880.00, 1046.50]; // A-C
        }
        
        notes.forEach((frequency, index) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = 'sine';
          
          const startTime = audioContext.currentTime + (index * 0.15);
          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
          
          oscillator.start(startTime);
          oscillator.stop(startTime + 0.5);
        });
      };
      
      playCompletionSound();

      if (!isBreak) {
        // Work session ended - log it
        const sessionDuration = sessionStartTime;
        logSession(sessionDuration, "work");
        
        // Start break
        if (currentRound % roundsBeforeLongBreak === 0) {
          // Long break
          setTimeLeft(longBreak * 60);
          setTotalTime(longBreak * 60);
          setSessionStartTime(longBreak * 60);
        } else {
          // Short break
          setTimeLeft(shortBreak * 60);
          setTotalTime(shortBreak * 60);
          setSessionStartTime(shortBreak * 60);
        }
        setIsBreak(true);
      } else {
        // Break ended - log it, start work automatically
        logSession(sessionStartTime, "break");
        
        setTimeLeft(workDuration * 60);
        setTotalTime(workDuration * 60);
        setSessionStartTime(workDuration * 60);
        setIsBreak(false);
        const nextRound = currentRound + 1;
        // After completing round 4 (index 4), reset to 0
        setCurrentRound(nextRound >= roundsBeforeLongBreak ? 0 : nextRound);
        setIsRunning(true); // Auto-start after break
        onTimerStateChange?.(true);
        return;
      }
      setIsRunning(false);
      onTimerStateChange?.(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, currentRound, workDuration, shortBreak, longBreak, roundsBeforeLongBreak, soundOption]);

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
    setTotalTime(workDuration * 60);
    setSessionStartTime(workDuration * 60);
    setCurrentRound(0);
    localStorage.removeItem("pomobites-timer-state");
    onTimerStateChange?.(false);
  };

  const handleSkip = () => {
    if (!isBreak) {
      if (currentRound % roundsBeforeLongBreak === 0) {
        setTimeLeft(longBreak * 60);
        setTotalTime(longBreak * 60);
      } else {
        setTimeLeft(shortBreak * 60);
        setTotalTime(shortBreak * 60);
      }
      setIsBreak(true);
    } else {
      setTimeLeft(workDuration * 60);
      setTotalTime(workDuration * 60);
      setIsBreak(false);
      const nextRound = currentRound + 1;
      // After completing round 4, reset to 0
      setCurrentRound(nextRound >= roundsBeforeLongBreak ? 0 : nextRound);
    }
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const getBackgroundStyle = () => {
    if (background === "custom") {
      const customBg = localStorage.getItem("customBackground");
      return customBg ? { backgroundImage: `url(${customBg})`, backgroundSize: "cover", backgroundPosition: "center" } : {};
    }
    
    const backgrounds: Record<string, string> = {
      tomato: "linear-gradient(135deg, hsl(var(--bite-red)) 0%, hsl(var(--cafe-warm)) 100%)",
      cookie: "linear-gradient(135deg, hsl(30 60% 70%) 0%, hsl(35 50% 85%) 100%)",
      boba: "linear-gradient(135deg, hsl(280 40% 75%) 0%, hsl(290 35% 85%) 100%)",
      matcha: "linear-gradient(135deg, hsl(150 40% 65%) 0%, hsl(155 35% 80%) 100%)",
      cafe: "linear-gradient(135deg, hsl(25 45% 60%) 0%, hsl(30 40% 75%) 100%)",
    };
    
    return { background: backgrounds[background] || backgrounds.tomato };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 transition-all" style={getBackgroundStyle()}>
      <div className="relative">
        {/* Circular Progress */}
        <svg className="w-80 h-80 transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="hsl(var(--timer-ring))"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 140}`}
            strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-7xl font-bold tracking-tight">{formatTime(timeLeft)}</div>
          <div className="text-base font-semibold uppercase tracking-wider mt-3 text-primary">
            {isBreak ? "🍵 Snack Break" : "🍅 Taking a Bite"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-12 w-12 rounded-full"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          size="icon"
          onClick={() => {
            setIsRunning(!isRunning);
            onTimerStateChange?.(!isRunning);
          }}
          className="h-16 w-16 rounded-full"
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSkip}
          className="h-12 w-12 rounded-full"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Bite Counter */}
      <div className="mt-8 text-base">
        <span className="font-semibold text-primary">{currentRound}</span>
        <span className="text-muted-foreground"> of </span>
        <span className="font-semibold text-primary">{roundsBeforeLongBreak}</span>
        <span className="text-muted-foreground"> bites completed {Math.floor(currentRound / roundsBeforeLongBreak) > 0 ? "🍰" : "🍪"}</span>
      </div>
      
      {/* Snack Stack Progress */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: roundsBeforeLongBreak }).map((_, index) => {
          const cycleIndex = Math.floor(currentRound / roundsBeforeLongBreak);
          const snackIcon = cycleIndex === 0 ? "🍪" : cycleIndex === 1 ? "🍰" : cycleIndex === 2 ? "🍩" : "🧁";
          
          return (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                index < (currentRound % roundsBeforeLongBreak)
                  ? "bg-primary/20 scale-110" 
                  : "bg-secondary opacity-50"
              }`}
            >
              {index < (currentRound % roundsBeforeLongBreak) ? snackIcon : "⭕"}
            </div>
          );
        })}
      </div>
      
      {/* Motivational Message */}
      <div className="mt-6 text-sm text-muted-foreground italic max-w-md text-center">
        {isBreak 
          ? "Time to recharge with a tasty break! ☕" 
          : currentRound === 0 
            ? "Let's start munching through your tasks! 🎉"
            : "You're on a roll! Keep those bites coming! 💪"
        }
      </div>
    </div>
  );
};
