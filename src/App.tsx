import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Apps from "./pages/Apps";
import AppDetails from "./pages/AppDetails";
import CreateApp from "./pages/CreateApp";
import Users from "./pages/Users";
import Environments from "./pages/Environments";
import Domains from "./pages/Domains";
import Settings from "./pages/Settings";
import RepoDashboard from "./pages/RepoDashboard";
import CreateRepo from "./pages/CreateRepo";
import CreateEnvironment from "./pages/CreateEnvironment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/apps" element={<AppLayout><Apps /></AppLayout>} />
          <Route path="/apps/create" element={<AppLayout><CreateApp /></AppLayout>} />
          <Route path="/apps/:id" element={<AppLayout><AppDetails /></AppLayout>} />
          <Route path="/users" element={<AppLayout><Users /></AppLayout>} />
          <Route path="/environments" element={<AppLayout><Environments /></AppLayout>} />
          <Route path="/domains" element={<AppLayout><Domains /></AppLayout>} />
          <Route path="/repository" element={<AppLayout><RepoDashboard /></AppLayout>} />
          <Route path="/repository/create" element={<AppLayout><CreateRepo /></AppLayout>} />
          <Route path="/environments/create" element={<AppLayout><CreateEnvironment /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
