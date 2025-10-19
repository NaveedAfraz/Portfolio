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

// Create a global variable to store the target section
let targetSection = null;

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bodyOverflow, setBodyOverflow] = useState("auto");
  const [activeSection, setActiveSection] = useState("hero");
  const { theme } = useTheme();

  // Disable scroll detection for a short period after navigation
  const [disableScrollDetection, setDisableScrollDetection] = useState(false);

  // Add a state to track manual navigation
  const [manualNavigation, setManualNavigation] = useState(false);

  // Handle scrolling to the correct section when navigating to the home page
  useEffect(() => {
    // Check for section in location state when navigating to home
    if (isHomePage && location.state && location.state.activeSection) {
      const sectionFromState = location.state.activeSection;
      setActiveSection(sectionFromState);

      setTimeout(() => {
        const section = document.getElementById(sectionFromState);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Clear the history state after scrolling
        window.history.replaceState({}, document.title);
      }, 300);
    }

    // Handle scrolling when there's a target section set from previous navigation
    if (isHomePage && targetSection) {
      setActiveSection(targetSection);
      setTimeout(() => {
        const section = document.getElementById(targetSection);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        targetSection = null; // Reset after scrolling
      }, 300); // Wait for page to render
    }
  }, [isHomePage, location]);

  useEffect(() => {
    if (disableScrollDetection) {
      const timer = setTimeout(() => {
        setDisableScrollDetection(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [disableScrollDetection]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Skip section detection if temporarily disabled
      if (disableScrollDetection) return;

      // Check which section is currently in view
      const sections = ["Home", "skills", "experience", "education", "projects", "contact"];
      const sectionPositions = sections.map((id) => {
        const element = document.getElementById(id);
        if (element) {
          return {
            id,
            top: element.getBoundingClientRect().top,
          };
        }
        return { id, top: 9999 };
      });

      const currentSection = sectionPositions
        .filter((section) => section.top <= 100)
        .sort((a, b) => b.top - a.top)[0];

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableScrollDetection]);

  // Reset manual navigation flag after a delay
  useEffect(() => {
    if (manualNavigation) {
      const timer = setTimeout(() => {
        setManualNavigation(false);
      }, 2000); // 2 seconds delay before allowing auto section detection again

      return () => clearTimeout(timer);
    }
  }, [manualNavigation]);

  useEffect(() => {
    if (isMenuOpen) {
      setBodyOverflow("hidden");
      document.body.style.overflow = "hidden";
    } else {
      setBodyOverflow("auto");
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);
    console.log(sectionId);

    // Always update the active section immediately for button highlight
    setActiveSection(sectionId);

    // Disable auto-detection of sections for 2 seconds
    setDisableScrollDetection(true);

    // Special handling for Projects button
    if (sectionId === "Projects") {
      // If we're already on the projects page, do nothing
      if (location.pathname === "/projects") {
        return;
      }

      // If on home page, just scroll to projects section
      if (isHomePage) {
        const section = document.getElementById(sectionId);
        console.log(section)
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      // If on any other page, navigate to /projects
      navigate("/projects");
      return;
    }

    // For other section buttons (not projects)

    // If on home page, just scroll to the section
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      console.log(section);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // Navigate to home, preserving the active section
    navigate("/");

    // After navigation, scroll to the target section
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  };

  return (
    <div className="w-full fixed z-40">
      <Navbar>
        <NavBody
          className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-500 ease-in-out ${scrolled ? "bg-background/95 shadow-lg" : "bg-background/80"
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

            <NavItems className="hidden md:flex items-center space-x-4 ml-auto">
              {["Home", "skills", "experience", "education", "projects", "contact"].map(
                (section) => (
                  <NavbarButton
                    key={section}
                    onClick={() => handleNavigation(section)}
                    className={`cursor-pointer z-30 px-4 py-2 transition-all duration-300 transform rounded-lg 
                    ${activeSection === section
                        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white scale-105 shadow-md"
                        : `bg-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white border border-transparent hover:border-pink-300 hover:scale-105 hover:shadow-md ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`
                      }
                    relative overflow-hidden group font-medium`}
                  >
                    <span className="relative z-10">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavbarButton>
                )
              )}
              <ThemeToggle className="hidden md:flex transition-colors duration-300 cursor-pointer hover:scale-110" />
            </NavItems>

            <MobileNav className="md:hidden flex items-center space-x-2">
              <MobileNavHeader>
                <span className={`mx-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 ${theme === "dark" ? "bg-amber-50 text-black" : "bg-black text-white"}`}>
                  <ThemeToggle className="md:hidden transition-colors duration-300 cursor-pointer" />
                </span>
                <MobileNavToggle
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`md:hidden cursor-pointer w-7 h-7 transition-all duration-300 hover:scale-110 ${theme === "dark" ? "text-white" : "text-black"}`}
                />
              </MobileNavHeader>

              <MobileNavMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                className={`fixed top-0   right-0 z-50 h-[100vh] w-80 backdrop-blur-3xl shadow-2xl overflow-y-auto rounded-l-3xl border-l transition-all duration-500 ${theme === "dark"
                    ? "bg-gradient-to-b from-neutral-950/99 via-neutral-900/98 to-neutral-950/99 border-l-2 border-purple-500/40 shadow-purple-900/50"
                    : "bg-gradient-to-b from-neutral-50/99 via-neutral-100/98 to-neutral-50/99 border-l-2 border-purple-300/50 shadow-purple-300/20"
                  }`}
              >
                {/* Header Section */}
                <div className={`flex items-center h-20 justify-end pr-6 border-b sticky top-0 backdrop-blur-2xl transition-all duration-300 ${theme === "dark"
                    ? "bg-neutral-950/80 border-b-purple-500/20"
                    : "bg-neutral-50/80 border-b-purple-300/30"
                  }`}>
                  <span className={`mx-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 p-2 ${theme === "dark"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-600/50"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md shadow-purple-400/40"
                    }`}>
                    <ThemeToggle className="transition-colors duration-300 cursor-pointer" />
                  </span>
                  <MobileNavToggle
                    isOpen={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`cursor-pointer w-7 h-7 transition-all duration-300 hover:scale-110 ${theme === "dark" ? "text-white" : "text-black"
                      }`}
                  />
                </div>

                {/* Menu Items Section */}
                <div className={`px-4 py-8 space-y-3 ${theme === "dark" ? "bg-neutral-900/40" : "bg-neutral-100/30"
                  }`}>
                  {["Home", "skills", "experience", "education", "projects", "contact"].map(
                    (section) => (
                      <NavbarButton
                        key={section}
                        onClick={() => handleNavigation(section)}
                        className={`w-full justify-start px-6 py-4 rounded-2xl transition-all duration-300 transform flex items-center gap-3 group relative overflow-hidden font-semibold ${activeSection === section
                            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/60 scale-105"
                            : `${theme === "dark"
                              ? "text-gray-300 bg-neutral-800/40 hover:bg-gradient-to-r hover:from-indigo-600/60 hover:via-purple-600/60 hover:to-pink-600/60 hover:text-white hover:shadow-lg hover:shadow-purple-500/40"
                              : "text-gray-700 bg-neutral-200/40 hover:bg-gradient-to-r hover:from-indigo-500/70 hover:via-purple-500/70 hover:to-pink-500/70 hover:text-white hover:shadow-md hover:shadow-purple-400/30"
                            }`
                          }
          `}
                        mobile
                      >
                        {/* Animated background blur on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>

                        <span className={`text-2xl group-hover:scale-125 transition-transform duration-300 relative z-10 ${activeSection === section ? "text-white" : ""
                          }`}>
                          {section === "hero"
                            ? "🏠"
                            : section === "skills"
                              ? "🛠️"
                              : section === "experience"
                                ? "💼"
                                : section === "education"
                                  ? "🎓"
                                  : section === "projects"
                                    ? "📁"
                                    : "📞"}
                        </span>

                        <span className="text-base relative z-10">
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </span>

                        {/* Active indicator */}
                        {activeSection === section && (
                          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 rounded-l-full"></div>
                        )}
                      </NavbarButton>
                    )
                  )}
                </div>
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
