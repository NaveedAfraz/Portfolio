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
  NavbarLogo,
  NavbarButton,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar";
import { useTheme } from "../components/ThemeProvider";
import { GradientText } from "./magicui/gradient-text";
import { useOnlinePresence } from "../hooks/useOnlinePresence";

// Create a global variable to store the target section
let targetSection = null;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 12 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
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

const NavBar = ({ onOpenNotebook }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bodyOverflow, setBodyOverflow] = useState("auto");
  const [activeSection, setActiveSection] = useState("hero");
  const { theme } = useTheme();
  const { onlineCount, visits } = useOnlinePresence();

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
    let ticking = false;
    let lastSectionCheck = 0;

    const handleScroll = () => {
      // Cheap scalar check for navbar shadow
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Skip section detection if temporarily disabled
      if (disableScrollDetection) return;

      // Throttle section bounding rect checks to every 120ms to eliminate scroll lag
      const now = Date.now();
      if (now - lastSectionCheck < 120) return;
      lastSectionCheck = now;

      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
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

    // Always update the active section immediately for button highlight
    setActiveSection(sectionId);
    setDisableScrollDetection(true);

    // Special handling for Projects button
    if (sectionId === "Projects") {
      if (location.pathname === "/projects") return;
      if (isHomePage) {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      navigate("/projects");
      return;
    }

    // On home page — just scroll directly
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // On other pages — navigate home and pass section via state
    navigate("/", { state: { activeSection: sectionId } });
  };

  return (
    <div className="w-full fixed z-50">
      <Navbar>
        <NavBody
          className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${scrolled
              ? "bg-background/90 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-lg"
              : "bg-transparent border-transparent shadow-none"
            }`}
        >
          <div className="w-full px-4 sm:px-6 flex h-16 items-center justify-between">
            <NavbarLogo>
              <button
                type="button"
                onClick={() => onOpenNotebook?.()}
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 cursor-pointer text-left focus:outline-none group z-30"
                title="Click to open handwritten notebook"
              >
                <GradientText
                  gradient={
                    theme === "dark"
                      ? "from-cyan-400 via-sky-400 to-blue-500 font-signature"
                      : "from-cyan-600 via-sky-600 to-blue-700 font-signature"
                  }
                  animate={true}
                  className="font-bold font-signature text-2xl tracking-wide transition-all duration-300 group-hover:brightness-125"
                >
                  Naveed
                </GradientText>
              </button>
            </NavbarLogo>

            {/* Middle Nav Items — centered in the middle */}
            <NavItems className="hidden md:flex items-center space-x-2 pointer-events-none">
              {["Home", "skills", "experience", "education", "projects", "contact"].map(
                (section) => (
                  <NavbarButton
                    key={section}
                    onClick={() => handleNavigation(section)}
                    className={`cursor-pointer z-30 px-3 py-1.5 transition-all duration-300 transform rounded-lg pointer-events-auto
                    ${activeSection === section
                        ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white scale-105 shadow-md"
                        : `bg-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:via-sky-500 hover:to-blue-500 hover:text-white border border-transparent hover:border-cyan-300 hover:scale-105 hover:shadow-md ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`
                      }
                    relative overflow-hidden group font-medium text-sm`}
                  >
                    <span className="relative z-10">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavbarButton>
                )
              )}
            </NavItems>
            {/* Desktop Right Side: Live Online Users & Total Visits Badge */}
            <div className="hidden md:flex items-center justify-end z-30 shrink-0">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 shadow-[0_0_12px_rgba(16,185,129,0.15)] backdrop-blur-md select-none transition-all duration-300 hover:scale-105 hover:border-emerald-400/60 cursor-default"
                title={`${onlineCount} active visitor${onlineCount === 1 ? "" : "s"} online · ${visits ? visits.toLocaleString() : "5,000+"} total visits`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{onlineCount}</span>
                <span className="text-[11px] font-sans font-medium text-neutral-500 dark:text-neutral-400">online</span>
                <span className="text-neutral-400 dark:text-neutral-600">·</span>
                <span className="font-bold text-slate-800 dark:text-neutral-200">{visits ? visits.toLocaleString() : "5,000+"}</span>
                <span className="text-[11px] font-sans font-medium text-neutral-500 dark:text-neutral-400">visits</span>
              </div>
            </div>

            {/* Mobile Nav Toggle & Online Badge */}
            <div className="md:hidden flex items-center gap-2 justify-end ml-auto z-30">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-emerald-500/30 bg-emerald-500/10 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 shadow-xs backdrop-blur-md select-none"
                title={`${onlineCount} online · ${visits ? visits.toLocaleString() : "5,000+"} total visits`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{onlineCount}</span>
                <span className="text-[10px] font-sans text-neutral-500 dark:text-neutral-400">online</span>
                <span className="text-neutral-400 dark:text-neutral-600">·</span>
                <span className="font-bold text-slate-800 dark:text-neutral-200">{visits ? visits.toLocaleString() : "5k+"}</span>
              </div>

              <MobileNavToggle
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`cursor-pointer w-7 h-7 transition-all duration-300 hover:scale-110 ${theme === "dark" ? "text-white" : "text-black"}`}
              />
            </div>

            <MobileNavMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              className={`shadow-2xl overflow-y-auto rounded-l-3xl border-l ${theme === "dark"
                ? "bg-neutral-950 border-l border-cyan-500/20 shadow-cyan-950/30 text-white"
                : "bg-neutral-50 border-l border-cyan-300/30 shadow-cyan-300/10 text-black"
                }`}
            >
                {/* Header Section */}
                <div className={`flex items-center h-20 justify-between px-6 border-b sticky top-0 backdrop-blur-2xl transition-all duration-300 ${theme === "dark"
                  ? "bg-neutral-950/80 border-b-neutral-800"
                  : "bg-neutral-50/80 border-b-neutral-200"
                  }`}>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenNotebook?.();
                      }}
                      className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-left cursor-pointer"
                      title="Click to open handwritten notebook"
                    >
                      Naveed
                    </button>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border bg-neutral-900/80 border-neutral-800 text-neutral-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="font-bold text-emerald-400">{onlineCount}</span>
                      <span className="text-neutral-400">online</span>
                      <span className="text-neutral-600">·</span>
                      <span className="font-bold text-neutral-200">{visits ? visits.toLocaleString() : "5,000+"}</span>
                      <span className="text-neutral-400">visits</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <span className={`rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 p-1.5 flex items-center justify-center ${theme === "dark"
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-200 text-black"
                      }`}>
                      <ThemeToggle className="transition-colors duration-300 cursor-pointer" />
                    </span> */}
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
                          className={`w-full justify-start px-6 py-4 rounded-2xl transition-colors duration-200 flex items-center gap-3 group relative overflow-hidden font-semibold border ${activeSection === section
                            ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 border-transparent"
                            : `${theme === "dark"
                              ? "text-gray-300 bg-neutral-900/80 border-neutral-800/80 hover:border-cyan-500/30 hover:bg-neutral-800/50 hover:text-white"
                              : "text-gray-700 bg-white border-neutral-200 hover:border-cyan-300/30 hover:bg-neutral-50 hover:text-black"
                            }`
                            }
                          `}
                          mobile
                        >
                          {/* Left Glow Element on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-sky-500/5 group-hover:to-blue-500/5 transition-all duration-300"></div>

                          <span className={`relative z-10 flex items-center justify-center ${activeSection === section ? "text-white" : theme === "dark" ? "text-neutral-400 group-hover:text-cyan-400" : "text-neutral-500 group-hover:text-cyan-500"
                            }`}>
                            {getSectionIcon(section)}
                          </span>

                          <span className="text-base relative z-10">
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </span>

                          {/* Active indicator */}
                          {activeSection === section && (
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-sky-300 to-blue-400 rounded-l-full"></div>
                          )}
                        </NavbarButton>
                      </motion.div>
                    )
                  )}
                </motion.div>
              </MobileNavMenu>
          </div>
          <ScrollProgress />
        </NavBody>
      </Navbar>
    </div>
  );
};

export default NavBar;
