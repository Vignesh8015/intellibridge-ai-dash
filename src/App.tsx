import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import ChatAssistant from "@/components/ChatAssistant";
import Dashboard from "./pages/Dashboard";
import CodeScanner from "./pages/CodeScanner";
import Containerizer from "./pages/Containerizer";
import ApiGenerator from "./pages/ApiGenerator";
import MigrationEstimator from "./pages/MigrationEstimator";
import SecurityAnalyzer from "./pages/SecurityAnalyzer";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="code-scanner" element={<CodeScanner />} />
              <Route path="containerizer" element={<Containerizer />} />
              <Route path="api-generator" element={<ApiGenerator />} />
              <Route path="migration-estimator" element={<MigrationEstimator />} />
              <Route path="security-analyzer" element={<SecurityAnalyzer />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
