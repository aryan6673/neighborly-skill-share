
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import AuthForm from "./components/auth/AuthForm";
import SkillsList from "./components/skills/SkillsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<div className="container mx-auto py-12"><AuthForm /></div>} />
          <Route path="/signup" element={<div className="container mx-auto py-12"><AuthForm /></div>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/browse" element={<div className="container mx-auto py-12"><Navbar /><h1 className="text-3xl font-bold mb-6">Browse Skills</h1><SkillsList /></div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Simple Navbar for the Browse page
const Navbar = () => (
  <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        <span className="font-bold text-xl text-foreground">SkillSwap</span>
      </a>
      <div className="flex items-center space-x-4">
        <a href="/" className="font-medium text-gray-600 hover:text-primary">Home</a>
      </div>
    </div>
  </nav>
);

export default App;
