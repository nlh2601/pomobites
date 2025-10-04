import { useState, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [roundsBeforeLongBreak, setRoundsBeforeLongBreak] = useState(4);
  const [background, setBackground] = useState("tomato");
  const [soundOption, setSoundOption] = useState("chime");
  const [timerRunning, setTimerRunning] = useState(false);
  const [transparentCards, setTransparentCards] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar transparent={transparentCards} />
              <main className="flex-1 relative">
                <SidebarTrigger className="fixed top-4 left-4 z-50" />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Index
                        workDuration={workDuration}
                        shortBreak={shortBreak}
                        longBreak={longBreak}
                        roundsBeforeLongBreak={roundsBeforeLongBreak}
                        background={background}
                        soundOption={soundOption}
                        onTimerStateChange={setTimerRunning}
                        transparent={transparentCards}
                      />
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <Settings
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
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              
              {/* Global Music Player */}
              <div className="fixed bottom-6 left-6 z-10">
                <MusicPlayer 
                  autoPlayOnTimer={false} 
                  timerRunning={timerRunning}
                  audioRef={audioRef}
                  transparent={transparentCards}
                />
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
