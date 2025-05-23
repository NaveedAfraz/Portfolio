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
  }, [activeProjectIndex]);

  useEffect(() => {
    const projectSections = document.querySelectorAll(".project-section-bg");
    const currentProject = projectsData[activeProjectIndex];
    const nextProject =
      nextProjectIndex !== null ? projectsData[nextProjectIndex] : null;

    projectSections.forEach((section, index) => {
      if (index === activeProjectIndex) {
        if (nextProjectIndex !== null) {
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
        } else {
          section.style.background = `linear-gradient(135deg, ${currentProject.gradientFrom}, ${currentProject.gradientTo})`;
        }
      }
    });
  }, [activeProjectIndex, nextProjectIndex, scrollProgress]);

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

  if (projectRefs.current.length !== projectsData.length) {
    projectRefs.current = Array(projectsData.length)
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

  return (
    <div className="h-[100%]">
      <section
        ref={headerRef}
        className="min-h-screen flex flex-col justify-center items-center py-40"
      >
        <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">
          <div className="absolute inset-0 w-full h-screen overflow-hidden b">
            <FlickeringGrid />
          </div>
          <div className="text-center mb-16 sour-gummy z-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6  ">
              <GradientText
                gradient={
                  theme === "dark"
                    ? "from-white via-gray-300 to-white"
                    : "from-indigo-600 via-purple-600 to-pink-600"
                }
                animate={true}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                My Projects
              </GradientText>
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive showcase of my projects. Scroll down to explore each project in detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projectsData.slice(0, dynamicList).map((project, index) => (
              <ShineCard
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border-white/10 h-70 cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  activeProjectIndex === index ? "ring-2 ring-white/30" : ""
                } ${theme === "light" ? "border-gray-200 shadow-md" : ""}`}
                shimmerColor="rgba(255, 255, 255, 0.05)"
                shineHover={true}
                onClick={() => {
                  if (projectRefs.current[index]) {
                    projectRefs.current[index].scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <ShineCardHeader className="mb-4 ">
                  <ShineCardTitle
                    className={
                      theme === "light"
                        ? "text-primary sour-gummy"
                        : "text-white sour-gummy"
                    }
                  >
                    {project.title}
                  </ShineCardTitle>
                  <ShineCardDescription
                    className={
                      theme === "light"
                        ? "text-muted-foreground"
                        : "text-white/70"
                    }
                  >
                    {project.description}
                  </ShineCardDescription>
                </ShineCardHeader>
                <ShineCardContent>
                  <div className="flex flex-wrap gap-2">
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
                        className={`px-2 py-1 ${
                          theme === "light"
                            ? "bg-primary/10 text-primary"
                            : "bg-white/10 text-white/80"
                        } text-xs rounded-full`}
                      >
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </ShineCardContent>
              </ShineCard>
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

      {projectsData.map((project, index) => (
        <section
          key={index}
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
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transform transition-all duration-1000 hover:scale-105">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.target.src = "/images/placeholder-project.png";
                    }}
                  />
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
