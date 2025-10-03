import { useEffect, useState } from "react";
import { Calendar, Flame } from "lucide-react";
import { DraggableCard } from "@/components/DraggableCard";

export interface StudySession {
  date: string;
  duration: number;
  type: "work" | "break";
}

export const SessionLogger = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("pomobites-sessions");
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    calculateStreak();
  }, [sessions]);

  const calculateStreak = () => {
    if (sessions.length === 0) {
      setStreak(0);
      return;
    }

    const workSessions = sessions.filter(s => s.type === "work");
    const dates = [...new Set(workSessions.map(s => s.date.split('T')[0]))].sort().reverse();
    
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < dates.length; i++) {
      const date = new Date(dates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (dates[i] === expectedDateStr) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    setStreak(currentStreak);
  };

  const getTodayTotal = () => {
    const today = new Date().toISOString().split('T')[0];
    return sessions
      .filter(s => s.date.startsWith(today) && s.type === "work")
      .reduce((acc, s) => acc + s.duration, 0);
  };

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <DraggableCard title="Progress Tracker" icon="📊">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-4 rounded-lg bg-secondary/50">
            <Flame className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 rounded-lg bg-secondary/50">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{formatMinutes(getTodayTotal())}</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Recent Sessions</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sessions.slice(-5).reverse().map((session, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded bg-secondary/30 text-sm">
                <span>{session.type === "work" ? "🍅 Work" : "☕ Break"}</span>
                <span className="text-muted-foreground">{formatMinutes(session.duration)}</span>
              </div>
            ))}
            {sessions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No sessions yet. Start a timer!</p>
            )}
          </div>
        </div>
      </div>
    </DraggableCard>
  );
};

export const logSession = (duration: number, type: "work" | "break") => {
  const saved = localStorage.getItem("pomobites-sessions");
  const sessions: StudySession[] = saved ? JSON.parse(saved) : [];
  
  sessions.push({
    date: new Date().toISOString(),
    duration,
    type
  });
  
  localStorage.setItem("pomobites-sessions", JSON.stringify(sessions));
};