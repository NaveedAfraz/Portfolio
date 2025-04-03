import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlowButton } from "../magicui/glow-button";
import {
  ShineCard,
  ShineCardContent,
  ShineCardDescription,
  ShineCardHeader,
  ShineCardTitle,
} from "../magicui/shine-card";
import { GradientText } from "../magicui/gradient-text";
import { projectsData } from "../../config/projectsData";

const Projects = ({ showOnHomePage = false }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!showOnHomePage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showOnHomePage]);

  const getShimmerColor = () => {
    return "rgba(54, 17, 158, 0.5)";
  };

  const handleShowAllProjects = () => {
    navigate("/projects");
    // Force scroll to top when clicking "View All Projects"
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-16 md:py-24 ${
        !showOnHomePage ? "transition-colors duration-700 sour-gummy " : "bg-muted/50 sour-gummy"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sour-gummy">
          <GradientText
            gradient={
              showOnHomePage
                ? "from-indigo-500 via-purple-500 to-pink-500"
                : "from-white to-white/70"
            }
            animate={true}
            className="text-4xl font-bold"
          >
            {showOnHomePage ? "Featured Projects" : "My Work"}
          </GradientText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {projectsData
            .slice(0, showOnHomePage ? 4 : projectsData.length)
            .map((project, index) => (
              <ShineCard
                key={index}
                className={`group ${
                  showOnHomePage
                    ? "bg-card backdrop-blur-sm"
                    : "bg-white/10 backdrop-blur-sm border-white/20"
                }`}
                shimmerColor={getShimmerColor(index)}
                shineHover={true}
                // shineDuration={10}
              >
                <ShineCardHeader>
                  <ShineCardTitle
                    className={`${showOnHomePage ? "" : "text-white"} sour-gummy`}
                  >
                    {project.title}
                  </ShineCardTitle>
                  <ShineCardDescription
                    className={showOnHomePage ? "" : "text-white/70"}
                  >
                    {project.description}
                  </ShineCardDescription>
                </ShineCardHeader>
                <ShineCardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 ${
                          showOnHomePage
                            ? "bg-muted text-primary text-xs rounded-md"
                            : "bg-white/10 text-white text-xs rounded-md"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className={`px-2 py-1 ${
                          showOnHomePage
                            ? "bg-muted text-primary text-xs rounded-md"
                            : "bg-white/10 text-white text-xs rounded-md"
                        }`}
                      >
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </ShineCardContent>
              </ShineCard>
            ))}
        </div>

        {showOnHomePage && (
          <div className="flex justify-center mt-10">
            <GlowButton
              variant="default"
              glowColor="rgba(129, 140, 248, 0.5)"
              gradientColors={[
                "from-indigo-500",
                "via-purple-500",
                "to-pink-500",
              ]}
              className="px-6 py-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={handleShowAllProjects}
            >
              View All Projects
            </GlowButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
