import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlowButton } from "../magicui/glow-button";
import { GradientText } from "../magicui/gradient-text";
import { ExternalLink } from "lucide-react";
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
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
  };

  const clientProjects = projectsData.filter(p =>
    ["klipp", "techstudents", "mseorg", "auramiingo", "alprophysio", "quwwahealth", "carekov"].includes(p.id)
  );

  const displayedProjects = showOnHomePage
    ? clientProjects.slice(0, 4)
    : projectsData;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-16 md:py-24 ${!showOnHomePage ? "transition-colors duration-700 sour-gummy " : "bg-transparent sour-gummy"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sour-gummy">
          <GradientText
            gradient="from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-200"
            animate={true}
            className="text-4xl font-bold"
          >
            {showOnHomePage ? "Client & Freelance Projects" : "My Work"}
          </GradientText>
          <div className="h-1 w-20 mt-2 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-600 mx-auto rounded-full" />

        </h2>

        <FocusedCardContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {displayedProjects.map((project, index) => (
              <FocusedCard key={index} className="h-full">
                <div
                  className={`rounded-xl p-6 h-full flex flex-col justify-between ${showOnHomePage
                    ? "bg-card backdrop-blur-sm border border-border shadow-sm"
                    : "bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/20"
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`text-xl font-bold ${showOnHomePage ? "text-foreground" : "text-foreground dark:text-white"} sour-gummy`}
                      >
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                          title={`Open live site: ${project.link}`}
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p
                      className={`${showOnHomePage ? "text-muted-foreground" : "text-muted-foreground dark:text-white/70"}`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 ${showOnHomePage
                            ? "bg-muted text-primary text-xs rounded-md font-medium"
                            : "bg-black/10 dark:bg-white/10 text-foreground dark:text-white text-xs rounded-md font-medium"
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span
                          className={`px-2 py-1 ${showOnHomePage
                            ? "bg-muted text-primary text-xs rounded-md font-medium"
                            : "bg-black/10 dark:bg-white/10 text-foreground dark:text-white text-xs rounded-md font-medium"
                            }`}
                        >
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {project.link && (
                    <div className="pt-4 mt-5 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        {project.link.replace(/^https?:\/\//, "")}
                      </span>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Visit Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </FocusedCard>
            ))}
        </FocusedCardContainer>

        {showOnHomePage && (
          <div className="flex justify-center mt-10">
            <GlowButton
              variant="default"
              glowColor="rgba(6, 182, 212, 0.5)"
              gradientColors={[
                "from-cyan-500",
                "via-sky-500",
                "to-blue-600",
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