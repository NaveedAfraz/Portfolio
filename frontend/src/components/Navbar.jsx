import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import { ScrollProgress } from "./magicui/scroll-progress";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { useTheme } from "../components/ThemeProvider";
import { GradientText } from "./magicui/gradient-text";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);

    if (sectionId === "projects") {
      if (location.pathname === "/projects") return;

      if (isHomePage) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate("/projects");
      }
    } else {
      if (!isHomePage) {
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 200);
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <div className="w-full fixed z-40">
      <Navbar>
        <NavBody
          className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-500 ease-in-out ${
            scrolled ? "bg-background/95 shadow-lg" : "bg-background/80"
          }`}
        >
          <div className="container flex h-16 items-center">
            <NavbarLogo>
              <Link
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                to="/"
              >
                <GradientText
                  gradient={
                    theme === "dark"
                      ? "from-indigo-400 via-purple-400 to-pink-400 sour-gummy"
                      : "from-indigo-600 via-purple-600 to-pink-600 sour-gummy"
                  }
                  animate={true}
                  className="font-bold sour-gummy text-xl transition-all duration-300"
                >
                  Naveed
                </GradientText>
              </Link>
            </NavbarLogo>

            {/* Desktop Navigation */}
            <NavItems className="hidden md:flex items-center space-x-4 ml-auto">
              <NavbarButton
                onClick={() => handleNavigation("hero")}
                className="cursor-pointer z-30 px-4 py-2 hover:scale-105 transition-all duration-300 transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
              >
                Home
              </NavbarButton>
              <NavbarButton
                onClick={() => handleNavigation("skills")}
                className="cursor-pointer z-30 px-4 py-2 hover:scale-105 transition-all duration-300 transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
              >
                Skills
              </NavbarButton>
              <NavbarButton
                onClick={() => handleNavigation("education")}
                className="cursor-pointer z-30 px-4 py-2 hover:scale-105 transition-all duration-300 transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
              >
                Education
              </NavbarButton>
              <NavbarButton
                onClick={() => handleNavigation("projects")}
                className="cursor-pointer z-30 px-4 py-2 hover:scale-105 transition-all duration-300 transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
              >
                Projects
              </NavbarButton>
              <NavbarButton
                onClick={() => handleNavigation("contact")}
                className="cursor-pointer z-30 px-4 py-2 hover:scale-105 transition-all duration-300 transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
              >
                Contact
              </NavbarButton>
              <ThemeToggle className="hidden md:flex transition-colors duration-300" />
            </NavItems>

            {/* Mobile Navigation */}
            <MobileNav className="md:hidden flex items-center space-x-2">
              <MobileNavHeader>
                <span
                  className="mx-2 rounded-lg cursor-pointer transition-all duration-300"
                >
                  <ThemeToggle className="md:hidden transition-colors duration-300" />
                </span>
                <MobileNavToggle
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden cursor-pointer w-7 h-7 transition-all duration-300"
                />
              </MobileNavHeader>
              <MobileNavMenu isOpen={isMenuOpen}>
                <div className="flex items-center h-20 justify-end">
                  <span
                    className="mx-2 bg-amber-50 text-black rounded-lg transition-all duration-300"
                  >
                    <ThemeToggle className="md:hidden transition-colors duration-300" />
                  </span>
                  <MobileNavToggle
                    isOpen={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden cursor-pointer w-7 h-7 transition-all duration-300"
                  />
                </div>
                <NavbarButton
                  onClick={() => handleNavigation("hero")}
                  className="w-full justify-start my-4 px-4 py-3 rounded-md hover:scale-105 transition-all duration-300 transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
                  mobile
                >
                  Home
                </NavbarButton>
                <NavbarButton
                  onClick={() => handleNavigation("skills")}
                  className="w-full justify-start my-4 px-4 py-3 rounded-md hover:scale-105 transition-all duration-300 transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
                  mobile
                >
                  Skills
                </NavbarButton>
                <NavbarButton
                  onClick={() => handleNavigation("education")}
                  className="w-full justify-start my-4 px-4 py-3 rounded-md hover:scale-105 transition-all duration-300 transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
                  mobile
                >
                  Education
                </NavbarButton>
                <NavbarButton
                  onClick={() => handleNavigation("projects")}
                  className="w-full justify-start my-4 px-4 py-3 rounded-md hover:scale-105 transition-all duration-300 transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
                  mobile
                >
                  Projects
                </NavbarButton>
                <NavbarButton
                  onClick={() => handleNavigation("contact")}
                  className="w-full justify-start my-4 px-4 py-3 rounded-md hover:scale-105 transition-all duration-300 transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-sm hover:shadow-md"
                  mobile
                >
                  Contact
                </NavbarButton>
              </MobileNavMenu>
            </MobileNav>
          </div>
          <ScrollProgress />
        </NavBody>
      </Navbar>
    </div>
  );
};

export default NavBar;
