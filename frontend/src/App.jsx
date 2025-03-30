import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import { Education } from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import ProjectDetail from "./components/sections/ProjectDetail";
import ProjectsPage from "./components/pages/ProjectsPage";
import { ScrollProgress } from "./components/magicui/scroll-progress";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <ScrollProgress />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Skills />
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
        
      </div>
    </Router>
  );
}

export default App;
