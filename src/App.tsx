import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "./components/layout/BottomNav";
import Header from "./components/layout/Header";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Multiplayer from "./pages/Multiplayer";
import Teams from "./pages/Teams";
import OnlineArena from "./pages/OnlineArena";
import OnlineGame from "./pages/OnlineGame";
import BibleReader from "./pages/BibleReader";
import NotFound from "./pages/NotFound";
import { usePresence } from "./hooks/usePresence";

const queryClient = new QueryClient();

const AppContent = () => {
  usePresence(); // Start heartbeat
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/chat" element={<OnlineArena />} />
        <Route path="/online" element={<OnlineArena />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/game/:matchId" element={<OnlineGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-1">
            <AppContent />
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
