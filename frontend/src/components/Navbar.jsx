import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { ScrollProgress } from "./magicui/scroll-progress";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavigation = (sectionId) => {
    // Close mobile menu when navigating
    setIsMenuOpen(false);
    
    if (sectionId === 'projects') {
      // If we're already on the projects page, don't do anything
      if (location.pathname === '/projects') return;
      
      // If we're on the home page, just scroll to the projects section
      if (isHomePage) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, navigate to the projects page
        navigate('/projects');
      }
    } else {
      if (!isHomePage) {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-sm' : 'bg-background/80'}`}>
        
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link className="flex items-center space-x-2" to="/">
            <span className="font-bold sour-gummy text-xl ml-12">Naveed</span>
          </Link>
        </div>
         
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" onClick={() => handleNavigation('hero')}>Home</Button>
          <Button variant="ghost" onClick={() => handleNavigation('skills')}>Skills</Button>
          <Button variant="ghost" onClick={() => handleNavigation('education')}>Education</Button>
          <Button variant="ghost" onClick={() => handleNavigation('projects')}>Projects</Button>
          <Button variant="ghost" onClick={() => handleNavigation('contact')}>Contact</Button>
          <ThemeToggle />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b shadow-lg animate-in slide-in-from-top-5 duration-300 z-50">
          <nav className="container py-4 flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              className="justify-start px-4 py-2 w-full text-left"
              onClick={() => handleNavigation('hero')}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start px-4 py-2 w-full text-left"
              onClick={() => handleNavigation('skills')}
            >
              Skills
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start px-4 py-2 w-full text-left"
              onClick={() => handleNavigation('education')}
            >
              Education
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start px-4 py-2 w-full text-left"
              onClick={() => handleNavigation('projects')}
            >
              Projects
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start px-4 py-2 w-full text-left"
              onClick={() => handleNavigation('contact')}
            >
              Contact
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;