import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import {Experience} from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import ProjectDetail from "./components/sections/ProjectDetail";
import ProjectsPage from "./components/pages/ProjectsPage";
import AIChatbot from "./components/ui/AIChatbot";
import CustomCursor from "./components/ui/CustomCursor";

function App() {
  return (
    <Router>
      {/* Custom animated cursor — hides default arrow */}
      <CustomCursor />

      <div className="min-h-screen relative text-foreground bg-slate-50 dark:bg-[#07090e] transition-colors duration-500 overflow-x-hidden">
        {/* Fixed Background Layer — Subtle dot grid + cyan/amber ambient blobs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

          {/* Subtle dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 dark:opacity-30" />

          {/* Ambient Glowing Blobs — Cyan (top-left) + Amber (bottom-right) */}
          <div className="dark:hidden absolute top-[5%] left-[-15%] w-[600px] h-[600px] bg-cyan-300/15 rounded-full blur-[150px]" />
          <div className="dark:hidden absolute bottom-[5%] right-[-15%] w-[600px] h-[600px] bg-amber-300/15 rounded-full blur-[150px]" />
          <div className="hidden dark:block absolute top-[5%] left-[-15%] w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[200px]" />
          <div className="hidden dark:block absolute bottom-[5%] right-[-15%] w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10">
          <NavBar />
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
      </div>
    </Router>
  );
}

export default App;
