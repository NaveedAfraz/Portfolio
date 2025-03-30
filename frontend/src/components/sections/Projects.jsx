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
const projectsData = [
  {
    id: "carf-curacao",
    title: "CARF Curacao",
    description:
      "Transformed an outdated WordPress site into a modern dog-adoption funnel with a Tinder-style swiping mechanism.",
    technologies: ["Next.js", "Shadcn", "Tailwind", "Supabase"],
    color: "#FFA500", // Orange
    logo: "amigo",
  },
  {
    id: "watt-watt",
    title: "WattWatt.nl",
    description:
      "Developed WattWatt.nl website based on Figma designs with form integrations for backend functionality.",
    technologies: ["Next.js", "Tailwind CSS", "Figma Implementation"],
    color: "#4CAF50", // Green
    logo: "wattwatt",
  },
  {
    id: "daccs",
    title: "Daccs",
    description:
      "UI Development and full-stack implementation with MySQL database integration on AWS.",
    technologies: ["Node.js", "UI Development", "MySQL", "AWS"],
    color: "#2196F3", // Blue
    logo: "daccs",
  },
  {
    id: "perspectivity",
    title: "Perspectivity",
    description:
      "Full software lifecycle implementation with Python and NLP capabilities on cloud infrastructure.",
    technologies: ["Python", "NLP", "Cloud Infrastructure"],
    color: "#9C27B0", // Purple
    logo: "perspectivity",
  },
];

const Projects = ({ showOnHomePage = false }) => {
  const navigate = useNavigate();

  const getShimmerColor = () => {
    return "rgba(54, 17, 158, 0.5)";
  };

  const handleShowAllProjects = () => {
    navigate("/projects");
  };

  return (
    <section
      id="projects"
      className={`py-16 md:py-24 ${
        !showOnHomePage ? "transition-colors duration-700" : "bg-muted/50"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
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
                    className={showOnHomePage ? "" : "text-white"}
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
                    {project.technologies.map((tech, techIndex) => (
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
              className="px-6 py-2"
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
