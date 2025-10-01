import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [roundsBeforeLongBreak, setRoundsBeforeLongBreak] = useState(4);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Index
                        workDuration={workDuration}
                        shortBreak={shortBreak}
                        longBreak={longBreak}
                        roundsBeforeLongBreak={roundsBeforeLongBreak}
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
                      />
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
