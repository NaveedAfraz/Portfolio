import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import { ScrollProgress } from "./magicui/scroll-progress";
import { motion } from "framer-motion";
import { Home, Cpu, Briefcase, GraduationCap, FolderGit2, Mail } from "lucide-react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    } 
  },
};

const getSectionIcon = (section) => {
  const props = { className: "w-5 h-5 transition-transform duration-300 group-hover:scale-115" };
  switch (section.toLowerCase()) {
    case "home":
      return <Home {...props} />;
    case "skills":
      return <Cpu {...props} />;
    case "experience":
      return <Briefcase {...props} />;
    case "education":
      return <GraduationCap {...props} />;
    case "projects":
      return <FolderGit2 {...props} />;
    case "contact":
      return <Mail {...props} />;
    default:
      return <Mail {...props} />;
  }
};

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
                className={`backdrop-blur-3xl shadow-2xl overflow-y-auto rounded-l-3xl border-l transition-all duration-500 ${theme === "dark"
                    ? "bg-gradient-to-b from-neutral-950/95 via-neutral-900/95 to-neutral-950/95 border-l border-purple-500/20 shadow-purple-950/30"
                    : "bg-gradient-to-b from-neutral-50/95 via-neutral-100/95 to-neutral-50/95 border-l border-purple-300/30 shadow-purple-300/10"
                  }`}
              >
                {/* Header Section */}
                <div className={`flex items-center h-20 justify-between px-6 border-b sticky top-0 backdrop-blur-2xl transition-all duration-300 ${theme === "dark"
                    ? "bg-neutral-950/80 border-b-neutral-800"
                    : "bg-neutral-50/80 border-b-neutral-200"
                  }`}>
                  <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Naveed
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 p-1.5 flex items-center justify-center ${theme === "dark"
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-200 text-black"
                      }`}>
                      <ThemeToggle className="transition-colors duration-300 cursor-pointer" />
                    </span>
                    <MobileNavToggle
                      isOpen={true}
                      onClick={() => setIsMenuOpen(false)}
                      className={`cursor-pointer w-7 h-7 transition-all duration-300 hover:scale-110 ${theme === "dark" ? "text-white" : "text-black"
                        }`}
                    />
                  </div>
                </div>

                {/* Menu Items Section */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="px-4 py-8 space-y-3"
                >
                  {["Home", "skills", "experience", "education", "projects", "contact"].map(
                    (section) => (
                      <motion.div key={section} variants={itemVariants}>
                        <NavbarButton
                          onClick={() => handleNavigation(section)}
                          className={`w-full justify-start px-6 py-4 rounded-2xl transition-all duration-300 transform flex items-center gap-3 group relative overflow-hidden font-semibold border ${activeSection === section
                              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30 scale-102 border-transparent"
                              : `${theme === "dark"
                                ? "text-gray-300 bg-neutral-900/60 border-neutral-800/80 hover:border-purple-500/30 hover:bg-neutral-800/50 hover:text-white"
                                : "text-gray-700 bg-white border-neutral-200 hover:border-purple-300/30 hover:bg-neutral-50 hover:text-black"
                              }`
                            }
                          `}
                          mobile
                        >
                          {/* Left Glow Element on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>

                          <span className={`relative z-10 flex items-center justify-center ${activeSection === section ? "text-white" : theme === "dark" ? "text-neutral-400 group-hover:text-purple-400" : "text-neutral-500 group-hover:text-purple-500"
                            }`}>
                            {getSectionIcon(section)}
                          </span>

                          <span className="text-base relative z-10">
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </span>

                          {/* Active indicator */}
                          {activeSection === section && (
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 rounded-l-full"></div>
                          )}
                        </NavbarButton>
                      </motion.div>
                    )
                  )}
                </motion.div>
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
