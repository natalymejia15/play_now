import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import AppRoutes from "./routes/routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-cover bg-center">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </div>
  );
}

export default App;