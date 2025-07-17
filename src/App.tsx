import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import Index from "./pages/Index";
import Services from "./pages/Services";
import MarketingAutomation from "./pages/MarketingAutomation";
import SalesAutomation from "./pages/SalesAutomation";
import HRAutomation from "./pages/HRAutomation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminAuthProvider } from "./hooks/useAdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes - No navbar/footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Main App Routes - With navbar/footer */}
            <Route path="/" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <Index />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/services" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <Services />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/services/marketing-automation" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <MarketingAutomation />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/services/sales-automation" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <SalesAutomation />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/services/hr-automation" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <HRAutomation />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <About />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/resources" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <Resources />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/blogs" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <Blogs />
                </main>
                <Footer />
              </div>
            } />
            <Route path="*" element={
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1">
                  <NotFound />
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;