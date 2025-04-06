import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlowButton } from "../magicui/glow-button";
import { GradientText } from "../magicui/gradient-text";
import { projectsData } from "../../config/projectsData";
import { FocusedCard, FocusedCardContainer } from "../ui/focus-cards";

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
        
        <FocusedCardContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {projectsData
            .slice(0, showOnHomePage ? 4 : projectsData.length)
            .map((project, index) => (
              <FocusedCard key={index} className="h-full">
                <div 
                  className={`rounded-xl p-6 h-full ${
                    showOnHomePage
                      ? "bg-card backdrop-blur-sm"
                      : "bg-white/10 backdrop-blur-sm border border-white/20"
                  }`}
                >
                  <div className="space-y-4">
                    <h3 
                      className={`text-xl font-bold ${showOnHomePage ? "" : "text-white"} sour-gummy`}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className={`${showOnHomePage ? "" : "text-white/70"}`}
                    >
                      {project.description}
                    </p>
                  
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
                  </div>
                </div>
              </FocusedCard>
            ))}
        </FocusedCardContainer>

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