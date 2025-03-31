import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  MagicCard,
  MagicCardContent,
  MagicCardHeader,
  MagicCardTitle,
} from "../ui/magic-card";
import {
  ShineCard,
  ShineCardContent,
  ShineCardHeader,
  ShineCardTitle,
} from "../magicui/shine-card";
import { GradientText } from "../magicui/gradient-text";
import { useTheme } from "../ThemeProvider";
import { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaCode,
} from "react-icons/fa";

import {
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiSocketdotio,
  SiGithubactions,
  SiShadcnui,
  SiReactquery,
  SiMysql,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const skillsData = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "HTML/CSS", icon: FaHtml5, color: "#E34F26" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Shadcn", icon: SiShadcnui, color: "#000000" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "RESTful APIs", icon: FaDatabase, color: "#FF5722" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
      { name: "Socket", icon: SiSocketdotio, color: "#010101" },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#181717" },
      { name: "VS Code", icon: VscCode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    ],
  },
];

const Skills = () => {
  const { theme } = useTheme();
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Initialize animation state to false
    setAnimated(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay before starting the animation
          setTimeout(() => {
            setAnimated(true);
          }, 300);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getShimmerColor = (index) => {
    const colors = [
      theme === "dark" ? "rgba(129, 140, 248, 0.6)" : "rgba(99, 102, 241, 0.6)", // Indigo
      theme === "dark" ? "rgba(192, 132, 252, 0.6)" : "rgba(168, 85, 247, 0.6)", // Purple
      theme === "dark" ? "rgba(244, 114, 182, 0.6)" : "rgba(236, 72, 153, 0.6)", // Pink
    ];
    return colors[index % colors.length];
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 md:py-24 bg-muted/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 font-cursive">
          <GradientText
            gradient="from-indigo-500 via-purple-500 to-pink-500"
            animate={true}
            className="text-4xl font-bold"
          >
            My Skills
          </GradientText>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {skillsData.map((category, index) => (
            <ShineCard
              key={index}
              className="group"
              shimmerColor={getShimmerColor(index)}
              shineHover={true}
            >
              <ShineCardHeader>
                <ShineCardTitle className="font-cursive">
                  {category.title}
                </ShineCardTitle>
              </ShineCardHeader>
              <ShineCardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <li
                        key={skillIndex}
                        className="flex flex-col items-center gap-2 p-2 transition-all duration-300 hover:scale-110"
                      >
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-muted/80 
                            ${animated ? "animate-bounce-in" : "opacity-0"}`}
                          style={{
                            transitionDelay: `${skillIndex * 100}ms`,
                            animation: animated
                              ? `pulse 2s infinite ${skillIndex * 100}ms`
                              : "none",
                          }}
                        >
                          <IconComponent
                            size={30}
                            color={theme === "dark" ? skill.color : skill.color}
                            className={`transform transition-all duration-500 hover:rotate-12 
                              ${animated ? "scale-100" : "scale-0"}`}
                            style={{ transitionDelay: `${skillIndex * 150}ms` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-center">
                          {skill.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </ShineCardContent>
            </ShineCard>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Skills;
