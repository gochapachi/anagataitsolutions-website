import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
// Lazy load components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const MarketingAutomation = lazy(() => import("./pages/MarketingAutomation"));
const SalesAutomation = lazy(() => import("./pages/SalesAutomation"));
const HRAutomation = lazy(() => import("./pages/HRAutomation"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Resources = lazy(() => import("./pages/Resources"));
const Blogs = lazy(() => import("./pages/Blogs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
import { AdminAuthProvider } from "./hooks/useAdminAuth";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AdminAuthProvider>
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
      </AdminAuthProvider>
    </TooltipProvider>
);

export default App;