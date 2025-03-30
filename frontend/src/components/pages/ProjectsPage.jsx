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

// Project data with vibrant color transitions
const projectsData = [
  {
    id: "carf-curacao",
    title: "CARF Curacao",
    description:
      "Transformed an outdated WordPress site into a modern dog-adoption funnel with a Tinder-style swiping mechanism.",
    detailedDescription:
      "Transformed an outdated WordPress site (with a clunky 1945-era ShelterManager API) into a modern dog-adoption funnel. Implemented filters for adoptable dogs, sanctuary dogs, and highly adoptable dogs. Introduced a Tinder-style swiping mechanism to match prospective adopters with dogs quickly, and a global WhatsApp CTA for immediate contact with the shelter. All built over a single weekend using Next.js, Tailwind, Shadcn, and Supabase for storing swipes.",
    technologies: [
      "Next.js",
      "Shadcn",
      "Tailwind",
      "Supabase",
      "Weekend Build",
      "ShelterManager",
    ],
    gradientFrom: "#1E3B70", // Deep blue
    gradientTo: "#1b2133", // Brighter blue
    logo: "amigo",
    image: "/images/carf-project.png",
    link: "https://example.com/carf",
  },
  {
    id: "watt-watt",
    title: "WattWatt.nl",
    description:
      "Developed WattWatt.nl website based on Figma designs with form integrations for backend functionality.",
    detailedDescription:
      "Developed WattWatt.nl website based on Figma designs. Coded with Next.js and Tailwind, including form integrations with Zapier and Google Sheets for backend functionality.",
    technologies: ["Next.js", "Tailwind CSS", "Figma Implementation"],
    gradientFrom: "#2962FF", // Blue - continuing from previous
    gradientTo: "#8E2DE2", // Purple - transition color
    logo: "wattwatt",
    image: "/images/watt-project.png",
    link: "https://wattwatt.nl",
  },
  {
    id: "daccs",
    title: "Daccs",
    description:
      "UI Development and full-stack implementation with MySQL database integration on AWS.",
    detailedDescription:
      "UI Development and full-stack implementation with MySQL database integration. Built on AWS infrastructure for scalability and reliability.",
    technologies: ["Node.js", "UI Development", "MySQL", "AWS"],
    gradientFrom: "#8E2DE2", // Purple - continuing from previous
    gradientTo: "#D50000", // Red
    logo: "daccs",
    image: "/images/daccs-project.png",
    link: "https://example.com/daccs",
  },
  {
    id: "perspectivity",
    title: "Perspectivity",
    description:
      "Full software lifecycle implementation with Python and NLP capabilities on cloud infrastructure.",
    detailedDescription:
      "Full software lifecycle implementation with Python and NLP capabilities. Developed cloud infrastructure and extensive data processing pipelines.",
    technologies: [
      "Python",
      "NLP",
      "Cloud Infrastructure",
      "Full Software Lifecycle",
    ],
    gradientFrom: "#D50000", // Red - continuing from previous
    gradientTo: "#FF6D00", // Orange
    logo: "perspectivity",
    image: "/images/perspectivity-project.png",
    link: "https://example.com/perspectivity",
  },
];

const ProjectsPage = () => {
  const { theme } = useTheme();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectRefs = useRef([]);
  const headerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [nextProjectIndex, setNextProjectIndex] = useState(null);

  useEffect(() => {
    // Set up intersection observer for each project section
    const observerOptions = {
      rootMargin: "-40% 0px -40% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        // Skip the header section
        if (entry.target === headerRef.current) return;

        const index = projectRefs.current.indexOf(entry.target);
        if (index !== -1) {
          if (entry.isIntersecting) {
            // Calculate which project is next based on scroll direction
            const nextIndex =
              activeProjectIndex < index ? index : activeProjectIndex;
            const prevIndex =
              activeProjectIndex > index ? index : activeProjectIndex;

            // Set the next project that we're transitioning to
            if (activeProjectIndex !== index) {
              setNextProjectIndex(index);
            }

            // Calculate transition progress based on intersection ratio
            const progress = entry.intersectionRatio;
            setScrollProgress(progress);

            // Once we've crossed a threshold, fully transition to the new project
            if (progress > 0.5) {
              setActiveProjectIndex(index);
              setNextProjectIndex(null);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe all project sections
    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Add scroll listener for parallax effects
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Apply parallax effects to elements with the parallax class
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

  // Update background color with smooth transitions when active project changes
  useEffect(() => {
    // Only apply color transitions to project sections, not the hero
    const projectSections = document.querySelectorAll(".project-section-bg");
    const currentProject = projectsData[activeProjectIndex];
    const nextProject =
      nextProjectIndex !== null ? projectsData[nextProjectIndex] : null;

    projectSections.forEach((section, index) => {
      if (index === activeProjectIndex) {
        if (nextProjectIndex !== null) {
          // Create a smooth transition between colors
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
          // Set the solid gradient for the current active project
          section.style.background = `linear-gradient(135deg, ${currentProject.gradientFrom}, ${currentProject.gradientTo})`;
        }
      }
    });
  }, [activeProjectIndex, nextProjectIndex, scrollProgress]);

  // Helper function to blend colors
  const blendColors = (color1, color2, ratio) => {
    // Convert hex to RGB
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

    // Blend colors
    const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
    const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
    const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

    // Convert back to hex
    return `#${(r < 16 ? "0" : "") + r.toString(16)}${
      (g < 16 ? "0" : "") + g.toString(16)
    }${(b < 16 ? "0" : "") + b.toString(16)}`;
  };

  // Initialize project refs
  if (projectRefs.current.length !== projectsData.length) {
    projectRefs.current = Array(projectsData.length)
      .fill()
      .map((_, i) => projectRefs.current[i] || null);
  }

  // Determine proper text color based on theme
  const getTextColor = () => {
    return theme === "dark" ? "text-white" : "text-white";
  };

  const getTextColorWithOpacity = (opacity = 80) => {
    return theme === "dark" ? `text-white/${opacity}` : `text-white/${opacity}`;
  };

  return (
    <div className="min-h-screen ">
      {/* Header section with the title and project cards - no container, no background */}
      <section
        ref={headerRef}
        className="min-h-screen flex flex-col justify-center items-center py-20"
      >
        <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">
          <div className="absolute inset-0 w-full h-screen overflow-hidden b">
            <FlickeringGrid />
          </div>
          <div className="text-center mb-16 font-cursive z-20">
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
                My Work
              </GradientText>
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive showcase of my projects. Scroll down to explore
              each project in detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {projectsData.map((project, index) => (
              <ShineCard
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border-white/10 h-70 cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  activeProjectIndex === index ? "ring-2 ring-white/30" : ""
                } ${theme === "light" ? "border-gray-200 shadow-md" : ""}`}
                shimmerColor="rgba(255, 255, 255, 0.05)"
                shineHover={true}
                onClick={() => {
                  // Scroll to the project section when clicking on a card
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
                        ? "text-primary font-cursive"
                        : "text-white font-cursive"
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
                        className={`px-2 py-1 font-cursive ${
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

      {/* Individual project sections with color changing backgrounds */}
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
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-white opacity-10"></div>

          {/* Add a semi-transparent overlay for better text visibility in light mode */}
          {theme === "light" && (
            <div className="absolute inset-0 bg-black/30"></div>
          )}

          <Spotlight className="w-full" spotlightClassName="bg-white/5">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 font-cursive">
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
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-black hover:bg-white/90 transition-colors duration-300 transform hover:scale-105 font-semibold">
                      Visit Project
                    </Button>
                  </a>
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
