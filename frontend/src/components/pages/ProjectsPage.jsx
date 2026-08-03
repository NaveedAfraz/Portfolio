import { useEffect, useRef, useState } from "react";
import { GradientText } from "../magicui/gradient-text";
import { Spotlight } from "../magicui/spotlight";
import {
  ShineCard,
  ShineCardContent,
  ShineCardDescription,
  ShineCardHeader,
  ShineCardTitle,
} from "../magicui/shine-card";
import { CardSpotlight } from "../ui/card-spotlight";
import { HeroParallax } from "../ui/hero-parallax";
import { Button } from "../ui/button";
import { useTheme } from "../ThemeProvider";
import { FlickeringGrid } from "../magicui/flickering-grid";
import { projectsData } from "../../config/projectsData";

const ProjectsPage = () => {
  const { theme } = useTheme();
  const projectRefs = useRef([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const headerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [nextProjectIndex, setNextProjectIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("freelance"); // Default to freelance as they are superior

  const personalProjects = projectsData.slice(0, 7);
  const freelanceProjects = projectsData.slice(7);
  const activeProjects = activeTab === "personal" ? personalProjects : freelanceProjects;

  const handleTabChange = (tab) => {
    projectRefs.current = [];
    setActiveTab(tab);
    setActiveProjectIndex(0);
    setScrollProgress(0);
    setNextProjectIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-40% 0px -40% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === headerRef.current) return;

        const index = projectRefs.current.indexOf(entry.target);
        if (index !== -1) {
          if (entry.isIntersecting) {
            const nextIndex =
              activeProjectIndex < index ? index : activeProjectIndex;
            const prevIndex =
              activeProjectIndex > index ? index : activeProjectIndex;

            if (activeProjectIndex !== index) {
              setNextProjectIndex(index);
            }

            const progress = entry.intersectionRatio;
            setScrollProgress(progress);

            if (progress > 0.5) {
              setActiveProjectIndex(index);
              setNextProjectIndex(null);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;

      document.querySelectorAll(".parallax").forEach((element) => {
        const speed = element.dataset.speed || 0.2;
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }

      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });

      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeProjectIndex, activeProjects]);

  useEffect(() => {
    const projectSections = document.querySelectorAll(".project-section-bg");
    const currentProject = activeProjects[activeProjectIndex];
    const nextProject =
      nextProjectIndex !== null ? activeProjects[nextProjectIndex] : null;

    projectSections.forEach((section, index) => {
      if (index === activeProjectIndex) {
        if (nextProjectIndex !== null && currentProject && nextProject) {
          const blendedFrom = blendColors(
            currentProject.gradientFrom,
            nextProject.gradientFrom,
            scrollProgress
          );
          const blendedTo = blendColors(
            currentProject.gradientTo,
            nextProject.gradientTo,
            scrollProgress
          );

          section.style.background = `linear-gradient(135deg, ${blendedFrom}, ${blendedTo})`;
        } else if (currentProject) {
          section.style.background = `linear-gradient(135deg, ${currentProject.gradientFrom}, ${currentProject.gradientTo})`;
        }
      }
    });
  }, [activeProjectIndex, nextProjectIndex, scrollProgress, activeProjects]);

  const blendColors = (color1, color2, ratio) => {
    const parseColor = (color) => {
      const hex = color.charAt(0) === "#" ? color.substring(1) : color;
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16),
      };
    };

    const rgb1 = parseColor(color1);
    const rgb2 = parseColor(color2);

    const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
    const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
    const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

    return `#${(r < 16 ? "0" : "") + r.toString(16)}${
      (g < 16 ? "0" : "") + g.toString(16)
    }${(b < 16 ? "0" : "") + b.toString(16)}`;
  };

  if (projectRefs.current.length !== activeProjects.length) {
    projectRefs.current = Array(activeProjects.length)
      .fill()
      .map((_, i) => projectRefs.current[i] || null);
  }
  const [dynamicList, setDynamicList] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (windowWidth < 800) {
      setDynamicList(4);
    } else {
      setDynamicList(6);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const parallaxProducts = [
    // First Row (5 - Primary Client Screenshots)
    { title: "MSE Org", link: "https://mseorg.com", thumbnail: "/images/mseorg.png" },
    { title: "Auramiingo", link: "https://auramiingo.com", thumbnail: "/images/auramiingo.png" },
    { title: "Tech Students", link: "https://tech-students-beta.vercel.app", thumbnail: "/images/techstudents.png" },
    { title: "Alpro Physio Clinic", link: "https://alprophysioclinic.com", thumbnail: "/images/alprophysio.png" },
    { title: "Quwwa Health", link: "https://quwwahealth.com", thumbnail: "/images/quwwahealth.png" },
    // Second Row (5 - Secondary Client Screenshots)
    { title: "CareKov", link: "https://carekov.com", thumbnail: "/images/carekov2.png" },
    { title: "Tech Students Portal", link: "https://tech-students-beta.vercel.app", thumbnail: "/images/techstudents2.png" },
    { title: "MSE Org Platform", link: "https://mseorg.com", thumbnail: "/images/mseorg2.png" },
    { title: "Auramiingo Social", link: "https://auramiingo.com", thumbnail: "/images/auramiingo2.png" },
    { title: "Alpro Physio Portal", link: "https://alprophysioclinic.com", thumbnail: "/images/alprophysio2.png" },
    // Third Row (5 - Personal Projects)
    { title: "BiteBox", link: "https://bite-box-three.vercel.app", thumbnail: "/images/BIteBox.png" },
    { title: "Notes", link: "https://notes-dt72.onrender.com", thumbnail: "/images/Notes.png" },
    { title: "Elite Wardrobe", link: "https://e-commerce-psi-inky-93.vercel.app/auth/login", thumbnail: "/images/EliteWardorbe.png" },
    { title: "Athena AI", link: "https://athena-ai-five.vercel.app", thumbnail: "/images/AthenaBot.png" },
    { title: "DevInsights Blog", link: "https://blog-theta-three-48.vercel.app/home", thumbnail: "/images/blog.png" },
  ];

  return (
    <div className="h-[100%]">
      <HeroParallax products={parallaxProducts} />

      <section
        ref={headerRef}
        className="py-20 bg-background relative z-30 md:-mt-12 -mt-6"
      >
        <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex justify-center mb-12 relative z-30">
            <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-1.5 rounded-full flex gap-2 backdrop-blur-md">
              <button
                onClick={() => handleTabChange("freelance")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === "freelance"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg scale-105"
                    : "text-slate-700 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                }`}
              >
                Client & Freelance ({freelanceProjects.length})
              </button>
              <button
                onClick={() => handleTabChange("personal")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === "personal"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg scale-105"
                    : "text-slate-700 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                }`}
              >
                Academic & Personal ({personalProjects.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {activeProjects.slice(0, dynamicList).map((project, index) => (
              <CardSpotlight
                key={index}
                radius={150}
                className={`group/card bg-white/5 backdrop-blur-sm border-white/10 h-72 cursor-pointer transform transition-all duration-500 hover:scale-105 p-6 flex flex-col justify-between ${theme === "light" ? "border-gray-200 shadow-md bg-white text-black" : "text-white"}`}
                onClick={() => {
                  if (projectRefs.current[index]) {
                    projectRefs.current[index].scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <div className="relative z-20 flex flex-col h-full justify-between">
                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-bold sour-gummy ${
                        theme === "light" ? "text-primary" : "text-white"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm sour-gummy line-clamp-3 ${
                        theme === "light" ? "text-muted-foreground" : "text-white/70"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 sour-gummy ${
                          theme === "light"
                            ? "bg-primary/10 text-primary"
                            : "bg-white/10 text-white/80"
                        } text-xs rounded-full`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className={`px-2 py-1 sour-gummy ${
                          theme === "light"
                            ? "bg-primary/10 text-primary"
                            : "bg-white/10 text-white/80"
                        } text-xs rounded-full`}
                      >
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </CardSpotlight>
            ))}
          </div>

          <div className="text-center animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 mx-auto ${
                theme === "light" ? "text-gray-500" : "text-white/50"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <p
              className={
                theme === "light" ? "text-gray-500 mt-2" : "text-white/50 mt-2"
              }
            >
              Scroll down to explore projects
            </p>
          </div>
        </div>
      </section>

      {activeProjects.map((project, index) => (
        <section
          key={`${activeTab}-${index}`}
          ref={(el) => (projectRefs.current[index] = el)}
          className="project-section-bg min-h-screen flex items-center py-20 transition-all duration-1000 relative"
          style={{
            clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0 100%)",
            background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2] -z-10"></div>

          {theme === "light" && (
            <div className="absolute inset-0 bg-black/30"></div>
          )}

          <Spotlight className="w-full" spotlightClassName="bg-white/5">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 sour-gummy">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="transform transition-all duration-1000">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white ">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/15 text-white text-sm rounded-full hover:bg-white/25 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/90 text-lg mb-8 font-medium">
                    {project.detailedDescription}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-white text-black hover:bg-white/90 transition-colors duration-300 transform hover:scale-105 font-semibold">
                        Visit Project
                      </Button>
                    </a>
                  )}
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform transition-all duration-1000 hover:scale-105 aspect-video flex items-center justify-center overflow-hidden">
                  <img
                    src={project.image || "/images/placeholder-project.png"}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ display: project.image ? 'block' : 'none' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-full h-full rounded-lg flex flex-col items-center justify-center p-6 text-center select-none"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradientFrom}cc, ${project.gradientTo}cc)`,
                      display: project.image ? 'none' : 'flex'
                    }}
                  >
                    <span className="text-4xl mb-2">💻</span>
                    <span className="text-xl font-bold text-white tracking-wide">{project.title}</span>
                    <span className="text-xs text-white/60 mt-1">Live Demo & Code Available</span>
                  </div>
                </div>
              </div>
            </div>
          </Spotlight>
        </section>
      ))}
    </div>
  );
};

export default ProjectsPage;
