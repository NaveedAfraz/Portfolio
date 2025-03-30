import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  const handleNavigation = (sectionId) => {
    if (sectionId === 'projects') {
      navigate('/projects');
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="font-bold">Naveed</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-6">
          <Button variant="ghost" onClick={() => handleNavigation('hero')}>Home</Button>
          <Button variant="ghost" onClick={() => handleNavigation('skills')}>Skills</Button>
          <Button variant="ghost" onClick={() => handleNavigation('education')}>Education</Button>
          <Button variant="ghost" onClick={() => handleNavigation('projects')}>Projects</Button>
          <Button variant="ghost" onClick={() => handleNavigation('contact')}>Contact</Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;