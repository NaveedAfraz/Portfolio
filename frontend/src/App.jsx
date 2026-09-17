import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import ProjectDetail from "./components/sections/ProjectDetail";
import ProjectsPage from "./components/pages/ProjectsPage";
import AIChatbot from "./components/ui/AIChatbot";
import CustomCursor from "./components/ui/CustomCursor";
import { NotebookModal } from "./components/ui/NotebookModal";

function App() {
  const isInitialHome =
    typeof window !== "undefined" &&
    (window.location.pathname === "/" || window.location.pathname === "");

  const [isNotebookOpen, setIsNotebookOpen] = useState(() => isInitialHome);
  const [hasLoadedSite, setHasLoadedSite] = useState(() => !isInitialHome);

  const handleCloseNotebook = () => {
    setIsNotebookOpen(false);
    setHasLoadedSite(true);
  };

  return (
    <Router>
      {/* Custom animated cursor — hides default arrow */}
      <CustomCursor />

      <div className="min-h-screen relative text-foreground bg-slate-50 dark:bg-[#07090e] overflow-x-hidden">
        {/* Fixed Background Layer — Subtle dot grid + cyan/amber ambient blobs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu will-change-transform">
          {/* Subtle dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 dark:opacity-30" />

          {/* Ambient Glowing Blobs — Hardware-accelerated radial gradients for 60fps performance */}
          <div
            className="dark:hidden absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="dark:hidden absolute bottom-[-5%] right-[-10%] w-[650px] h-[650px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.10) 0%, transparent 70%)",
            }}
          />
          <div
            className="hidden dark:block absolute top-[-5%] left-[-10%] w-[750px] h-[750px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="hidden dark:block absolute bottom-[-5%] right-[-10%] w-[750px] h-[750px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Website Content — Loads after closing notebook on first visit (or immediately on sub-routes) */}
        {hasLoadedSite && (
          <div className="relative z-10 transition-opacity duration-500 ease-out">
            <NavBar onOpenNotebook={() => setIsNotebookOpen(true)} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Skills />
                    <Experience />
                    <Education />
                    <Projects showOnHomePage={true} />
                    <Contact />
                  </>
                }
              />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
            <Footer />
            {/* AI Chatbot — global, floats above all content */}
            <AIChatbot />
          </div>
        )}

        {/* Notebook modal — displays handwritten notebook on first open, or when opened from navbar */}
        <NotebookModal
          isOpen={isNotebookOpen}
          onClose={handleCloseNotebook}
        />
      </div>
    </Router>
  );
}

export default App;
