import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { ThemeProvider } from "next-themes";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import UrgentIssues from "./pages/UrgentIssues";
import FeedbackList from "./pages/FeedbackList";
import WeeklyReport from "./pages/WeeklyReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <FeedbackProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 p-6 lg:p-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/ai" element={<AIInsights />} />
                    <Route path="/urgent" element={<UrgentIssues />} />
                    <Route path="/feedback" element={<FeedbackList />} />
                    <Route path="/weekly" element={<WeeklyReport />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </FeedbackProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
